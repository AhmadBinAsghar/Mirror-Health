import { Image, InteractionManager, Platform, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native'
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
import moment from 'moment';
import DateTimePicker from 'react-native-ui-datepicker';
import { AppConstants } from '../../../../constants/AppConstants';
import ActivitiesModal from '../../../../components/Modals/ActivitiesModal';
import ProgressSkeleton from '../../../../components/Skeletons/ProgressSkeleton';
import MetricsSkeletons from '../../../../components/Skeletons/MetricsSkeletons';
import BleProvider from '../../../../navigations/BleProvider';
import { useDispatch, useSelector } from 'react-redux';
import { BleSDK } from '../../../../services/ble/Util/BleSDK';
import { API_REQUEST } from '../../../../network/NetworkRequest';
import { endPoints } from '../../../../network/endPoints';
import BarGraphDisplay from '../../../../components/GraphDataDisplay/BarGraphDisplay';
import { fetchActMetrics, userDetailsSave } from '../../../../redux/Slices/userDataSlice';
import { ViewMoreContent } from '../../../../constants/ViewMoreContent';
import ConnectDeviceModal from '../../../../components/Modals/ConnectDeviceModal';
import { AppRoutes } from '../../../../constants/AppRoutes';

const activities = [
    "Run", "Cycling", "Badminton", "Football", "Tennis", "Yoga", "Meditation", "Dance",
    "BasketBall", "Walk", "Workout", "Cricket", "Hiking", "Aerobics", "Ping-Pong", "Rope Jump", "Sit-ups"
];

const ActivityMetrics = () => {
    const navigation: any = useNavigation();
    const { ActToday, loadingAct } = useSelector((state: any) => state.userData);
    const UserDetails = useSelector((state: any) => state.userData.userDetails);
    const ConnectedDevice = useSelector((state: any) => state.bleDevice.device);
    const route: any = useRoute();
    const { routeData } = route.params ?? 0;
    const { asof } = route.params ?? '';
    const [progress, setProgress] = React.useState<number>(routeData);
    const [time, setTime] = React.useState<string>('Today');
    const [showClnder, setShowClnder] = React.useState<boolean>(false);
    const [showActivities, setShowActivties] = React.useState<boolean>(false);
    const [showConnect, setShowConnect] = React.useState<boolean>(false);
    const [StartDate, setStart] = React.useState<string>('');
    const [EndDate, setEnd] = React.useState<string>('');
    const [selectedAct, setSelectedAct] = React.useState<string>(UserDetails?.actType ?? '');
    const [selectedMode, setSelectedMode] = React.useState<any>(UserDetails?.actMode ?? null);
    const [onLoad, setOnLoad] = React.useState<boolean>(false);
    const [DataforGraph, setDataforGraph] = React.useState<any>(ActToday);
    const [rangeData, setRangeData] = React.useState<any>(null);
    const [recomendationsData, setRecomendationsData] = React.useState<any[]>([])
    const dispatch: any = useDispatch();
    const Ble = BleProvider();

    const postActData = (data: any) => {

        const raw = {
            activityType: selectedAct,
            steps: data?.step,
            distance: Math.abs(data?.distance),
            calories: Math.abs(data?.calories),
            heartRate: data?.heartRate,
            deviceId: ConnectedDevice?.id,
            GPSTime: data?.date,
            totalDuration: data?.ExerciseTime
        }
        // console.log("dataPOSTED", raw, "\n")
        API_REQUEST("POST", endPoints.actSend, raw,
            ((success: any) => {
                // console.log("ActSend :: ", success);
                setSelectedAct('');
                Ble.writeOnDevice([...BleSDK.GetActivityModeDataWithMode(0x99)])
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        // console.log("Data fetched :::")
                        dispatch(fetchActMetrics())
                    }, 500);
                });
            }),
            ((error: any) => {
                setSelectedAct('');
                console.log("ERROR in ActSend :: ", error)
            })
        )
    }
    const getRecomendations = () => {
        const data = {
            type: "activity",
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
    const startActivity = (mode: number, type: string) => {
        dispatch(userDetailsSave({ actStarted: true, actType: type, actMode: mode }))
        Ble.writeOnDevice([...BleSDK.EnterActivityMode(2, mode, 1)]);
    }

    React.useEffect(() => {
        // console.log("ble activity data", Ble?.actHistory)
        if (Ble?.actHistory?.length > 0) {
            postActData(Ble?.actHistory[0])
            // console.log("history data from sdk", Ble.actHistory, '\n')
        }
    }, [Ble.actHistory])

    const activtiyEnd = () => {
        Ble.writeOnDevice([...BleSDK.EnterActivityMode(2, selectedMode, 4)]);
        InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
                Ble.writeOnDevice([...BleSDK.GetActivityModeDataWithMode(0)])
            }, 500);
        });
        setSelectedMode(null);
        dispatch(userDetailsSave({ actStarted: false, actType: '', actMode: null }))
    }

    const GetRangeData = async (from: any, to: any) => {
        try {
            const data = {
                from: from,
                to: to
            }

            API_REQUEST("POST", endPoints.actTimly, data,
                ((sucess: any) => {
                    // console.log(JSON.stringify(sucess?.data));
                    setRangeData(sucess?.data)
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

    React.useEffect(() => {
        // console.log(JSON.stringify(DataforGraph))
        getRecomendations();
        GetRangeData(moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD'));
    }, [])

    const sumOfArray = (numbers: number[]): number => {
        return numbers?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    };

    // const graphsData = activities?.map((activity, index) => ({
    //     id: index + 1,
    //     title: activity,
    //     range: `${Math.floor((sumOfArray(DataforGraph?.data?.[activity]?.map((item: any) => parseInt(item?.totalDuration))) / 3600) ?? 0)} h`,
    //     status: "",
    //     content: ViewMoreContent?.ActMetrics?.Activities,
    //     data: DataforGraph?.data?.[activity]?.flatMap((item: any) => [
    //         { stacks: [{ value: parseInt(item?.heartRate), color: AppColors.red, label: moment(item?.endTime).format("HH A") }] },
    //         { stacks: [{ value: parseInt(item?.steps), color: AppColors.darkBlue, label: moment(item?.endTime).format("HH A") }] },
    //         { stacks: [{ value: parseInt(item?.calories), color: AppColors.orange, label: moment(item?.endTime).format("HH A") }] },
    //         { stacks: [{ value: parseInt(item?.distance), color: AppColors.lightBlue, label: moment(item?.endTime).format("HH A") }] }
    //     ]) ?? [],
    // }));

    const formatDuration = (totalSeconds: any) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        if (totalSeconds) {
            if (hours > 0) {
                return `${hours} h`; // Show hours only if greater than 0
            } else {
                return `${minutes} min`; // Show minutes otherwise
            }
        } else {
            return "0 min"; // Show 0 minutes if totalSeconds is 0
        }
    };

    const graphsData = activities?.map((activity, index) => ({
        id: index + 1,
        title: activity,
        range: formatDuration(sumOfArray(DataforGraph?.data?.[activity]?.map((item: any) => parseInt(item?.totalDuration)))),
        status: "",
        content: ViewMoreContent?.ActMetrics?.Activities,
        data: DataforGraph?.data?.[activity]?.flatMap((item: any) => [
            { stacks: [{ value: item?.heartRate ?? 0, color: AppColors.red }], label: moment(item?.GPSTime).format(time === "Week" ? "ddd,hA" : "DD,MMM") },
            { stacks: [{ value: item?.steps ?? 0, color: AppColors.darkBlue }], label: moment(item?.GPSTime).format(time === "Week" ? "ddd,hA" : "DD,MMM") },
            { stacks: [{ value: item?.calories ?? 0, color: AppColors.orange }], label: moment(item?.GPSTime).format(time === "Week" ? "ddd,hA" : "DD,MMM") },
            { stacks: [{ value: item?.distance ?? 0, color: AppColors.lightBlue }], label: moment(item?.GPSTime).format(time === "Week" ? "ddd,hA" : "DD,MMM") }
        ],
        ) ?? []
    }
    ));

    const rangedGraphData = activities?.map((activity, index) => ({
        id: index + 1,
        title: activity,
        range: formatDuration(sumOfArray(rangeData?.[activity]?.map((item: any) => parseInt(item?.totalDuration)))),
        status: "",
        content: ViewMoreContent?.ActMetrics?.Activities,
        data: rangeData?.[activity]?.flatMap((item: any) => [
            { stacks: [{ value: item?.heartRate ?? 0, color: AppColors.red }], label: moment(item?.GPSTime).format(time === "Week" ? "ddd,hA" : "DD,MMM") },
            { stacks: [{ value: item?.steps ?? 0, color: AppColors.darkBlue }], label: moment(item?.GPSTime).format(time === "Week" ? "ddd,hA" : "DD,MMM") },
            { stacks: [{ value: item?.calories ?? 0, color: AppColors.orange }], label: moment(item?.GPSTime).format(time === "Week" ? "ddd,hA" : "DD,MMM") },
            { stacks: [{ value: item?.distance ?? 0, color: AppColors.lightBlue }], label: moment(item?.GPSTime).format(time === "Week" ? "ddd,hA" : "DD,MMM") }
        ],
        ) ?? []
    }
    ));

    React.useEffect(() => {
        if (ActToday) {
            setDataforGraph(ActToday)
        }
    }, [ActToday])
    return (
        <MetricsWrapper color={[AppColors.activityStart, AppColors.activityEnd]}>
            <StatusBar barStyle={'light-content'} />
            <ConnectDeviceModal visible={showConnect} onClose={() => setShowConnect(!showConnect)} onContinue={() => { navigation.navigate(AppRoutes.MyDevice) }} />
            <ActivitiesModal visible={showActivities} onClose={() => { setShowActivties(!showActivities) }} onSelect={(label: string, id: number) => { startActivity(id, label); setSelectedMode(id); setSelectedAct(label); setShowActivties(!showActivities) }} />
            <AppHeader onBackPress={() => { navigation.goBack() }} iconColor={AppColors.white} title={en.Headings.MyActivity} customStyle={{ color: AppColors.white, fontFamily: AppFonts.GeneralSans.semiBold }} wrapperStyle={{ marginTop: Platform.OS == 'android' ? 40 : AppConstants.topInsets }} />
            <ScrollView
                bounces={false}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}>
                {loadingAct ? (
                    <ProgressSkeleton color={AppColors.activityEnd} />
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
                        <Image source={AppImages.arrowRed} resizeMode='contain' style={{ width: 25, height: 25 }} />
                        <SmallText text='11%' customStyle={{ color: AppColors.red, fontFamily: AppFonts.GeneralSans.semiBold }} />
                        <SmallText text='worse than last week' customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
                        <View style={styles.VertSeperater} />
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate(AppRoutes.ViewMore, { name: en.Headings.MyActivity }) }}>
                            <SmallText text='View More' customStyle={{ color: AppColors.placeholderColor, fontFamily: AppFonts.GeneralSans.semiBold }} />
                        </TouchableOpacity>
                    </View> */}
                </>)}
                <View style={styles.DetailsView}>
                    {loadingAct ? (
                        <MetricsSkeletons color={AppColors.activityEnd} />
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
                        <NormalText text={en.MetricsModules.ActivityScore} customStyle={{ fontSize: 20, fontFamily: AppFonts.GeneralSans.semiBold, paddingLeft: 23 }} />
                        <CustomRateDisplay progress={selectedMode != null ? Ble?.heartRate ?? 0 : 0} title={"BPM"} monitering={selectedMode != null ? true : false} live lottie selectedAct={selectedAct} onBtnPress={() => { UserDetails?.notify === undefined || UserDetails?.notify === false ? setShowConnect(!showConnect) : selectedMode != null ? activtiyEnd() : setShowActivties(!showActivities) }} btnText={selectedMode != null ? "End Activity" : "Start an Activity"} min={UserDetails?.MinBPM ? parseInt(UserDetails?.MinBPM) : 70} max={UserDetails?.MaxBPM ? parseInt(UserDetails?.MaxBPM) : 160} />
                        <View style={styles.seperater} />
                        <NormalText text={en.MetricsModules.Heartratezones} customStyle={{ fontSize: 20, fontFamily: AppFonts.GeneralSans.semiBold, marginVertical: 20, paddingLeft: 23 }} />
                        <View style={styles.DateView}>
                            <View style={styles.genderView}>
                                <TouchableOpacity onPress={() => setTime("Today")} style={[styles.genderBtn, { backgroundColor: time === "Today" ? AppColors.white : AppColors.transparent }]}>
                                    <SmallText text={en.MetricsModules.Today} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: time === "Today" ? AppColors.black : AppColors.placeholderColor }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setTime("Week"), GetRangeData(moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD')) }} style={[styles.genderBtn, { backgroundColor: time === "Week" ? AppColors.white : AppColors.transparent }]}>
                                    <SmallText text={en.MetricsModules.Week} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: time === "Week" ? AppColors.black : AppColors.placeholderColor }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setTime("Month"), GetRangeData(moment().subtract(1, 'M').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD')) }} style={[styles.genderBtn, { backgroundColor: time === "Month" ? AppColors.white : AppColors.transparent }]}>
                                    <SmallText text={en.MetricsModules.Month} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: time === "Month" ? AppColors.black : AppColors.placeholderColor }} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => { setShowClnder(!showClnder), GetRangeData(moment(StartDate?.toLocaleString()).format('YYYY-MM-DD'), moment(EndDate?.toLocaleString()).format('YYYY-MM-DD')), setTime("Range") }} style={styles.DateBtn}>
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
                            {StartDate && EndDate && <TouchableOpacity activeOpacity={0.8} onPress={() => { setShowClnder(!showClnder) }} style={styles.calnderFooter}>
                                <NormalText text={`Select Date Range ${moment(StartDate?.toLocaleString()).format('MM-DD')} / ${moment(EndDate?.toLocaleString()).format('MM-DD')}`} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, color: AppColors.white, marginRight: 4 }} />
                                <Image source={AppImages.trip} resizeMode='contain' style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>}
                        </View>}
                        {time === 'Today' ?
                            DataforGraph ?
                                graphsData.map((graph) => (
                                    graph?.data?.length > 0 ?
                                        <BarGraphDisplay key={graph.id} suf={''} graphData={graph} time={time} />

                                        :
                                        <></>
                                ))
                                : (
                                    <View style={{ width: wp(85), alignItems: "center", justifyContent: "center", height: 160, alignSelf: "center" }}>
                                        <SmallText text='No Activity Data' />
                                    </View>
                                )
                            : rangeData ? (
                                rangedGraphData?.map((graph: any) => (
                                    graph?.data?.length > 0 ?
                                        <BarGraphDisplay key={graph.id} suf={''} graphData={graph} time={time} />
                                        : <></>
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

export default ActivityMetrics