import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, Platform, ActivityIndicator, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { AppColors } from '../../assets/colors/AppColors';
import { AppFonts } from '../../constants/AppFonts';
import Modal from 'react-native-modal'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NormalText from '../AppText/NormalText';
import SmallText from '../AppText/SmallText';
import AppButton from '../Button/AppButton';
import LottieView from 'lottie-react-native';

interface ModalProps {
    isVisible: boolean
    setVisible: CallableFunction
    onConnect: CallableFunction
    Devices: any[]
    isEnabled: boolean
};
const ShowAvailableDevices = ({ isEnabled, Devices, isVisible, setVisible, onConnect }: ModalProps) => {
    const deviceNames = "The Mirror Ring";

    return (
        <Modal
            isVisible={isVisible}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            propagateSwipe={true}
            swipeDirection="down"
            onSwipeComplete={() => setVisible && setVisible()}
            onBackdropPress={() => setVisible && setVisible()}
            onBackButtonPress={() => setVisible && setVisible()}
            animationInTiming={500}
            animationOutTiming={500}
            style={styles.container}>

            <View style={styles.box}>
                <View style={{ backgroundColor: AppColors.grey, width: 100, height: 4, borderRadius: 100, alignSelf: "center", marginBottom: 5 }} />
                {/* <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 6 }}> */}
                {!isEnabled ?
                    <View style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: 'center',
                    }}>
                        <NormalText text='Please enable bluetooth!' />
                    </View>
                    : Devices?.length > 0 ? (
                        <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 6, paddingBottom: 14 }}>
                            {Devices.map((item: any, index: number) => {
                                return (
                                    <TouchableWithoutFeedback onPress={() => { }} key={index}>
                                        <View style={{
                                            width: wp(90),
                                            height: 60,
                                            padding: 10,
                                            backgroundColor: AppColors.lighGrey,
                                            borderRadius: 12,
                                            alignSelf: "center",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            marginBottom: 6
                                        }}>
                                            <View >
                                                <NormalText text={item?.name ?? "Unknown Device"} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                                                <SmallText text={item?.id} customStyle={{ color: AppColors.grey, marginTop: 4 }} />
                                            </View>
                                            <AppButton disabled={item?.name?.toLowerCase()?.includes(deviceNames?.toLowerCase()) ? false : true} text='Connect' onPress={() => { onConnect(item), setVisible() }} colors={item?.name?.toLowerCase()?.includes(deviceNames?.toLowerCase()) ? [AppColors.lightBlue, AppColors.darkBlue] : [AppColors.grey, AppColors.grey]} containerStyle={{ width: wp(18), height: 30, borderRadius: 8 }} customStyle={{ width: wp(18), height: 30, borderRadius: 8, borderWidth: 0 }} txtStyle={{ fontFamily: AppFonts.GeneralSans.medium, fontSize: 12, color: AppColors.white }} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })}
                            {/* <FlatList
                            scrollEnabled={true}
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            data={Devices}
                            renderItem={renderItemForDevice}
                            keyExtractor={(item, index) => index.toString()}
                        /> */}
                        </ScrollView>
                    ) : (<View style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <View style={{ alignItems: "center", justifyContent: "center" }} >
                            <LottieView source={require('../../assets/lottieFile/scaner.json')} speed={1} autoPlay loop style={{ width: wp(80), height: hp(40) }} />
                        </View>
                        <SmallText text='Searching nearby devices...' customStyle={{ marginVertical: 10, fontSize: 16, fontFamily: AppFonts.GeneralSans.medium }} />
                        <SmallText text="Please make sure your device is sufficiently charged and hold it close to your smartphone. Don't close the app." customStyle={{ marginVertical: 6, fontSize: 12, color: AppColors.placeholderColor, textAlign: "center", width: wp(85) }} />
                    </View>)}
                {/* </ScrollView> */}
            </View>
        </Modal>
    )
}

export default React.memo(ShowAvailableDevices)

const styles = StyleSheet.create({
    container: {
        width: wp(100),
        justifyContent: 'flex-end',
        alignSelf: 'center',
    },
    box: {
        width: wp(100),
        height: 450,
        paddingVertical: "2%",
        // paddingHorizontal: 20,
        backgroundColor: AppColors.white,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginBottom: -20,
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    },
})
