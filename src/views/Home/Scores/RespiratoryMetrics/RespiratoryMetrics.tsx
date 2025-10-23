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
import MetricsSkeletons from '../../../../components/Skeletons/MetricsSkeletons';
import BleProvider from '../../../../navigations/BleProvider';
import { useSelector } from 'react-redux';
import { ArrayConstants } from '../../../../constants/BleProviderConstants/ContantsArray';
import { BleSDK } from '../../../../services/ble/Util/BleSDK';
import { API_REQUEST } from '../../../../network/NetworkRequest';
import { endPoints } from '../../../../network/endPoints';
import { Datum } from './interface';
import { ViewMoreContent } from '../../../../constants/ViewMoreContent';
import { AppRoutes } from '../../../../constants/AppRoutes';
import ConnectDeviceModal from '../../../../components/Modals/ConnectDeviceModal';

const RespiratoryMetrics = () => {
    const { SPO2Today, loadingSPO2 } = useSelector((state: any) => state.userData);
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
    const [todaysData, setTodaysData] = React.useState<any>(SPO2Today);
    const [rangeData, setRangeData] = React.useState<any>();
    const [recomendationsData, setRecomendationsData] = React.useState<any[]>([])
    const Ble = BleProvider();
    const [moniter, setMonitor] = React.useState<boolean>(false);
    const [showConnect, setShowConnect] = React.useState<boolean>(false);

    const getRecomendations = () => {
        const data = {
            type: "spo2",
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
    const GetRangeSpOData = async (from: any, to: any) => {
        try {
            const data = {
                from: from,
                to: to
            }
            API_REQUEST("POST", endPoints.timelySpO, data,
                ((sucess: any) => {
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
    const GraphsData = [
        {
            id: 1,
            title: "SpO2",
            range: `${todaysData?.SPO2Data?.today?.highestSPO2 ?? 0}`,
            status: "",
            content: ViewMoreContent?.RespiratoryMetrics.SPO2,
            data: todaysData?.SPO2Data?.today?.data?.map((item: any) => ({ value: item?.spo2 ?? 0, dataPointColor: item?.spo2 === 0 ? AppColors.red : AppColors.blue, label: item?.GPSTime === 0 ? 12 + "AM" : item?.GPSTime === 12 ? 12 + "PM" : item?.GPSTime > 12 ? item?.GPSTime - 12 + "PM" : item?.GPSTime + "AM" })) ?? [],
        },
        // {
        //     id: 2,
        //     title: "Breathes/min",
        //     range: `${todaysData?.today?.breathingData?.lowestBeatsPerMin ?? 0}-${todaysData?.today?.breathingData?.highestBeatsPerMin ?? 0}`,
        //     status: "",
        //     data: todaysData?.today?.breathingData?.data?.map((item: any) => ({ value: item?.beatsPerMin })),
        // },
    ]
    const rangedGraphsData = [
        {
            id: 1,
            title: "SpO2",
            range: `${rangeData?.SPO2Data?.highestSPO2 ?? 0}`,
            status: "",
            content: ViewMoreContent?.RespiratoryMetrics.SPO2,
            data: rangeData?.SPO2Data?.dateRange?.map((item: Datum) => ({ value: item?.spo2 ?? 0, dataPointColor: item?.spo2 === 0 ? AppColors.red : AppColors.blue, label: moment(item?.GPSTime).format(time === "Week" ? "ddd" : "DD,MMM") })) ?? [],
        },
        // {
        //     id: 2,
        //     title: "Breathes/min",
        //     range: `${rangeData?.breathingData?.lowestBeatsPerMin ?? 0}-${rangeData?.breathingData?.highestBeatsPerMin ?? 0}`,
        //     status: "",
        //     data: rangeData?.breathingData?.dateRange?.map((item: any) => ({ value: item?.beatsPerMin })),
        // },
    ]

    const startVO2test = () => {
        setMonitor(true);
        Ble.writeOnDevice(ArrayConstants.startActivity);
        Ble.writeOnDevice(ArrayConstants.getOxygenRate);
    }
    React.useEffect(() => {
        getRecomendations();
        GetRangeSpOData(moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().subtract(1, 'day').format('YYYY-MM-DD'));
    }, [])
    return (
        <MetricsWrapper color={[AppColors.RespiratoryStart, AppColors.RespiratoryEnd]}>
            <StatusBar barStyle={'light-content'} />
            <ConnectDeviceModal visible={showConnect} onClose={() => setShowConnect(!showConnect)} onContinue={() => { navigation.navigate(AppRoutes.MyDevice) }} />
            <AppHeader onBackPress={() => { navigation.goBack() }} iconColor={AppColors.white} title={en.Headings.Respiratory} customStyle={{ color: AppColors.white, fontFamily: AppFonts.GeneralSans.semiBold }} wrapperStyle={{ marginTop: Platform.OS == 'android' ? 40 : AppConstants.topInsets }} />
            <ScrollView
                bounces={false}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}>
                {loadingSPO2 ? (
                    <ProgressSkeleton color={AppColors.RespiratoryEnd} />
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
                            <LargeText text={`${progress}`} customStyle={{ fontFamily: AppFonts.GeneralSans.bold, fontSize: 70, letterSpacing: -2, color: AppColors.white }} />
                            <SmallText text='out of 100' customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: AppColors.dimWhite }} />
                        </View>
                    </View>
                    {/* <View style={styles.ViewMore}>
                        <Image source={AppImages.greenArrow} resizeMode='contain' style={{ width: 25, height: 25 }} />
                        <SmallText text='15%' customStyle={{ color: AppColors.green, fontFamily: AppFonts.GeneralSans.semiBold }} />
                        <SmallText text='better than last week' customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
                        <View style={styles.VertSeperater} />
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate(AppRoutes.ViewMore, { name: en.Headings.Respiratory }) }}>
                            <SmallText text='View More' customStyle={{ color: AppColors.placeholderColor, fontFamily: AppFonts.GeneralSans.semiBold }} />
                        </TouchableOpacity>
                    </View> */}
                </>)}
                <View style={styles.DetailsView}>
                    {loadingSPO2 ? (
                        <MetricsSkeletons color={AppColors.RespiratoryEnd} />
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
                        <NormalText text={en.MetricsModules.VO2test} customStyle={{ fontSize: 20, fontFamily: AppFonts.GeneralSans.semiBold, paddingLeft: 23 }} />
                        <CustomRateDisplay progress={Ble.SpO2 ?? 0} title={"SPO2"} monitering={moniter ? UserDetails?.notify : false} live onBtnPress={() => { UserDetails?.notify === undefined || UserDetails?.notify === false ? setShowConnect(!showConnect) : startVO2test() }} btnText={'Begin SPO2 test'} />
                        <View style={styles.seperater} />
                        <NormalText text={en.MetricsModules.Historicalrecords} customStyle={{ fontSize: 20, fontFamily: AppFonts.GeneralSans.semiBold, marginVertical: 20, paddingLeft: 23 }} />
                        <View style={styles.DateView}>
                            <View style={styles.genderView}>
                                <TouchableOpacity onPress={() => setTime("Today")} style={[styles.genderBtn, { backgroundColor: time === "Today" ? AppColors.white : AppColors.transparent }]}>
                                    <SmallText text={en.MetricsModules.Today} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: time === "Today" ? AppColors.black : AppColors.placeholderColor }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setTime("Week"); GetRangeSpOData(moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().subtract(1, 'day').format('YYYY-MM-DD')); }} style={[styles.genderBtn, { backgroundColor: time === "Week" ? AppColors.white : AppColors.transparent }]}>
                                    <SmallText text={en.MetricsModules.Week} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: time === "Week" ? AppColors.black : AppColors.placeholderColor }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setTime("Month"); GetRangeSpOData(moment().subtract(1, 'M').format('YYYY-MM-DD'), moment().subtract(1, 'day').format('YYYY-MM-DD')) }} style={[styles.genderBtn, { backgroundColor: time === "Month" ? AppColors.white : AppColors.transparent }]}>
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
                            {StartDate && EndDate && <TouchableOpacity activeOpacity={0.8} onPress={() => { setShowClnder(!showClnder), GetRangeSpOData(moment(StartDate?.toLocaleString()).format('YYYY-MM-DD'), moment(EndDate?.toLocaleString()).format('YYYY-MM-DD')), setTime("Range") }} style={styles.calnderFooter}>
                                <NormalText text={`Select Date Range ${moment(StartDate?.toLocaleString()).format('MM-DD')} / ${moment(EndDate?.toLocaleString()).format('MM-DD')}`} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, color: AppColors.white, marginRight: 4 }} />
                                <Image source={AppImages.trip} resizeMode='contain' style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>}
                        </View>}
                        {time === 'Today' ?
                            GraphsData[0]?.data?.length > 0 ?
                                GraphsData.map((graph) => (
                                    <GraphDataDisplay key={graph.id} graphData={graph} time={time} />
                                ))
                                : <View style={{ width: wp(85), alignItems: "center", justifyContent: "center", height: 160, alignSelf: "center" }}>
                                    <SmallText text='No Respiratory Data' />
                                </View>
                            : rangeData && rangeData?.SPO2Data?.dateRange?.length > 0 && rangeData?.breathingData?.dateRange?.length > 0 ? (
                                rangedGraphsData.map((graph) => (
                                    <GraphDataDisplay key={graph.id} graphData={graph} time={time} />
                                ))
                            )
                                : <View style={{ width: wp(85), alignItems: "center", justifyContent: "center", height: 160, alignSelf: "center" }}>
                                    <SmallText text='No Past Data' />
                                </View>
                        }
                    </>)}
                </View>
            </ScrollView>
        </MetricsWrapper>
    )
}

export default RespiratoryMetrics