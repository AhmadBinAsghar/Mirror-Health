import {
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import en from '../../../../translation/en.json';
import LargeText from '../../../components/AppText/LargeText';
import { AppImages } from '../../../assets/images/AppImages';
import SmallText from '../../../components/AppText/SmallText';
import { AppColors } from '../../../assets/colors/AppColors';
import { AppFonts } from '../../../constants/AppFonts';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from '../../../constants/AppRoutes';
import NormalText from '../../../components/AppText/NormalText';
import ScoreData from '../../../components/ScoreData/ScoreData';
import ScoreDashboardSkeleton from '../../../components/Skeletons/ScoreDashboardSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import BleProvider from '../../../navigations/BleProvider';
import { BleSDK } from '../../../services/ble/Util/BleSDK';
import MyDeviceTime from '../../../services/ble/model/MyDeviceTime';
import moment from 'moment';
import useSocketHook from '../../../socketContext/useSocketHook';
import { API_REQUEST } from '../../../network/NetworkRequest';
import { endPoints } from '../../../network/endPoints';
import {
    fetchActMetrics,
    fetchHeartMetrics,
    fetchImmuneMetrics,
    fetchRespMetrics,
    fetchSleepMetrics,
    fetchStressMetrics,
    fetchZoneMetrics,
    userDataSave,
    userDetailsSave,
} from '../../../redux/Slices/userDataSlice';
import ImageComponent from '../../../components/ImageComponent/ImageComponent';
import { AutoMode } from '../../../services/ble/model/AutoMode';
import MyAutomaticHRMonitoring from '../../../services/ble/model/MyAutomaticHRMonitoring';
import { MonitoringConstants } from '../../../constants/BleProviderConstants/DeviceMoniteringContants';
import { ArrayConstants } from '../../../constants/BleProviderConstants/ContantsArray';

interface Person {
    id?: number;
    userId?: number;
    avatar?: any;
    name: string;
    alert?: boolean;
    stressScore?: number;
    immuneScore?: number;
    heartScore?: number;
    SPO2Score?: number;
    sleepScore?: number;
    activityScore?: number;
    repiratoryScore?: number;
    stressMessage?: string;
    immuneMessage?: string;
    heartMessage?: string;
    spO2Message?: string;
    sleepMessage?: string;
    activityMessage?: string;
    respiratoryMessage?: string;
}
const Scores = () => {
    const UserData = useSelector((state: any) => state.userData.userData);
    const UserDetails = useSelector((state: any) => state.userData.userDetails);
    const ConnectedDevice = useSelector((state: any) => state.bleDevice.device);
    const [realTimeScore, setRealTimeScore] = React.useState<any>({});
    const Ble = BleProvider();
    const navigation: any = useNavigation();
    const [selected, setSelected] = React.useState<Person>({
        id: 1,
        userId:UserData?.userId,
        avatar: UserDetails?.profileImage ?? null,
        name: 'Me',
        alert: false,
    });
    const [onLoad, setOnLoad] = React.useState<boolean>(true);
    const [greetings, setGreeting] = React.useState<string>('');
    const [DataSendOnce, SetDataSendOnce] = React.useState<boolean>(false);
    const { socket } = useSocketHook();
    const dispatch: any = useDispatch();
    const [heartGraph, setHeartGraph] = React.useState<any[]>([]);
    const [sleepGraph, setSleepGraph] = React.useState<any[]>([]);
    const [spo2Graph, setSpo2Graph] = React.useState<any[]>([]);
    const [actGraph, setActGraph] = React.useState<any[]>([]);
    const [stressGraph, setStressGraph] = React.useState<any[]>([]);
    const [immuneGraph, setImmuneGraph] = React.useState<any[]>([]);
    const [sync, setSync] = React.useState<boolean>(false);
    const myData = [
        {
            id: 1,
            userId:UserData?.userId,
            avatar: UserDetails?.profileImage ?? null,
            name: 'Me',
            alert: false,
        },
    ];
    const [membersData, setMembersData] = React.useState<any[]>([
        {
            id: 1,
            userId:UserData?.userId,
            avatar: UserDetails?.profileImage ?? null,
            name: 'Me',
            alert: false,
        },
    ]);

      const SleepDummyData = [
        {
            arraySleepQuality:
              '3 3 3 3 3 3 3 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2',
            date: '2024-11-26 07:00:00',
            sleepUnitLength: '1',
          },
        {
            arraySleepQuality:
              '5 5 5 5 5 5 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2',
            date: '2024-11-26 06:00:00',
            sleepUnitLength: '1',
          },
        {
          arraySleepQuality:
            '5 5 5 5 5 2 2 2 2 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 2 2 2 3 3 3 3 2 3 3 3 3 3 3 3 3 3 2 3 2 3 3 2 2 3 2 3 3 2',
          date: '2024-11-26 05:20:03',
          sleepUnitLength: '1',
        },
        {
          arraySleepQuality:
            '11 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 2 2 1 1 1 2 1 2 2 1 2 2 1 1 2 2 1 2 2 2 2 2 2 2 2 2 2 2',
          date: '2024-11-26 04:43:00',
          sleepUnitLength: '1',
        },
        {
          arraySleepQuality:
            '5 5 5 5 5 5 5 2 2 2 2 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 2 2 2 2 2 2',
          date: '2024-11-26 03:48:01',
          sleepUnitLength: '1',
        },
        {
          arraySleepQuality:
            '5 5 5 5 5 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 2 1 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 3 3 3 3 3 3 3 3 3 2 2 3 3 3 3 3 3 3 2 3 3 3 3 2 3 2 2 2 3 3 2 2 2 2 2 2',
          date: '2024-11-26 01:24:00',
          sleepUnitLength: '1',
        },
        {
          arraySleepQuality:
            '5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 3 2 2 2 2 2',
          date: '2024-11-25 23:05:00',
          sleepUnitLength: '1',
        },
        {
          arraySleepQuality: '2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2',
          date: '2024-11-25 11:36:01',
          sleepUnitLength: '1',
        },
      ];
    const scoreCalculation = (data: any[]) => {
        setHeartGraph(
            data?.map(
                (item: any) => item?.cardicScore && Math.floor(item?.cardicScore),
            ) ?? [],
        );
        setSpo2Graph(
            data?.map(
                (item: any) =>
                    item?.respiratoryScore && Math.floor(item?.respiratoryScore),
            ),
        );
        setSleepGraph(
            data?.map(
                (item: any) => item?.sleepScore && Math.floor(item?.sleepScore),
            ) ?? [],
        );
        setActGraph(
            data?.map(
                (item: any) => item?.activityScore && Math.floor(item?.activityScore),
            ) ?? [],
        );
        setStressGraph(
            data?.map(
                (item: any) => item?.stressScore && Math.floor(item?.stressScore),
            ) ?? [],
        );
        setImmuneGraph(
            data?.map(
                (item: any) => item?.immuneScore && Math.floor(item?.immuneScore),
            ) ?? [],
        );
    };

    const GetRangeScoreData = async (from: any, to: any) => {
        try {
            const data = {
                from: from,
                to: to,
            };
            API_REQUEST(
                'POST',
                endPoints.getScores,
                data,
                (sucess: any) => {
                    // console.log("Weekly Score data ::",sucess?.data ?? [])
                    scoreCalculation(sucess?.data ?? []);
                    setSync(false);
                },
                (error: any) => {
                    console.log(error);
                    setSync(false);
                },
            );
        } catch (e) {
            console.log(e);
            setSync(false);
        }
    };
    const getUserInfo = async () => {
        const method = 'GET';
        API_REQUEST(
            method,
            endPoints.getUserInfo,
            null,
            (success: any) => {
                dispatch(userDataSave(success?.data?.userData));
                dispatch(userDetailsSave(success?.data?.userDetails));
            },
            (error: any) => {
                console.log(error);
            },
        );
    };
    const getUserHR = async () => {
        const method = 'GET';
        API_REQUEST(
            method,
            endPoints.userHR,
            null,
            (success: any) => {
                dispatch(
                    userDetailsSave({
                        MaxBPM: success?.data?.maxHr,
                        MinBPM: success?.data?.minHr,
                    }),
                );
            },
            (error: any) => {
                console.log('ERROR IN MIN/MAX HR :: ', error);
            },
        );
    };
    const sendHealthData = async () => {
        const method = 'POST';
        const cardiodata = {
            cardic: Ble?.HRVArrayData,
            deviceId: ConnectedDevice?.id,
            calibration: false,
        };
        const spO2data = {
            spo2: Ble?.oxygenArray,
            deviceId: ConnectedDevice?.id,
            calibration: false,
        };
        const tempdata = {
            temp: Ble?.tempArray,
            deviceId: ConnectedDevice?.id,
            calibration: false,
        };
        const sleepdata = {
            sleep: Ble?.sleepArray,
            deviceId: ConnectedDevice?.id,
            calibration: false,
        };
        try {
            if (cardiodata?.cardic?.length > 1) {
                console.log("CardioDATA FROM DEVICE ::",cardiodata?.cardic)
                API_REQUEST(
                    method,
                    endPoints.storeHealth,
                    cardiodata,
                    async (success: any) => {
                        Ble.writeOnDevice([
                            ...BleSDK.getHRVDataWithMode(
                                0x99,
                                moment().format('yyyy.MM.dd HH:mm:ss'),
                            ),
                        ]);
                        Ble.writeOnDevice([
                            ...BleSDK.getStaticHRWithModeFunction(
                                0x99,
                                moment().format('yyyy.MM.dd HH:mm:ss'),
                            ),
                        ]);
                        Ble.writeOnDevice([
                            ...BleSDK.getDynamicHRWithModeFunction(
                                0x99,
                                moment().format('yyyy.MM.dd HH:mm:ss'),
                            ),
                        ]);
                        dispatch(fetchHeartMetrics());
                        dispatch(fetchStressMetrics());
                    },
                    (error: any) => {
                        console.log(
                            'ERROR ON SENDING Cardio DATA========================>\n',
                            error,
                        );
                    },
                );
            }
            if (spO2data?.spo2?.length > 1) {
                console.log("SpO2DATA FROM DEVICE ::",spO2data.spo2);
                API_REQUEST(
                    method,
                    endPoints.storeHealth,
                    spO2data,
                    async (success: any) => {
                        Ble.writeOnDevice([...BleSDK.OxygenData(0x99)]);
            dispatch(fetchRespMetrics());
                    },
                    (error: any) => {
                        console.log(
                            'ERROR ON SENDING SPO2 DATA========================>\n',
                            error,
                        );
                    },
                );
            }
            if (tempdata?.temp?.length > 1 ) {
                API_REQUEST(
                    method,
                    endPoints.storeHealth,
                    tempdata,
                    async (success: any) => {
                console.log("TEMPDATA FROM DEVICE ::",tempdata?.temp);
                        Ble.writeOnDevice([
                            ...BleSDK.getTemperatureHistoryData(
                                0x99,
                                moment().format('yyyy.MM.dd HH:mm:ss'),
                            ),
                        ]);
                        dispatch(fetchImmuneMetrics());
                    },
                    (error: any) => {
                        console.log(
                            'ERROR ON SENDING TEMP DATA========================>\n',
                            error,
                        );
                    },
                );
            }
            if (sleepdata?.sleep?.length > 1 ) {
                API_REQUEST(
                    method,
                    endPoints.storeHealth,
                    sleepdata,
                    async (success: any) => {
                console.log("SLEEPDATA FROM DEVICE ::",sleepdata?.sleep);
                        Ble.writeOnDevice([
                            ...BleSDK.GetDetailSleepDataWithMode(
                                0x99,
                                moment().format('yyyy.MM.dd HH:mm:ss'),
                            ),
                        ]);
            dispatch(fetchSleepMetrics());
                    },
                    (error: any) => {
                        console.log(
                            'ERROR ON SENDING SLEEP DATA ========================>\n',
                            error,
                        );
                    },
                );
            }
        } catch (error) {
            console.log(
                'ERROR IN FUNCTION SENDING HEALTH DATA========================>\n',
                error,
            );
        }
    };
    const UserScores = [
        {
            id: 1,
            icon: AppImages.heartRed,
            screen: AppRoutes.HealthMetrics,
            color: AppColors.pink,
            score:
                selected?.name === 'Me'
                    ? realTimeScore?.heartScore
                        ? Math.round(realTimeScore?.heartScore)
                        : 0
                    : Math.round(selected?.heartScore ?? 0),
            title: 'Heart',
            status:
                selected?.name === 'Me'
                    ? realTimeScore?.heartMessage ?? ''
                    : selected?.heartMessage ?? '',
            data: heartGraph?.map((item: any) => ({ value: item })) ?? [],
            asof: realTimeScore?.asof ?? '',
            type: 'Line',
            // data: [{ value: 40 }, { value: 30 }, { value: 54 }, { value: 10 }, { value: 24 }, { value: 30 }, { value: 76 }],
        },
        {
            id: 2,
            icon: AppImages.night,
            screen: AppRoutes.SleepMetrics,
            color: AppColors.darkGrey,
            score:
                selected.name === 'Me'
                    ? realTimeScore?.sleepScore
                        ? Math.round(realTimeScore?.sleepScore)
                        : 0
                    : Math.round(selected?.sleepScore ?? 0),
            title: 'Sleep',
            status:
                selected?.name === 'Me'
                    ? realTimeScore?.sleepMessage ?? ''
                    : selected?.sleepMessage ?? '',
            asof: realTimeScore?.asof ?? '',
            data: sleepGraph?.map((item: any) => ({ value: item })) ?? [],
            type: 'Line',
        },
        {
            id: 3,
            icon: AppImages.lungs,
            screen: AppRoutes.RespiratoryMetrics,
            color: AppColors.naviBlue,
            score:
                selected.name === 'Me'
                    ? realTimeScore?.repiratoryScore
                        ? Math.round(realTimeScore?.repiratoryScore)
                        : 0
                    : Math.round(selected?.repiratoryScore ?? 0),
            title: 'Respiratory',
            status:
                selected?.name === 'Me'
                    ? realTimeScore?.respiratoryMessage ?? ''
                    : selected?.respiratoryMessage ?? '',
            data: spo2Graph?.map((item: any) => ({ value: item })) ?? [],
            asof: realTimeScore?.asof ?? '',
            type: 'Line',
            // data: [{ value: 66 }, { value: 30 }, { value: 24 }, { value: 10 }, { value: 40 }, { value: 30 }, { value: 40 }],
        },
        {
            id: 4,
            icon: AppImages.person,
            screen: AppRoutes.ActivityMetrics,
            color: AppColors.purple,
            score:
                selected.name === 'Me'
                    ? realTimeScore?.activityScore
                        ? Math.round(realTimeScore?.activityScore)
                        : 0
                    : Math.round(selected?.activityScore ?? 0),
            title: 'Activity',
            status:
                selected?.name === 'Me'
                    ? realTimeScore?.activityMessage ?? ''
                    : selected?.activityMessage ?? '',
            type: 'Line',
            asof: realTimeScore?.asof ?? '',
            data: actGraph?.map((item: any) => ({ value: item })) ?? [],
            // data: [{ value: 40 }, { value: 30 }, { value: 54 }, { value: 10 }, { value: 24 }, { value: 30 }, { value: 76 }],
        },
        {
            id: 5,
            icon: AppImages.stress,
            screen: AppRoutes.StressMetrics,
            color: AppColors.orange,
            score:
                selected.name === 'Me'
                    ? realTimeScore?.stressScore
                        ? Math.round(realTimeScore?.stressScore)
                        : 0
                    : Math.round(selected?.stressScore ?? 0),
            title: 'Stress',
            status:
                selected?.name === 'Me'
                    ? realTimeScore?.stressMessage ?? ''
                    : selected?.stressMessage ?? '',
            asof: realTimeScore?.asof ?? '',
            data: stressGraph?.map((item: any) => ({ value: item })) ?? [],
            type: 'Line',
            // data: [{ value: 20 }, { value: 30 }, { value: 18 }, { value: 54 }, { value: 24 }, { value: 30 }, { value: 14 }],
        },
        {
            id: 6,
            icon: AppImages.immune,
            screen: AppRoutes.ConsumptionMetrics,
            color: AppColors.immuneStart,
            score:
                selected.name === 'Me'
                    ? realTimeScore?.immuneScore
                        ? Math.round(realTimeScore?.immuneScore)
                        : 0
                    : Math.round(selected?.immuneScore ?? 0),
            title: 'Immune',
            status:
                selected?.name === 'Me'
                    ? realTimeScore?.immuneMessage ?? ''
                    : selected?.immuneMessage ?? '',
            asof: realTimeScore?.asof ?? '',
            data: immuneGraph?.map((item: any) => ({ value: item })) ?? [],
            type: 'Line',
            // data: [{ value: 40 }, { value: 30 }, { value: 54 }, { value: 10 }, { value: 24 }, { value: 30 }, { value: 76 }],
        },
    ];

    React.useEffect(() => {
        getUserInfo();
        getUserHR();
        const currentTime = moment();
        const currentHour = currentTime.hour();

        if (currentHour >= 4 && currentHour < 12) {
            setGreeting('Good Morning');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good Afternoon');
        } else if (currentHour >= 18 && currentHour < 21) {
            setGreeting('Good Evening');
        } else {
            setGreeting('Good Night');
        }
    }, []);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // getMetricsScore();
            // console.log("\n\nUser TimeZone=========================\n", Intl.DateTimeFormat().resolvedOptions().timeZone, "\n\n", new MyDeviceTime().toString())
            SetDataSendOnce(false);
            GetRangeScoreData(
                moment().subtract(7, 'days').format('YYYY-MM-DD'),
                moment().format('YYYY-MM-DD'),
            );
            Ble.writeOnDevice(ArrayConstants.endActivity);
            Ble.writeOnDevice([...BleSDK.setDeviceTime(new MyDeviceTime())]);
            Ble.writeOnDevice([...BleSDK.OxygenData(0)]);
            Ble.writeOnDevice([
                ...BleSDK.GetDetailSleepDataWithMode(
                    0,
                    moment().format('yyyy.MM.dd HH:mm:ss'),
                ),
            ]);
            Ble.writeOnDevice([
                ...BleSDK.setAutomaticHRMonitoring(
                    new MyAutomaticHRMonitoring(
                        2,
                        0,
                        0,
                        23,
                        59,
                        7,
                        MonitoringConstants.heartRate,
                    ),
                    AutoMode.AutoHeartRate,
                ),
            ]);
            Ble.writeOnDevice([
                ...BleSDK.setAutomaticHRMonitoring(
                    new MyAutomaticHRMonitoring(
                        2,
                        0,
                        0,
                        23,
                        59,
                        7,
                        MonitoringConstants.spo2,
                    ),
                    AutoMode.AutoSpo2,
                ),
            ]);
            Ble.writeOnDevice([
                ...BleSDK.setAutomaticHRMonitoring(
                    new MyAutomaticHRMonitoring(
                        2,
                        0,
                        0,
                        23,
                        59,
                        7,
                        MonitoringConstants.temperature,
                    ),
                    AutoMode.AutoTemp,
                ),
            ]);
            Ble.writeOnDevice([
                ...BleSDK.setAutomaticHRMonitoring(
                    new MyAutomaticHRMonitoring(
                        2,
                        0,
                        0,
                        23,
                        59,
                        7,
                        MonitoringConstants.hrv,
                    ),
                    AutoMode.AutoHrv,
                ),
            ]);
            Ble.writeOnDevice([
                ...BleSDK.getDynamicHRWithModeFunction(
                    1,
                    moment().format('yyyy.MM.dd HH:mm:ss'),
                ),
            ]);
            Ble.writeOnDevice([
                ...BleSDK.getStaticHRWithModeFunction(
                    1,
                    moment().format('yyyy.MM.dd HH:mm:ss'),
                ),
            ]);
            Ble.writeOnDevice([
                ...BleSDK.getHRVDataWithMode(0, moment().format('yyyy.MM.dd HH:mm:ss')),
            ]);
            Ble.writeOnDevice([
                ...BleSDK.getTemperatureHistoryData(
                    0,
                    moment().format('yyyy.MM.dd HH:mm:ss'),
                ),
            ]);
            // console.log(UserData?.userId);
            dispatch(fetchHeartMetrics());
            dispatch(fetchRespMetrics());
            dispatch(fetchActMetrics());
            dispatch(fetchSleepMetrics());
            dispatch(fetchStressMetrics());
            dispatch(fetchImmuneMetrics());
            // dispatch(fetchZoneMetrics());
            setInterval(() => {
                setOnLoad(false);
            }, 2000);
            socket?.emit('allMetricsData', {
                data: {
                    userId: UserData?.userId,
                },
            });
        });
        return unsubscribe;
    }, []);

    React.useEffect(() => {
        socket?.emit('allMetricsData', {
            data: {
                userId: UserData?.userId,
            },
        });
        // console.log("User Id::\n", UserData?.userId, "\n\n");
        socket?.on('score', (data: any) => {
            setRealTimeScore(data?.data?.formattedScores);
            setMembersData(membersData?.concat(data?.data?.relativesData ?? []));
            console.log(
                'new values has received in  [Scores] ::\n ',
                    // JSON.stringify(data),
                UserData?.userId,
                //     '\n',
            );
        });
        socket?.on('error', (data: any) => {
            // console.log("Error has received in  [Scores] ::\n ", data, UserData?.userId, "\n");
        });

        // Cleanup function
        return () => {
            socket?.off('score');
            socket?.off('error');
        };
    }, [socket]);

    React.useEffect(() => {
        // console.log("SleepData==========================", Ble?.sleepArray)
        if (
            DataSendOnce === false &&
            (Ble?.HRVArrayData?.length > 0 ||
                Ble?.oxygenArray?.length > 0 ||
                Ble?.tempArray?.length > 0 ||
                Ble?.sleepArray?.length > 0)
        ) {
            SetDataSendOnce(true);
            sendHealthData();
        }
    }, [Ble?.HRVArrayData]);

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.header}>
                <LargeText
                    text={en.Scores.HealthDashboard}
                    customStyle={{ fontSize: 20 }}
                />
                <View style={{ flexDirection: 'row' }}>
                    {/* {sync ?
                        <View style={{ borderRadius: 100, height: 20, width: 40, overflow: 'hidden', alignItems: "center", justifyContent: "center", marginRight: 3 }} >
                            <LottieView source={require('../../../assets/lottieFile/loader.json')} speed={1.5} autoPlay={sync} loop={sync} style={{ width: 120, height: 120 }} />
                        </View>
                        : <TouchableOpacity style={{ marginHorizontal: 15 }} activeOpacity={0.8} hitSlop={10} onPress={() => { SyncData() }}>
                            <Image source={AppImages.refreshIcon} resizeMode='contain' style={styles.notiIcon} />
                        </TouchableOpacity>
                    } */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        hitSlop={10}
                        onPress={() => {
                            navigation.navigate(AppRoutes.MyDevice);
                        }}>
                        <Image
                            source={UserDetails?.notify ? AppImages.bleCtd : AppImages.ble}
                            resizeMode="contain"
                            style={styles.notiIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                nestedScrollEnabled
                overScrollMode="never"
                showsVerticalScrollIndicator={false}>
                <View style={styles.members}>
                    <ScrollView
                        horizontal
                        nestedScrollEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}>
                        {membersData?.map(mem => (
                            <TouchableOpacity
                                key={mem?.userId}
                                activeOpacity={0.8}
                                onPress={() => setSelected(mem)}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 80,
                                }}>
                                <View
                                    style={{
                                        height: 55,
                                        width: 55,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginVertical: 4,
                                        marginHorizontal: 2,
                                    }}>
                                    <View
                                        style={[
                                            styles.memberItem,
                                            {
                                                borderWidth: mem?.userId === selected?.userId ? 2 : 0,
                                                borderColor: AppColors.blue,
                                                elevation: mem?.userId === selected?.userId ? 8 : 0,
                                            },
                                        ]}>
                                        <ImageComponent
                                            uri={mem?.avatar}
                                            customStyle={[
                                                styles.memberImage,
                                                {
                                                    width: mem?.userId === selected?.userId ? 50 : 40,
                                                    height: mem?.userId === selected?.userId ? 50 : 40,
                                                },
                                            ]}
                                        />
                                        {mem?.alert && mem?.userId != selected?.userId && (
                                            <Image
                                                source={AppImages.alert}
                                                resizeMode="contain"
                                                style={styles.alertIcon}
                                            />
                                        )}
                                    </View>
                                </View>
                                <SmallText
                                    text={mem?.name}
                                    customStyle={{
                                        fontSize: 12,
                                        fontFamily:
                                            mem?.userId === selected?.userId
                                                ? AppFonts.GeneralSans.semiBold
                                                : AppFonts.GeneralSans.medium,
                                        color:
                                            mem?.userId === selected.userId
                                                ? AppColors.black
                                                : AppColors.placeholderColor,
                                    }}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: AppColors.background }}>
                    <View style={styles.body}>
                        <View style={styles.greetings}>
                            {selected?.name === 'Me' ? (
                                <>
                                    <LargeText
                                        text={`${greetings}, `}
                                        customStyle={{
                                            fontSize: 26,
                                            color: AppColors.placeholderColor,
                                        }}
                                    />
                                    <LargeText
                                        text={UserData?.firstName ?? ''}
                                        customStyle={{ fontSize: 26 }}
                                    />
                                </>
                            ) : (
                                <LargeText
                                    text={`${selected?.name}’s Health Vitals`}
                                    customStyle={{ fontSize: 26 }}
                                />
                            )}
                        </View>
                        {/* <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate(AppRoutes.Notifications);
              }}
              style={[
                styles.Status,
                {
                  borderColor: selected.alert
                    ? AppColors.error
                    : AppColors.borderColor,
                },
              ]}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={
                    selected.alert ? AppImages.alert : AppImages.alertGreen
                  }
                  resizeMode="contain"
                  style={{width: 20, height: 20}}
                />
                <View>
                  <NormalText
                    text={
                      selected.alert
                        ? `${selected.name}'s alerts`
                        : `${
                            selected.id === 1 ? 'You are' : selected.name
                          } doing well`
                    }
                    customStyle={{
                      fontFamily: AppFonts.GeneralSans.semiBold,
                      marginLeft: 6,
                    }}
                  />
                  <SmallText
                    text={selected.alert ? `2 alerts` : 'No alerts'}
                    customStyle={{
                      color: AppColors.placeholderColor,
                      fontFamily: AppFonts.GeneralSans.medium,
                      marginTop: 2,
                      marginLeft: 6,
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: AppColors.lighGrey,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={AppImages.arrowNext}
                  tintColor={AppColors.black}
                  resizeMode="contain"
                  style={{width: 20, height: 20}}
                />
              </View>
            </TouchableOpacity> */}
                        <View style={[styles.greetings, { marginTop: 10 }]}>
                            <NormalText
                                text={
                                    selected?.id === 1 ? 'My scores' : `${selected?.name}'s scores`
                                }
                                customStyle={{
                                    fontSize: 20,
                                    fontFamily: AppFonts.GeneralSans.semiBold,
                                    paddingBottom: 10,
                                }}
                            />
                        </View>
                    </View>
                </View>
                {onLoad ? (
                    <View style={{ flex: 1, backgroundColor: AppColors.white }}>
                        <ScoreDashboardSkeleton />
                    </View>
                ) : (
                    <FlatList
                        data={UserScores}
                        nestedScrollEnabled
                        contentContainerStyle={{ paddingBottom: 50 }}
                        style={{ backgroundColor: AppColors.white }}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }: any) => (
                            <ScoreData
                                key={item?.name}
                                name={selected?.name}
                                id={item?.id}
                                asof={item?.asof}
                                screen={item?.screen}
                                icon={item?.icon}
                                title={item?.title}
                                score={item?.score}
                                status={item?.status}
                                color={item?.color}
                                data={item?.data}
                                type={item?.type}
                            />
                        )}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default React.memo(Scores);
