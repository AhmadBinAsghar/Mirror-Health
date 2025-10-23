import { Image, ScrollView, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppHeader from '../../../../components/Header/AppHeader'
import en from '../../../../../translation/en.json';
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppFonts } from '../../../../constants/AppFonts'
import { AppImages } from '../../../../assets/images/AppImages'
import LargeText from '../../../../components/AppText/LargeText'
import SmallText from '../../../../components/AppText/SmallText'
import { AppColors } from '../../../../assets/colors/AppColors'
import AppButton from '../../../../components/Button/AppButton'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import DeviceData from '../../../../components/DeviceData/DeviceData'
import DeleteDeviceModal from '../../../../components/Modals/DeleteDeviceModal'
import MyDevicesSkeleton from '../../../../components/Skeletons/MyDevicesSkeleton'
import { useDispatch, useSelector } from 'react-redux'
import BleProvider from '../../../../navigations/BleProvider'
import NormalText from '../../../../components/AppText/NormalText'
import ShowAvailableDevices from '../../../../components/Modals/ShowAvailableDevices'
import { ArrayConstants } from '../../../../constants/BleProviderConstants/ContantsArray'
import { resetDevice } from '../../../../redux/Slices/BleSlice'
import { API_REQUEST } from '../../../../network/NetworkRequest'
import { endPoints } from '../../../../network/endPoints'

const MyDevice = () => {
    const route = useRoute();
    const { cali }: any = route?.params ?? '';
    const ConnectedDevice = useSelector((state: any) => state.bleDevice.device);
    const Device = useSelector((state: any) => state.bleDevice.bleData);
    const dispatch = useDispatch();
    const Ble = BleProvider();
    const navigation: any = useNavigation();
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [showDevicesModal, setShowDevicesModal] = React.useState(false);
    const [onLoad, setOnLoad] = React.useState<boolean>(false);

    const AddDevice = async (device: any) => {
        Ble.connectToDevice(device), setOnLoad(true)
        const raw = {
            deviceAddress: device?.id,
            deviceName: device?.name
        }
        try {
            API_REQUEST("POST", endPoints.AddDevice, raw,
                ((sucess: any) => {
                    // Helper.showToast(sucess?.message);
                }),
                ((error: any) => {
                    console.log(error)
                    // Helper.showToast(error);
                })
            )
        } catch (err) {
            // Helper.showToast(err);
            console.log(err)
        }
    }
    const deleteDevice = async () => {
        dispatch(resetDevice())
        const raw = {
            deviceAddress: ConnectedDevice?.id,
        }
        try {
            API_REQUEST("POST", endPoints.deleteDevice, raw,
                ((sucess: any) => {
                    console.log(sucess);
                    // Helper.showToast(sucess?.message)
                }),
                ((error: any) => {
                    console.log(error)
                    // Helper.showToast(error)
                })
            )
        } catch (err) {
            console.log(err);
            // Helper.showToast(err);
        }
    }

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

    return (
        <SafeAreaView style={styles.wrapper}>
            <DeleteDeviceModal onClose={() => { setShowDeleteModal(!showDeleteModal) }} visible={showDeleteModal} onDelete={() => { deleteDevice() }} />
            <ShowAvailableDevices isEnabled={Ble.enabled} Devices={Ble.bleDevices} isVisible={showDevicesModal} setVisible={() => { setShowDevicesModal(!showDevicesModal) }} onConnect={(device: any) => { AddDevice(device) }} />
            <AppHeader title={cali === true ? "Devices" : en.Headings.MyDevice} onBackPress={() => { navigation.goBack() }} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
            <ScrollView
                showsVerticalScrollIndicator={false}>
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
                            <DeviceData key={ConnectedDevice?.id}
                                connected={Device?.connected}
                                onDeviceConnect={() => { Ble.connectToDevice(ConnectedDevice), navigation.goBack() }}
                                name={ConnectedDevice?.name ?? ""} lastCharge={ConnectedDevice?.lastCharge ?? 'Last charge 2h ago'}
                                charging={Ble?.battery ?? 0} timeRemaining={formattedTime} onCross={() => { setShowDeleteModal(!showDeleteModal) }} />
                        </>
                    ) : <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 100 }}>
                        <NormalText text='No Device' />
                    </View>}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(MyDevice)