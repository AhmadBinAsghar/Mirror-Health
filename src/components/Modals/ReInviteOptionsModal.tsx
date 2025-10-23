import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { AppColors } from '../../assets/colors/AppColors'
import LargeText from '../AppText/LargeText'
import { AppImages } from '../../assets/images/AppImages'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import NormalText from '../AppText/NormalText'
import SmallText from '../AppText/SmallText'
import en from '../../../translation/en.json';
import { AppFonts } from '../../constants/AppFonts'

interface ReInvite {
    onResend: CallableFunction
    onClose: CallableFunction
    onCancel: CallableFunction
    visible: boolean
}
const ReInviteOptionsModal = ({ onClose, visible, onResend, onCancel }: ReInvite) => {

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
            style={{ zIndex: 999, margin: 0, justifyContent: 'flex-end' }}
        >
            <View style={[styles.container, styles.boxShadow]}>
                {/* <TouchableOpacity style={styles.btn} onPress={() => { onResend && onResend(), onClose() }} activeOpacity={0.8}>
                    <Image source={AppImages.resend} resizeMode='contain' style={styles.icon} />
                    <SmallText text={en.Profile.Resend} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, marginLeft: 15 }} />
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.btn} onPress={() => { onCancel && onCancel(), onClose() }} activeOpacity={0.8}>
                    <Image source={AppImages.crossLarge} tintColor={AppColors.red} resizeMode='contain' style={styles.icon} />
                    <SmallText text={en.Profile.CancelInvitation} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, marginLeft: 15, color: AppColors.red }} />
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default ReInviteOptionsModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingVertical: 30,
        paddingHorizontal: 20,
        paddingBottom: Platform.OS == 'ios' ? 40 : 20
    },
    boxShadow: {
        shadowOffset: { width: -2, height: 0 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    icon: {
        width: 18,
        height: 18
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start",
        width: wp(85),
        alignSelf: "center",
        marginVertical: 15
    },

})