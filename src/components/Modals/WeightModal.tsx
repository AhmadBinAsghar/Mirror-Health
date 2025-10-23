import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { AppColors } from '../../assets/colors/AppColors'
import LargeText from '../AppText/LargeText'
import { AppImages } from '../../assets/images/AppImages'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import NormalText from '../AppText/NormalText'
import { AppFonts } from '../../constants/AppFonts'

interface Weight {
    onSelect: CallableFunction,
    onClose: CallableFunction,
    visible: boolean
}
const WeightModal = ({ onClose, onSelect, visible }: Weight) => {
    const [selected, setSelected] = React.useState<string>('kg');

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
                <View style={styles.topNav}>
                    {/* <TouchableOpacity activeOpacity={0.8} onPress={() => onClose && onClose()}>
                        <Image source={AppImages.backBlack} resizeMode='contain' style={styles.icon} />
                    </TouchableOpacity> */}
                    <TouchableOpacity activeOpacity={0.8} onPress={() => onClose && onClose()}>
                        <Image source={AppImages.cross} resizeMode='contain' style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <LargeText text='Weight' customStyle={{ paddingLeft: 20 }} />
                <View style={styles.btnView}>
                    <TouchableOpacity activeOpacity={1} onPress={() => { setSelected('lb'), onSelect('lb') }} style={styles.btn}>
                        <View style={styles.title}>
                            <NormalText text='Lb' customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                            <NormalText text='(pounds)' customStyle={{ color: AppColors.placeholderColor, marginLeft: 6, fontSize: 14, fontFamily: AppFonts.GeneralSans.medium }} />
                        </View>
                        <Image source={selected === 'lb' ? AppImages.activeDot : AppImages.checkFalse} resizeMode='contain' style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => { setSelected('kg'), onSelect('kg') }} style={styles.btn}>
                        <View style={styles.title}>
                            <NormalText text='Kg' customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                            <NormalText text='(kilos)' customStyle={{ color: AppColors.placeholderColor, marginLeft: 6, fontSize: 14, fontFamily: AppFonts.GeneralSans.medium }} />
                        </View>
                        <Image source={selected === 'kg' ? AppImages.activeDot : AppImages.checkFalse} resizeMode='contain' style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default WeightModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: Platform.OS == 'ios' ? 40 : 20
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
        justifyContent: "flex-end",
        marginBottom: 10
    },
    icon: {
        width: 22,
        height: 22
    },
    btnView: {
        width: wp(85),
        alignSelf: "center",
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp(85),
        alignSelf: "center",
        paddingVertical: 10,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    }

})