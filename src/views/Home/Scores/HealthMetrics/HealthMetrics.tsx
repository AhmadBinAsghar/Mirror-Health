import { Image, Platform, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
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
import MetricsSkeletons from '../../../../components/Skeletons/MetricsSkeletons';
import BleProvider from '../../../../navigations/BleProvider';
import { useSelector } from 'react-redux';
import { ArrayConstants } from '../../../../constants/BleProviderConstants/ContantsArray';
import { API_REQUEST } from '../../../../network/NetworkRequest';
import { endPoints } from '../../../../network/endPoints';
import { DateRange, PastData, TodaysData } from './interfaces';
import Helper from '../../../../utilis/Helper';
import { ViewMoreContent } from '../../../../constants/ViewMoreContent';

const HealthMetrics = () => {
    const { HeartToday, loadingHeart } = useSelector((state: any) => state.userData);
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
    const [todaysData, setTodaysData] = React.useState<TodaysData>(HeartToday);
    const [rangeData, setRangeData] = React.useState<PastData>();
    const [recomendationsData, setRecomendationsData] = React.useState<any[]>([])
    const Ble = BleProvider();

    const GetRangeHeartData = async (from: any, to: any) => {
        try {
            const data = {
                from: from,
                to: to
            }
            console.log(data);

            API_REQUEST("POST", endPoints.timelyCardic, data,
                ((sucess: any) => {
                    // console.log("\n\n HealthMetrics Screen:: \n", JSON.stringify(sucess), "\n\n");
                    setRangeData(sucess?.data);
                    setOnLoad(false);
                }),
                ((error: any) => {
                    setOnLoad(false);
                    console.log("Error while get health metrics data:::: \n\n ", error);
                })
            );
        } catch (e) {
            setOnLoad(false);
            console.log(e);
        }
    }

    const getRecomendations = () => {
        const data = {
            type: "cardiac",
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

    const TodaysGraphsData = [
        {
            id: 1,
            title: "BPM",
            range: `${todaysData?.today?.lowestHeartRateToday ?? 0}–${todaysData?.today?.highestHeartRateToday ?? 0}`,
            status: "",
            content: ViewMoreContent?.HealthMetrics?.BPM,
            data: todaysData?.today?.data?.map((item: any) => ({ value: item?.heartRate ?? 0, dataPointColor: item?.heartRate === 0 ? AppColors.red : AppColors.blue, label: Helper.convertTo12HourFormat(item?.GPSTime) })) ?? [],
        },
        // {
        // [{ value: 40 }, { value: 30 }, { value: 54 }, { value: 10 }, { value: 24 }, { value: 30 }, { value: 76 }]
        //     id: 2,
        //     title: "BPM",
        //     range: "31–60",
        //     status: "Better than yesterday",
        //     data: [{ value: 40 }, { value: 30 }, { value: 54 }, { value: 10 }, { value: 24 }, { value: 30 }, { value: 76 }],
        // },
        {
            id: 3,
            title: "HRV",
            range: `${todaysData?.today?.lowestHRVToday ?? 0}–${todaysData?.today?.highestHRVToday ?? 0}`,
            status: "",
            content: ViewMoreContent?.HealthMetrics?.HRV,
            data: todaysData?.today?.data?.map((item: any) => ({ value: item?.hrv ?? 0, dataPointColor: item?.hrv === 0 ? AppColors.red : AppColors.blue, label: Helper.convertTo12HourFormat(item?.GPSTime) })) ?? [],
        },
        // {
        //     id: 4,
        //     title: "VA",
        //     range: `${todaysData?.today?.lowestVascularAgingToday ?? 0}–${todaysData?.today?.highestVascularAgingToday ?? 0}`,
        //     status: "",
        //     content: ViewMoreContent?.HealthMetrics?.VA,
        //     data: todaysData?.today?.data?.map((item: any) => ({ value: item?.vascularAging ?? 0, dataPointColor: item?.vascularAging === 0 ? AppColors.red : AppColors.blue, label: Helper.convertTo12HourFormat(item?.GPSTime) })) ?? [],
        // },
    ]
    const DataRangeGraphsData = [
        {
            id: 1,
            title: "BPM",
            range: `${rangeData?.lowestHeartRate ?? 0}–${rangeData?.highestHeartRate ?? 0}`,
            status: "",
            content: ViewMoreContent?.HealthMetrics?.BPM,
            data: rangeData?.dateRange?.map((item: DateRange) => ({ value: item?.heartRate ?? 0, dataPointColor: item?.heartRate === 0 ? AppColors.red : AppColors.blue, label: moment(item?.GPSTime).format(time === "Week" ? "ddd" : "DD,MMM") })) ?? [],
        },
        // {
        // [{ value: 40 }, { value: 30 }, { value: 54 }, { value: 10 }, { value: 24 }, { value: 30 }, { value: 76 }]
        //     id: 2,
        //     title: "BPM",
        //     range: "31–60",
        //     status: "Better than yesterday",
        //     data: [{ value: 40 }, { value: 30 }, { value: 54 }, { value: 10 }, { value: 24 }, { value: 30 }, { value: 76 }],
        // },
        {
            id: 3,
            title: "HRV",
            range: `${rangeData?.lowestHRV ?? 0}–${rangeData?.highestHRV ?? 0}`,
            status: "",
            content: ViewMoreContent?.HealthMetrics?.HRV,
            data: rangeData?.dateRange?.map((item: DateRange) => ({ value: item?.hrv ?? 0, dataPointColor: item?.hrv === 0 ? AppColors.red : AppColors.blue, label: moment(item?.GPSTime).format(time === "Week" ? "ddd" : "DD,MMM") })) ?? [],
        },
        {
            id: 4,
            title: "RHR",
            range: `${rangeData?.lowestHeartRate ?? 0}`,
            status: "",
            content: ViewMoreContent?.HealthMetrics?.RHR,
            data: rangeData?.dateRange?.map((item: any) => ({ value: item?.minheartRate ?? 0, dataPointColor: item?.minheartRate === 0 ? AppColors.red : AppColors.blue, label: moment(item?.GPSTime).format(time === "Week" ? "ddd" : "DD,MMM") })) ?? [],
        },
    ]

    React.useEffect(() => {
        getRecomendations();
        GetRangeHeartData(moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD'));
        Ble.writeOnDevice(ArrayConstants.startActivity);
        Ble.writeOnDevice(ArrayConstants.getHeartRate);
    }, [])

    const [timer, setTimer] = React.useState<any>(null);
    React.useEffect(() => {
        clearTimeout(timer)
        const newTimer = setTimeout(() => {
            Ble.writeOnDevice(ArrayConstants.startActivity);
            Ble.writeOnDevice(ArrayConstants.getHeartRate);
        }, 3000)
        setTimer(newTimer)
    }, [Ble?.heartRate])

    return (
        <MetricsWrapper color={[AppColors.heartMetricsStart, AppColors.heartMetricsEnd]}>
            <StatusBar barStyle={'light-content'} />
            <AppHeader onBackPress={() => { navigation.goBack() }} iconColor={AppColors.white} title={en.Headings.HeartHealth} customStyle={{ color: AppColors.white, fontFamily: AppFonts.GeneralSans.semiBold }} wrapperStyle={{ marginTop: Platform.OS == 'android' ? 40 : AppConstants.topInsets }} />
            <ScrollView
                bounces={false}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}>
                {loadingHeart ? (
                    <ProgressSkeleton color={AppColors.heartMetricsEnd} />
                ) : (
                    <>
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
                                <LargeText text={`${progress}`} customStyle={{ fontFamily: AppFonts.GeneralSans.bold, fontSize: 70, letterSpacing: -2, color: AppColors.white }} />
                                <SmallText text='out of 100' customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: AppColors.dimWhite }} />
                            </View>
                        </View>
                        {/* <View style={styles.ViewMore}>
                            <Image source={AppImages.greenArrow} resizeMode='contain' style={{ width: 25, height: 25 }} />
                            <SmallText text='25%' customStyle={{ color: AppColors.green, fontFamily: AppFonts.GeneralSans.semiBold }} />
                            <SmallText text='better than last week' customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
                            <View style={styles.VertSeperater} />
                            <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate(AppRoutes.ViewMore, { name: en.Headings.HeartHealth }) }}>
                                <SmallText text='View More' customStyle={{ color: AppColors.placeholderColor, fontFamily: AppFonts.GeneralSans.semiBold }} />
                            </TouchableOpacity>
                        </View> */}
                    </>
                )}
                <View style={styles.DetailsView}>
                    {loadingHeart ? (
                        <MetricsSkeletons color={AppColors.heartMetricsEnd} />
                    ) : (<>
                        <NormalText text={en.MetricsModules.Recommendations} customStyle={{ fontSize: 20, fontFamily: AppFonts.GeneralSans.semiBold, paddingLeft: 23 }} />
                        <ScrollView
                            horizontal
                            overScrollMode='never'
                            contentContainerStyle={{ paddingLeft: 20 }}
                            showsHorizontalScrollIndicator={false}>
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
                        <NormalText text={en.MetricsModules.HeartRate} customStyle={{ fontSize: 20, fontFamily: AppFonts.GeneralSans.semiBold, paddingLeft: 23 }} />
                        <CustomRateDisplay progress={Ble?.heartRate ?? 0} monitering={UserDetails?.notify} live lottie title={"BPM"} min={UserDetails?.MinBPM ? parseInt(UserDetails?.MinBPM) : 70} max={UserDetails?.MaxBPM ? parseInt(UserDetails?.MaxBPM) : 160} />
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
                                ))
                                : (
                                    <View style={{ width: wp(85), alignItems: "center", justifyContent: "center", height: 160, alignSelf: "center" }}>
                                        <SmallText text='No Heart Data' />
                                    </View>
                                )
                            : rangeData ? (
                                DataRangeGraphsData.map((graph) => (
                                    <GraphDataDisplay key={graph.id} graphData={graph} time={time} />
                                ))
                            )
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

export default HealthMetrics