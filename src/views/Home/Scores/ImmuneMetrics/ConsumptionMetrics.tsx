import { Image, Platform, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './styles';
import en from '../../../../../translation/en.json';
import MetricsWrapper from '../../../../components/MetricsWrapper/MetricsWrapper';
import { AppColors } from '../../../../assets/colors/AppColors';
import AppHeader from '../../../../components/Header/AppHeader';
import { AppFonts } from '../../../../constants/AppFonts';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SmallText from '../../../../components/AppText/SmallText';
import LargeText from '../../../../components/AppText/LargeText';
import { AppImages } from '../../../../assets/images/AppImages';
import NormalText from '../../../../components/AppText/NormalText';
import CustomRateDisplay from '../../../../components/CustomRateDisplay/CustomRateDisplay';
import GraphDataDisplay from '../../../../components/GraphDataDisplay/GraphDataDisplay';
import moment from 'moment';
import DateTimePicker from 'react-native-ui-datepicker';
import { AppConstants } from '../../../../constants/AppConstants';
import ProgressSkeleton from '../../../../components/Skeletons/ProgressSkeleton';
import BodyMetrixSkeleton from '../../../../components/Skeletons/BodyMetrixSkeleton';
import { Datum, PastData, TodaysData } from '../HealthMetrics/interfaces';
import BleProvider from '../../../../navigations/BleProvider';
import { useSelector } from 'react-redux';
import { ArrayConstants } from '../../../../constants/BleProviderConstants/ContantsArray';
import { endPoints } from '../../../../network/endPoints';
import { API_REQUEST } from '../../../../network/NetworkRequest';
import { ViewMoreContent } from '../../../../constants/ViewMoreContent';
import Helper from '../../../../utilis/Helper';

const Stats = [
    {
        id: 1,
        title: "Sleep Score",
        value: "4.4"
    },
    {
        id: 2,
        title: "Sleep Quality",
        value: "6.5"
    },
]
const ConsumptionMetrics = () => {
    const { tempToday, loadingTemp, errorHeart } = useSelector((state: any) => state.userData);
    const UserDetails = useSelector((state: any) => state.userData.userDetails);
    const navigation: any = useNavigation();
    const route: any = useRoute();
    const { routeData } = route.params ?? 0;
    const { asof } = route.params ?? '';
    const [progress, setProgress] = React.useState<number>(routeData);
    const [time, setTime] = React.useState<string>('Today');
    const [showClnder, setShowClnder] = React.useState<boolean>(false);
    const [StartDate, setStart] = React.useState<string>('');
    const [EndDate, setEnd] = React.useState<string>('');
    const [onLoad, setOnLoad] = React.useState<boolean>(false);
    const [todaysData, setTodaysData] = React.useState<TodaysData>(tempToday);
    const [rangeData, setRangeData] = React.useState<any>();
    const [recomendationsData, setRecomendationsData] = React.useState<any[]>([])
    const Ble = BleProvider();
    const getRecomendations = () => {
        const data = {
            type: "temp",
        }
        API_REQUEST("POST", endPoints.recommendation, data,
            ((success: any) => {
                // console.log("Recomendations :: ", success?.data);
                setRecomendationsData(success?.data);
            }),
            ((error: any) => {
                console.log("ERROR in Recomendtions :: ", error)
            })
        )
    }
    const GetRangeHeartData = async (from: any, to: any) => {
        try {
            const data = {
                from: from,
                to: to
            }
            console.log(data);

            API_REQUEST("POST", endPoints.tempTimly, data,
                ((sucess: any) => {
                    // console.log("DATA FROM API", JSON.stringify(sucess));
                    setRangeData(sucess?.data);
                    setOnLoad(false);
                }),
                ((error: any) => {
                    setOnLoad(false);
                    console.log(error);
                })
            );
        } catch (e) {
            setOnLoad(false);
            console.log(e);
        }
    }
    const celsiusToFahrenheit = (celsius: number): any => {
        const temp = Math.floor((celsius * 9) / 5 + 32);
        // console.log(temp)
        return temp >= 33 ? temp : 0;
      };

      console.log(JSON.stringify(todaysData))
    const TodaysGraphsData = [
        {
            id: 1,
            title: "°F",
            range: `${celsiusToFahrenheit(todaysData?.today?.highestTemp ?? 0) > 0 ? celsiusToFahrenheit(todaysData?.today?.highestTemp ?? 0) : "--"}`,
            status: "",
            content: ViewMoreContent?.StressMetrics?.Temp,
            data: todaysData?.today?.data?.map((item: any) => ({ value: celsiusToFahrenheit(item?.temperature ?? 0), dataPointColor: item?.temperature === 0 ? AppColors.red : AppColors.blue, label: Helper.convertTo12HourFormat(item?.GPSTime) })) ?? [],
        },
    ]
    const rangeGraphsData = [
        {
            id: 1,
            title: "°F",
            range: `${celsiusToFahrenheit(rangeData?.lowestTemp ?? 0)}`,
            status: "",
            content: ViewMoreContent?.StressMetrics?.Temp,
            data: rangeData?.dateRange?.map((item: any) => ({ value: celsiusToFahrenheit(item?.temperature ?? 0), dataPointColor: item?.temperature === 0 ? AppColors.red : AppColors.blue, label: moment(item?.GPSTime).format(time === "Week" ? "ddd" : "DD,MMM") })) ?? [],
        },
    ];

    const tempInCelsius = Math.floor(((Ble.temperature ?? 32) - 32) * 5 / 9) >= 0 ? Math.floor(((Ble.temperature ?? 32) - 32) * 5 / 9) : 0;

    React.useEffect(() => {
        // console.log("RANGED DATA ::\n", rangeData)
        getRecomendations();
        GetRangeHeartData(moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD'));
        Ble.writeOnDevice(ArrayConstants.startActivity);
    }, [])

    return (
        <MetricsWrapper color={[AppColors.immuneStart, AppColors.immuneEnd]}>
            <StatusBar barStyle={'light-content'} />
            <AppHeader onBackPress={() => { navigation.goBack() }} iconColor={AppColors.white} title={en.Headings.MyImmune} customStyle={{ color: AppColors.white, fontFamily: AppFonts.GeneralSans.semiBold }} wrapperStyle={{ marginTop: Platform.OS == 'android' ? 40 : AppConstants.topInsets }} />
            <ScrollView
                bounces={false}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}>
                {loadingTemp ? (
                    <ProgressSkeleton color={AppColors.immuneEnd} />
                ) : (<>
                    <View style={styles.header}>
                        {asof && <SmallText text={`As of ` + moment(asof).format('MMM DD,yyyy')} customStyle={{ color: AppColors.white, textDecorationLine: 'underline', fontFamily: AppFonts.GeneralSans.italic }} />}
                        <AnimatedCircularProgress
                            size={wp(50)}
                            width={10}
                            fill={progress}
                            rotation={-90}
                            padding={10}
                            lineCap='round'
                            tintColor={AppColors.white}
                            backgroundColor={AppColors.progressBack} />
                        <View style={styles.progresDetails}>
                            <LargeText text={`${progress.toFixed()}`} customStyle={{ fontFamily: AppFonts.GeneralSans.bold, fontSize: 70, letterSpacing: -2, color: AppColors.white }} />
                            <SmallText text='out of 100' customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: AppColors.dimWhite }} />
                        </View>
                    </View>
                    {/* <View style={styles.ViewMore}>
                        <Image source={AppImages.greenArrow} resizeMode='contain' style={{ width: 25, height: 25 }} />
                        <SmallText text='25%' customStyle={{ color: AppColors.green, fontFamily: AppFonts.GeneralSans.semiBold }} />
                        <SmallText text='better than last week' customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
                        <View style={styles.VertSeperater} />
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate(AppRoutes.ViewMore, { name: en.Headings.MyImmune }) }}>
                            <SmallText text='View More' customStyle={{ color: AppColors.placeholderColor, fontFamily: AppFonts.GeneralSans.semiBold }} />
                        </TouchableOpacity>
                    </View> */}
                </>)}
                <View style={styles.DetailsView}>
                    {loadingTemp ? (
                        <BodyMetrixSkeleton color={AppColors.immuneEnd} />
                    ) : (<>
                        <NormalText text={en.MetricsModules.Recommendations} customStyle={{ fontSize: 20, fontFamily: AppFonts.GeneralSans.semiBold, paddingLeft: 23 }} />
                        <ScrollView
                            horizontal
                            overScrollMode='never'
                            contentContainerStyle={{ paddingLeft: 20 }}
                            showsHorizontalScrollIndicator={false}
                        >
                            {recomendationsData.length > 0 ? recomendationsData.map((reco) => (
                                <View key={reco.id} style={styles.recoView}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <SmallText text={reco?.title} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
                                        {/* <Image source={AppImages.arrowNext} tintColor={AppColors.placeholderColor} resizeMode='contain' style={{ width: 20, height: 20 }} /> */}
                                    </View>
                                    <SmallText text={reco?.description} customStyle={{ marginTop: 8, color: AppColors.placeholderColor, width: wp(60) }} />
                                </View>
                            )) :
                                <View style={{ width: wp(85), alignItems: "center", justifyContent: "center", height: 160, alignSelf: "center" }}>
                                    <SmallText text='No Recommendations' />
                                </View>
                            }
                        </ScrollView>
                        {/* <NormalText text={en.MetricsModules.Statistics} customStyle={{ fontSize: 20, fontFamily: AppFonts.GeneralSans.semiBold, paddingLeft: 23 }} /> */}
                        {/* <View style={{ flexDirection: "row", flexWrap: 'wrap', width: wp(88), alignSelf: 'center', justifyContent: "space-between", marginVertical: 10 }}>
                            {Stats.map((stat) => (
                                <View key={stat.id} style={styles.statsView}>
                                    <SmallText text='Last night' customStyle={{ fontSize: 12, color: AppColors.placeholderColor }} />
                                    <NormalText text={stat.title} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
                                    <LargeText text={stat.value} customStyle={{ fontSize: 32, marginTop: 15 }} />
                                </View>
                            ))}
                        </View> */}
                        <CustomRateDisplay progress={Ble.temperature ?? 0} monitering={UserDetails?.notify} live title={"°F"} />
                        <View style={styles.seperater} />
                        <NormalText text={en.MetricsModules.Historicalrecords} customStyle={{ fontSize: 20, fontFamily: AppFonts.GeneralSans.semiBold, marginVertical: 20, paddingLeft: 23 }} />
                        <View style={styles.DateView}>
                            <View style={styles.genderView}>
                                <TouchableOpacity onPress={() => setTime("Today")} style={[styles.genderBtn, { backgroundColor: time === "Today" ? AppColors.white : AppColors.transparent }]}>
                                    <SmallText text={en.MetricsModules.Today} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: time === "Today" ? AppColors.black : AppColors.placeholderColor }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setTime("Week"); GetRangeHeartData(moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD')) }} style={[styles.genderBtn, { backgroundColor: time === "Week" ? AppColors.white : AppColors.transparent }]}>
                                    <SmallText text={en.MetricsModules.Week} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: time === "Week" ? AppColors.black : AppColors.placeholderColor }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setTime("Month"); GetRangeHeartData(moment().subtract(1, 'M').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD')) }} style={[styles.genderBtn, { backgroundColor: time === "Month" ? AppColors.white : AppColors.transparent }]}>
                                    <SmallText text={en.MetricsModules.Month} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: time === "Month" ? AppColors.black : AppColors.placeholderColor }} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => { setShowClnder(!showClnder) }} style={styles.DateBtn}>
                                <SmallText text={en.MetricsModules.Date} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
                                <Image source={AppImages.clnderBlack} resizeMode="contain" style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        </View>
                        {showClnder && <View style={styles.clnder}>
                            <DateTimePicker
                                mode="range"
                                maxDate={new Date()}
                                startDate={StartDate}
                                endDate={EndDate}
                                height={hp(34)}
                                weekDaysTextStyle={{ color: AppColors.black }}
                                headerTextStyle={{ color: AppColors.black }}
                                calendarTextStyle={{ color: AppColors.black }}
                                selectedItemColor={AppColors.blue}
                                onChange={({ startDate, endDate }: any) => {
                                    setStart(startDate);
                                    setEnd(endDate);
                                }}
                            />
                            {StartDate && EndDate && <TouchableOpacity activeOpacity={0.8} onPress={() => { setShowClnder(!showClnder), GetRangeHeartData(moment(StartDate?.toLocaleString()).format('YYYY-MM-DD'), moment(EndDate?.toLocaleString()).format('YYYY-MM-DD')), setTime("Range") }} style={styles.calnderFooter}>
                                <NormalText text={`Select Date Range ${moment(StartDate?.toLocaleString()).format('MM-DD')} / ${moment(EndDate?.toLocaleString()).format('MM-DD')}`} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, color: AppColors.white, marginRight: 4 }} />
                                <Image source={AppImages.trip} resizeMode='contain' style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>}
                        </View>}
                        {time === 'Today' ?
                            TodaysGraphsData[0]?.data?.length > 0 ?
                                TodaysGraphsData.map((graph) => (
                                    <GraphDataDisplay key={graph.id} graphData={graph} time={time} />
                                )) : <View style={{ width: wp(85), alignItems: "center", justifyContent: "center", height: 160, alignSelf: "center" }}>
                                    <SmallText text='No Immune Data' />
                                </View> : rangeData ? (
                                    rangeGraphsData.map((graph) => (
                                        // <></>
                                        <GraphDataDisplay key={graph.id} graphData={graph} time={time} />
                                    )))
                                : (
                                    <View style={{ width: wp(85), alignItems: "center", justifyContent: "center", height: 160, alignSelf: "center" }}>
                                        <SmallText text='No Past Data' />
                                    </View>
                                )
                        }
                    </>)}
                </View>
            </ScrollView>
        </MetricsWrapper>
    )
}

export default ConsumptionMetrics