import { Image, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppButton from '../../../components/Button/AppButton'
import { AppColors } from '../../../assets/colors/AppColors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LargeText from '../../../components/AppText/LargeText'
import NormalText from '../../../components/AppText/NormalText'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AppImages } from '../../../assets/images/AppImages'
import SmallText from '../../../components/AppText/SmallText'
import { AppFonts } from '../../../constants/AppFonts'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Circle } from 'react-native-svg'
import en from '../../../../translation/en.json';
import { API_REQUEST } from '../../../network/NetworkRequest'
import { endPoints } from '../../../network/endPoints'
import BleProvider from '../../../navigations/BleProvider'
import { useSelector } from 'react-redux'
import { BleSDK } from '../../../services/ble/Util/BleSDK'
import MyDeviceTime from '../../../services/ble/model/MyDeviceTime'
import moment from 'moment'
import { AutoTestMode } from '../../../services/ble/model/AutoTestMode'
import { useNavigation } from '@react-navigation/native'
import MyAutomaticHRMonitoring from '../../../services/ble/model/MyAutomaticHRMonitoring'
import { AutoMode } from '../../../services/ble/model/AutoMode'
import { MonitoringContForCalibration } from '../../../constants/BleProviderConstants/DeviceMoniteringContants'
import { AppRoutes } from '../../../constants/AppRoutes'


const PutRing = ({ onContinue }: any) => {
    const navigation: any = useNavigation();
    const UserDetails = useSelector((state: any) => state.userData.userDetails);
    const [disabled, setDisabled] = React.useState<boolean>(true);
    const [error, setError] = React.useState<boolean>(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const [warn, setWarn] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<boolean>(false);
    const [timer, setTimer] = React.useState<number>(48 * 60);
    const [progress, setProgress] = React.useState<number>(0);
    const Device = useSelector((state: any) => state.bleDevice.bleData);
    const ConnectedDevice = useSelector((state: any) => state.bleDevice.device);
    const [DataSendOnce, SetDataSendOnce] = React.useState<boolean>(false);
    const Ble = BleProvider();
    const [caliResponse, setCaliResponse] = React.useState<any>()
    const [timeCompleted, setTimeCompleted] = useState<number>(0);

    const getCalibrationTime = () => {
        try {
            API_REQUEST("GET", endPoints.calibrationTime, null,
                ((sucess: any) => {
                    setCaliResponse(sucess?.data)
                    setTimeCompleted(sucess?.data?.timeCompleted);
                    if (sucess?.data?.timeCompleted) {
                        const timeCompleted = sucess?.data?.timeCompleted || 0; // Ensure timeCompleted has a default value of 0
                        const maxTime = 2880;

                        // Calculate remaining time
                        setTimer(maxTime - timeCompleted);

                        // Calculate progress percentage and cap it at 100%
                        const progressPercentage = Math.min((100 / maxTime) * timeCompleted, 100);
                        setProgress(progressPercentage);
                    }
                }),
                ((error: any) => {
                    console.log("Error in fetching calibration time:: ", error)
                })
            );
        } catch (error) {
            console.log("Error in fetching calibration time:: ", error)
        }
    }
    const sendHealthData = async (isInitial: boolean) => {
        // SetDataSendOnce(false)
        const method = 'POST';
        try {
            const data = {
                temp: Ble?.tempArray,
                spo2: Ble?.oxygenArray,
                cardic: Ble?.HRVArrayData,
                deviceId: ConnectedDevice?.id,
                sleep: Ble?.sleepArray,
                calibration: true
            };
            if (Ble.HRVArrayData?.length > 1 || Ble.oxygenArray?.length > 1 || Ble.tempArray?.length > 1 || Ble.sleepArray?.length > 1) {
                API_REQUEST(method, endPoints.storeHealth, data,
                    (async (success: any) => {
                        SetDataSendOnce(false)
                        setCaliResponse(success?.data)
                        setTimeCompleted(success?.data?.timeCompleted);
                        if (success?.data?.timeCompleted) {
                            const timeCompleted = success?.data?.timeCompleted || 0; // Ensure timeCompleted has a default value of 0
                            const maxTime = 2880;

                            // Calculate remaining time
                            setTimer(maxTime - timeCompleted);

                            // Calculate progress percentage and cap it at 100%
                            const progressPercentage = Math.min((100 / maxTime) * timeCompleted, 100);
                            setProgress(progressPercentage);

                            if (!isInitial) {
                                Ble.writeOnDevice([...BleSDK.OxygenData(0x99)]);
                                Ble.writeOnDevice([...BleSDK.getHRVDataWithMode(0x99, moment().format('yyyy.MM.dd HH:mm:ss'))])
                                Ble.writeOnDevice([...BleSDK.getTemperatureHistoryData(0x99, moment().format('yyyy.MM.dd HH:mm:ss'))])
                                Ble.writeOnDevice([...BleSDK.GetDetailSleepDataWithMode(0x99, moment().format('yyyy.MM.dd HH:mm:ss'))])
                            }
                        }
                    }),
                    ((error: any) => {
                        SetDataSendOnce(false);
                        console.log("ERROR ON SENDING HEALTH DATA========================>\n", error);
                        // Helper.showToast(error)
                    }));
            } else {
                SetDataSendOnce(false);
                console.log("No data to send")
            }
        } catch (error) {
            SetDataSendOnce(false);
            console.log("ERROR ON FUNCTION SENDING HEALTH DATA========================>\n", error);
        }
    }

    const getData = () => {
        SetDataSendOnce(false);
        Ble.writeOnDevice([...BleSDK.setDeviceTime(new MyDeviceTime())]);
        Ble.writeOnDevice([...BleSDK.OxygenData(0)]);
        Ble.writeOnDevice([...BleSDK.GetDetailSleepDataWithMode(0, moment().format('yyyy.MM.dd HH:mm:ss'))])
        Ble.writeOnDevice([...BleSDK.setAutomaticHRMonitoring(new MyAutomaticHRMonitoring(2, 0, 0, 23, 59, 7, MonitoringContForCalibration.heartRate), AutoMode.AutoHeartRate)]);
        Ble.writeOnDevice([...BleSDK.setAutomaticHRMonitoring(new MyAutomaticHRMonitoring(2, 0, 0, 23, 59, 7, MonitoringContForCalibration.spo2), AutoMode.AutoSpo2)]);
        Ble.writeOnDevice([...BleSDK.setAutomaticHRMonitoring(new MyAutomaticHRMonitoring(2, 0, 0, 23, 59, 7, MonitoringContForCalibration.temperature), AutoMode.AutoTemp)]);
        Ble.writeOnDevice([...BleSDK.setAutomaticHRMonitoring(new MyAutomaticHRMonitoring(2, 0, 0, 23, 59, 7, MonitoringContForCalibration.hrv), AutoMode.AutoHrv)]);
        Ble.writeOnDevice([...BleSDK.getHRVDataWithMode(0, moment().format('yyyy.MM.dd HH:mm:ss'))])
        Ble.writeOnDevice([...BleSDK.getTemperatureHistoryData(0, moment().format('yyyy.MM.dd HH:mm:ss'))])
    }

    // UnCommect it For geting Calibration progress on render. 
    React.useEffect(() => {
        getCalibrationTime()
    }, [])

    React.useEffect(() => {
        if (Device?.connected === false) {
            setWarn(true);
            setMessage(true);
            // setError(true);
            setSuccess(false)
            setDisabled(false);
        } else {
            setWarn(false);
            setMessage(false);
            setError(false);
            setDisabled(true);
        }
    }, [Device?.connected])
    React.useEffect(() => {
        // sendHealthData(true);r
        if (UserDetails?.notify && timer > 0 && error === false && warn === false && success === false) {

            getData();
        }
    }, [UserDetails?.notify])
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (timer > 0 && error === false && warn === false && success === false) {
                getData();
            }
        })
        return unsubscribe
    }, [])
    React.useEffect(() => {
        console.log("DATA SEND ONCE ::", DataSendOnce === false && Ble?.HRVArrayData?.length > 0 || Ble?.oxygenArray?.length > 0 || Ble?.tempArray?.length > 0 || Ble?.sleepArray?.length > 0)
        // console.log("SleepData==========================", Ble?.sleepArray)
        if (DataSendOnce === false && (Ble?.HRVArrayData?.length > 0 || Ble?.oxygenArray?.length > 0 || Ble?.tempArray?.length > 0 || Ble?.sleepArray?.length > 0)) {
            SetDataSendOnce(true);
            sendHealthData(false);
        }
    }, [Ble?.HRVArrayData])

    React.useEffect(() => {
        const time = setInterval(() => {
            console.log('timer ticked', timer);
            if (timer > 0 && error === false && warn === false && success === false) {
                getData();
            }
            if (timer <= 0 && error === false && warn === false) {
                clearInterval(time);
                setDisabled(false);
                setMessage(true);
                setSuccess(true);
            }
        }, 600000);
        // return () => clearInterval(time); // Cleanup on unmount
    }, []);

    const hours = Math.floor(timer / 60); // Calculate total hours
    const minutes = Math.floor(timer % 60); // Calculate remaining minutes
    const formattedTime = `${timeCompleted > 2880 ? 0 : hours ?? 0}h ${timeCompleted > 2880 ? 0 : minutes ?? 0}min`.padStart(5, '0');

    useEffect(() => {
        if (timeCompleted >= 2880) {
            setTimer(0);
            setProgress(100);
            setDisabled(false);
            setSuccess(true);
            setMessage(true);
            onContinue && onContinue();
        }

    }, [timeCompleted])
    const HandleContinue = () => {
        onContinue && onContinue()
    }

    const handleSkip = () => {
        try {
            API_REQUEST("GET", endPoints.skipCali, null,
                ((success: any) => {
                    onContinue && onContinue()
                }),
                ((error: any) => {
                    console.log(error)
                })
            )
        } catch (err) {
            console.log(err)
        }
    }

    return (
        // <TouchableNativeFeedback onPress={() => { getData(); sendHealthData(false) }} style={{
        //     backgroundColor: 'red',
        //     flex: 1,
        //     alignItems: 'center',
        //     justifyContent: 'center'
        // }}>
        <View style={styles.wrapper}>

            <KeyboardAwareScrollView
                keyboardDismissMode='interactive'
                keyboardShouldPersistTaps='handled'>
                <View style={styles.header}>
                    <LargeText text={en.ProfileBuilder.putonDevice} />
                    <NormalText text={en.ProfileBuilder.wearFor48hours} customStyle={{ textAlign: 'center', marginTop: 5 }} />
                    <NormalText text="The ring may disconnect several times during calibration." customStyle={{ textAlign: 'center', marginTop: 5 }} />
                </View>
                <View style={[styles.timerView, { backgroundColor: success ? AppColors.success : AppColors.error }]}>
                    <View style={styles.timer}>
                        <View style={styles.timerDetail}>
                            <LargeText text={`${formattedTime}`} customStyle={{ fontSize: 28, fontFamily: AppFonts.GeneralSans.medium, letterSpacing: -1 }} />
                            <SmallText text={en.ProfileBuilder.hoursRemaining} customStyle={{ fontSize: 12, color: AppColors.placeholderColor }} />
                        </View>
                        <View style={styles.seperater} />
                        <View style={styles.times}>
                            <ScrollView
                                overScrollMode='never'
                                contentContainerStyle={{ flexGrow: 1, paddingBottom: 6 }}>
                                {caliResponse && caliResponse?.available?.map((item: any, index: any) => (
                                    <SmallText key={index} text={moment(item.from, "yyyy-MM-DDTHH:mm:ss:sss").format('hh:mm A') + " - " + moment(item?.to, "yyyy-MM-DDTHH:mm:ss:sss").format('hh:mm A')} customStyle={{ fontSize: 12, fontFamily: AppFonts.GeneralSans.medium, marginVertical: 2 }} />
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                    {message && <View style={[styles.message]}>
                        <Image source={error ? AppImages.sad : warn ? AppImages.warn : AppImages.happy} resizeMode='contain' style={styles.icon} />
                        <SmallText text={error ? `${en.Validations.deviceError}` : warn ? `${en.Validations.deviceWarn}` : `${en.Validations.deviceSucess}`}
                            customStyle={{ fontSize: 12, color: success ? AppColors.green : AppColors.red }} />
                    </View>}
                </View>
                <View style={styles.progressView}>
                    <AnimatedCircularProgress
                        size={210}
                        width={12}
                        fill={progress ?? 0}
                        rotation={0}
                        padding={10}
                        lineCap='round'
                        renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill={AppColors.progress} />}
                        tintColor={AppColors.progress}
                        backgroundColor={AppColors.lighGrey} />
                    <View style={styles.progresDetails}>
                        <SmallText text={warn || error ? 'Disconnected' : 'Completed'} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, color: AppColors.placeholderColor }} />
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <LargeText text={progress ? `${progress.toFixed()}` : '0'} customStyle={{ fontFamily: AppFonts.GeneralSans.bold, fontSize: 38, letterSpacing: -2 }} />
                            <SmallText text='%' customStyle={{ fontSize: 18, fontFamily: AppFonts.GeneralSans.semiBold, color: AppColors.placeholderColor, marginLeft: 3 }} />
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>

            <View style={styles.btnView}>
                <AppButton text={error || warn ? en.Buttons.Connect : en.Buttons.next} onPress={() => { error || warn ? navigation.navigate(AppRoutes.MyDevice, { cali: true }) : HandleContinue() }} disabled={disabled} colors={disabled ? [AppColors.disabled, AppColors.disabled] : [AppColors.lightBlue, AppColors.darkBlue]} customStyle={{ borderWidth: 0 }} txtStyle={{ color: AppColors.white }} />
                {/* <TouchableOpacity activeOpacity={0.8} hitSlop={10} style={{ marginVertical: 12 }} onPress={() => { handleSkip() }}>
                    <NormalText text='Skip' />
                </TouchableOpacity> */}
            </View>
        </View >
        // </TouchableNativeFeedback>
    )
}

export default PutRing

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    btnView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    header: {
        width: wp(85),
        height: hp(15),
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center'
    },
    timerView: {
        width: wp(85),
        alignSelf: "center",
        marginVertical: 10,
        borderRadius: 16
    },
    timer: {
        width: wp(85),
        backgroundColor: AppColors.white,
        borderWidth: 1,
        borderColor: AppColors.borderColor,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 16
    },
    message: {
        width: wp(85),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        paddingVertical: 10,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 4,
    },
    timerDetail: {
        // width: wp(40),
        paddingVertical: 15,
        alignItems: 'flex-start',
        justifyContent: "center",
    },
    seperater: {
        width: 1,
        height: hp(8),
        borderWidth: 1,
        borderColor: AppColors.borderColor,
        borderStyle: 'dashed',
        alignSelf: 'center',
    },
    times: {
        marginVertical: 20,
        height: 60,
    },
    progressView: {
        width: wp(85),
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center'
    },
    progresDetails: {
        width: 160,
        height: 160,
        backgroundColor: AppColors.lighGrey,
        borderRadius: 120,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: AppColors.white,
        borderWidth: 1,
        borderColor: AppColors.borderColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
})