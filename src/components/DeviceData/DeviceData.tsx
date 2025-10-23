import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AppColors } from '../../assets/colors/AppColors'
import LargeText from '../AppText/LargeText'
import SmallText from '../AppText/SmallText'
import { AppImages } from '../../assets/images/AppImages'
import { AppFonts } from '../../constants/AppFonts'
import CustomProgressBar from '../CustomProgressBar/CustomProgressBar'
import DeleteDeviceModal from '../Modals/DeleteDeviceModal'
import ConnectDeviceModal from '../Modals/ConnectDeviceModal'

interface Device {
    name: string,
    lastCharge: string,
    charging: number,
    timeRemaining: string,
    onCross: CallableFunction,
    onDeviceConnect: CallableFunction,
    connected: boolean,
}
const DeviceData = ({ name, lastCharge, charging, timeRemaining, connected = false, onCross, onDeviceConnect }: Device) => {
    const [showConnectModal, setShowConnetModal] = React.useState(false);

    return (
        <TouchableOpacity onPress={() => { setShowConnetModal(!showConnectModal) }} activeOpacity={1} style={styles.wrapper}>
            <ConnectDeviceModal visible={showConnectModal} onClose={() => setShowConnetModal(!showConnectModal)} onContinue={() => { onDeviceConnect() }} />
            <View style={{ flexDirection: "row", marginTop: 10, justifyContent: 'space-between', marginHorizontal: 15, }}>
                <LargeText text={name} customStyle={{ letterSpacing: -0.333 }} />
                <TouchableOpacity style={{ width: 30, height: 30, alignItems: "center", justifyContent: "center", }} hitSlop={10} activeOpacity={0.8} onPress={() => { onCross() }}>
                    <Image source={AppImages.crossLarge} tintColor={AppColors.grey} resizeMode='contain' style={styles.icon} />
                </TouchableOpacity>
            </View>
            <SmallText text={connected === true ? 'Currently connected device' : "Device not connected"} customStyle={{ color: AppColors.placeholderColor, marginLeft: 15, marginTop: 6 }} />
            <View style={{ flexDirection: "row" }}>
                {connected === true && <View style={styles.battery}>
                    <SmallText text='Battery' customStyle={{ color: AppColors.white, fontFamily: AppFonts.GeneralSans.semiBold }} />
                    {/* <SmallText text={lastCharge} customStyle={{ color: AppColors.grey, fontSize: 10, marginTop: 2 }} /> */}
                    <View style={{ flexDirection: 'row', marginTop: 12 }}>
                        <CustomProgressBar progress={charging} customStyle={{ marginTop: 8 }} />
                        <View style={styles.batteryDetails}>
                            <View style={styles.seperator} />
                            <View style={styles.details}>
                                <SmallText text={`${charging}% `} customStyle={{ color: AppColors.white, fontFamily: AppFonts.GeneralSans.semiBold }} />
                                <SmallText text={timeRemaining} customStyle={{ color: AppColors.grey, fontSize: 10, marginTop: 2 }} />
                            </View>
                        </View>
                    </View>
                </View>}
                <View style={styles.imgView}>
                    <Image source={AppImages.device} resizeMode='contain' style={styles.img} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default React.memo(DeviceData)

const styles = StyleSheet.create({
    wrapper: {
        width: wp(85),
        height: 220,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: AppColors.borderColor,
        // backgroundColor: "red",
        marginVertical: 15,
    },
    imgView: {
        width: 140,
        height: 140,
        position: 'absolute',
        top: 25,
        right: 0
        // backgroundColor: "red"
    },
    battery: {
        width: wp(40),
        height: 120,
        borderRadius: 12,
        margin: 15,
        padding: 12,
        backgroundColor: AppColors.black,
    },
    img: {
        width: "100%",
        height: "100%"
    },
    seperator: {
        width: wp(22),
        height: 1,
        backgroundColor: AppColors.grey,
    },
    batteryDetails: {
        width: wp(20),
        height: 100,
        borderRadius: 12,
        marginHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end"
    },
    details: {
        flexDirection: 'row',
        width: wp(22),
        alignItems: "center",
        justifyContent: 'space-between',
        paddingTop: 10
    },
    crossIcon: {
        backgroundColor: "pink",
        position: "absolute",
        right: 10,
        top: 10
    },
    icon: {
        width: 20,
        height: 20
    }
})