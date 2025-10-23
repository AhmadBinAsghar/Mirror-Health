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

interface Profile {
    onEditInfo: CallableFunction
    onClose: CallableFunction
    onShare: CallableFunction
    onEditInterest: CallableFunction
    visible: boolean
}
const ProfileModal = ({ onClose, onEditInfo, visible, onShare, onEditInterest }: Profile) => {

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
                <TouchableOpacity style={styles.btn} onPress={() => { onEditInfo && onEditInfo(), onClose() }} activeOpacity={0.8}>
                    <Image source={AppImages.editBlack} resizeMode='contain' style={styles.icon} />
                    <SmallText text={en.Profile.Editinformation} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, marginLeft: 15 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => { onEditInterest && onEditInterest(), onClose() }} activeOpacity={0.8}>
                    <Image source={AppImages.fileLike} resizeMode='contain' style={styles.icon} />
                    <SmallText text={en.Profile.Editinterests} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, marginLeft: 15 }} />
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.btn} onPress={() => { onShare && onShare(), onClose() }} activeOpacity={0.8}>
                    <Image source={AppImages.share} resizeMode='contain' style={styles.icon} />
                    <SmallText text={en.Profile.Shareprofile} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, marginLeft: 15 }} />
                </TouchableOpacity> */}
            </View>
        </Modal>
    )
}

export default ProfileModal

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
        marginVertical: 8,
        paddingVertical: 10,
    },

})