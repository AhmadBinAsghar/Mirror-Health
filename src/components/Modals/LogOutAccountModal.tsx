import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AppImages } from '../../assets/images/AppImages'
import { AppColors } from '../../assets/colors/AppColors'
import LargeText from '../AppText/LargeText'
import NormalText from '../AppText/NormalText'
import SmallText from '../AppText/SmallText'
import AppButton from '../Button/AppButton'
import en from '../../../translation/en.json';

interface Decline {
    onLogOut: CallableFunction
    onClose: CallableFunction
    visible: boolean
}
const LogOutAccountModal = ({ visible, onClose, onLogOut }: Decline) => {
    return (
        <Modal
            isVisible={visible}
            onBackButtonPress={() => onClose && onClose()}
            onBackdropPress={() => onClose && onClose()}
            hasBackdrop={true}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            backdropTransitionInTiming={0}
            backdropTransitionOutTiming={0}
            style={{ zIndex: 999, margin: 0, justifyContent: 'center' }}
        >
            <View style={[styles.container, styles.boxShadow]}>
                <LargeText text={en.Modals.Logout} customStyle={{ fontSize: 20 }} />
                <SmallText text={en.Modals.SureToLogout} customStyle={{ marginTop: 6 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <AppButton text={en.Buttons.cancel} onPress={() => { onClose() }} customStyle={{ width: wp(36), height: 50 }} containerStyle={{ width: wp(36), height: 50 }} />
                    <AppButton text={en.Buttons.Logout} onPress={() => { onClose(), onLogOut && onLogOut() }} colors={[AppColors.lightBlue, AppColors.darkBlue]} txtStyle={{ color: AppColors.white }} customStyle={{ borderWidth: 0, width: wp(36), height: 50 }} containerStyle={{ width: wp(36), height: 50 }} />
                </View>
            </View>
        </Modal>
    )
}
export default LogOutAccountModal

const styles = StyleSheet.create({
    container: {
        width: wp(85),
        backgroundColor: AppColors.white,
        borderRadius: 24,
        padding: 20,
        alignSelf: "center",
    },
    boxShadow: {
        shadowOffset: { width: -2, height: 0 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    topNav: {
        flexDirection: 'row',
        width: wp(94),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    icon: {
        width: 30,
        height: 30
    },
    btnView: {
        width: wp(85),
        alignSelf: "center",
        justifyContent: 'space-between',
        marginVertical: 10
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp(85),
        alignSelf: "center",
        marginVertical: 10
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    }

})