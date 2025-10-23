import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AppButton from '../../../components/Button/AppButton'
import { AppColors } from '../../../assets/colors/AppColors'
import LargeText from '../../../components/AppText/LargeText'
import NormalText from '../../../components/AppText/NormalText'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AppSearchInput from '../../../components/TextInput/AppSearchInput'
import { AppImages } from '../../../assets/images/AppImages'
import SmallText from '../../../components/AppText/SmallText'
import { AppFonts } from '../../../constants/AppFonts'
import en from '../../../../translation/en.json';
import PreconditionsSkeleton from '../../../components/Skeletons/PreconditionsSkeleton'
import ShowAvailableDevices from '../../../components/Modals/ShowAvailableDevices'
import DeleteDeviceModal from '../../../components/Modals/DeleteDeviceModal'
import { useDispatch, useSelector } from 'react-redux'
import BleProvider from '../../../navigations/BleProvider'
import DeviceData from '../../../components/DeviceData/DeviceData'
import MyDevicesSkeleton from '../../../components/Skeletons/MyDevicesSkeleton'
import { resetDevice } from '../../../redux/Slices/BleSlice'
import { ArrayConstants } from '../../../constants/BleProviderConstants/ContantsArray'
import { useToast } from 'react-native-toast-notifications'
import BleManager from 'react-native-ble-manager'

const DeviceConnect = ({ onContinue }: any) => {
    const [disabled, setDisabled] = React.useState<boolean>(true);
    const ConnectedDevice = useSelector((state: any) => state.bleDevice.device);
    const Device = useSelector((state: any) => state.bleDevice.bleData);
    const dispatch = useDispatch();
    const Ble = BleProvider();
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [showDevicesModal, setShowDevicesModal] = React.useState(false);
    const [onLoad, setOnLoad] = React.useState<boolean>(false);


    const totalMinutes = Ble?.battery * 7200; // Battery percentage times 7,200 seconds
    const days = Math.floor(totalMinutes / (24 * 3600)); // Total days
    const hours = Math.floor((totalMinutes % (24 * 3600)) / 3600); // Remaining hours after calculating days

    // When battery is 20% or below, show in hours and minutes
    const Lowhours = Math.floor(totalMinutes / 3600); // Total hours
    const minutes = Math.floor((totalMinutes % 3600) / 60);
    const formattedTime = Ble?.battery > 20 ? `${days}days, ${hours}hr` : `${Lowhours} hr, ${minutes} min`;


    React.useEffect(() => {
        if (ConnectedDevice) {
            Ble.writeOnDevice(ArrayConstants.getBatteryLevel)
            setInterval(() => {
                setOnLoad(false);
            }, 2000);
        }
    }, [ConnectedDevice])
    React.useEffect(() => {
        if (Device?.connected) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [Device?.connected])


    const HandleContinue = () => {
        onContinue && onContinue()
    }



    return (
        <View style={styles.wrapper}>
            <KeyboardAvoidingView
                style={{ flex: 1, }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <DeleteDeviceModal onClose={() => { setShowDeleteModal(!showDeleteModal) }} visible={showDeleteModal} onDelete={() => { dispatch(resetDevice()) }} />
                <ShowAvailableDevices isEnabled={Ble.enabled} Devices={Ble.bleDevices} isVisible={showDevicesModal} setVisible={() => { setShowDevicesModal(!showDevicesModal) }} onConnect={(device: any) => { Ble.connectToDevice(device), setOnLoad(true) }} />
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <LargeText text={en.ProfileBuilder.connectDevice} />
                        <NormalText text={`Please connect your Mirror Ring`} customStyle={{ textAlign: 'center', marginTop: 5 }} />
                    </View>
                    <View style={styles.connectView}>
                        <Image source={AppImages.image3} resizeMode='cover' style={styles.bgImage} />
                        <LargeText text={en.MyDevice.SmartScale} customStyle={{ position: 'absolute', top: 25 }} />
                        <SmallText text={en.MyDevice.TrackWeight} customStyle={{ position: "absolute", top: 60, color: AppColors.placeholderColor }} />
                        <AppButton text={en.MyDevice.scan} onPress={() => { Ble?.enableBle(), setShowDevicesModal(!showDevicesModal) }} containerStyle={{ position: "absolute", width: wp(78), bottom: 4 }} colors={[AppColors.white, AppColors.white]} customStyle={{ width: wp(78) }} />
                    </View>
                    <View style={styles.ORSection}>
                        <View style={styles.Seperater} />
                        <SmallText text='or' customStyle={{ marginHorizontal: 20, textAlign: 'center' }} />
                        <View style={styles.Seperater} />
                    </View>
                    <View style={styles.deviceView}>
                        <LargeText text={en.MyDevice.AddedDevices} customStyle={{ fontSize: 18 }} />
                        {onLoad ? (
                            <MyDevicesSkeleton />
                        ) : ConnectedDevice ? (
                            <>
                                {/* {Ble?.bleDevices?.map(device => ( */}
                                <DeviceData key={ConnectedDevice?.id}
                                    connected={Device?.connected}
                                    onDeviceConnect={() => { Ble.connectToDevice(ConnectedDevice) }}
                                    name={ConnectedDevice?.name ?? ""} lastCharge={ConnectedDevice?.lastCharge ?? 'Last charge 2h ago'}
                                    charging={Ble?.battery ?? 0} timeRemaining={formattedTime} onCross={() => { setShowDeleteModal(!showDeleteModal) }} />
                                {/* ))} */}
                            </>
                        ) : <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 100 }}>
                            <NormalText text='No Device' />
                        </View>}
                    </View>
                </ScrollView>
                <View style={styles.btnView}>
                    <AppButton text='Next' onPress={() => HandleContinue()} disabled={disabled} colors={disabled ? [AppColors.disabled, AppColors.disabled] : [AppColors.lightBlue, AppColors.darkBlue]} customStyle={{ borderWidth: 0 }} txtStyle={{ color: AppColors.white }} />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default DeviceConnect

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
    header: {
        width: wp(85),
        height: hp(15),
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center'
    },
    connectView: {
        width: wp(85),
        height: hp(25),
        alignSelf: 'center',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    bgImage: {
        width: wp(85),
        height: hp(25),
        alignSelf: 'center',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    Seperater: {
        height: 1,
        width: wp(35),
        marginVertical: 15,
        backgroundColor: AppColors.borderColor
    },
    ORSection: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    deviceView: {
        width: wp(85),
        alignSelf: 'center',
        marginVertical: 10
    },
    btnView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
})