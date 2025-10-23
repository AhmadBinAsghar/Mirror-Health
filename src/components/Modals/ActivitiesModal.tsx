import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { AppColors } from '../../assets/colors/AppColors'
import LargeText from '../AppText/LargeText'
import { AppImages } from '../../assets/images/AppImages'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import NormalText from '../AppText/NormalText'
import { AppFonts } from '../../constants/AppFonts'

interface Activity {
    onSelect: CallableFunction,
    onClose: CallableFunction,
    visible: boolean
}
const ActOptions = [
    {
        id: 13,
        label: "Run"
    },
    {
        id: 1,
        label: "Cycling"
    },
    {
        id: 2,
        label: "Badminton"
    },
    {
        id: 3,
        label: "Football"
    },
    {
        id: 4,
        label: "Tennis"
    },
    {
        id: 5,
        label: "Yoga"
    },
    {
        id: 6,
        label: "Meditation"
    },
    {
        id: 7,
        label: "Dance"
    },
    {
        id: 8,
        label: "BasketBall"
    },
    {
        id: 9,
        label: "Walk"
    },
    {
        id: 10,
        label: "Workout"
    },
    {
        id: 11,
        label: "Cricket"
    },
    {
        id: 12,
        label: "Hiking"
    },
    {
        id: 13,
        label: "Aerobics"
    },
    {
        id: 14,
        label: "Ping-Pong"
    },
    {
        id: 15,
        label: "Rope Jump"
    },
    {
        id: 16,
        label: "Sit-ups"
    },
]
const ActivitiesModal = ({ onClose, onSelect, visible }: Activity) => {
    const [selected, setSelected] = React.useState<string>("");

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
                    <TouchableOpacity activeOpacity={0.8} onPress={() => onClose && onClose()}>
                        <Image source={AppImages.backBlack} resizeMode='contain' style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => onClose && onClose()}>
                        <Image source={AppImages.cross} resizeMode='contain' style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <LargeText text='Activities' customStyle={{ paddingLeft: 20, paddingBottom: 10 }} />
                <ScrollView contentContainerStyle={styles.btnView}>
                    {ActOptions.map((act) => (
                        <TouchableOpacity activeOpacity={1} onPress={() => { setSelected(act.label), onSelect(act.label, act.id) }} style={styles.btn}>
                            <View style={styles.title}>
                                <NormalText text={act.label} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                            </View>
                            <Image source={selected === act.label ? AppImages.activeDot : AppImages.checkFalse} resizeMode='contain' style={styles.icon} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </Modal>
    )
}

export default ActivitiesModal

const styles = StyleSheet.create({
    container: {
        height: 400,
        backgroundColor: AppColors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: Platform.OS == 'ios' ? 40 : 10
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
        width: 25,
        height: 25,
    },
    btnView: {
        width: wp(85),
        alignSelf: "center",
        justifyContent: 'space-between',
        // marginVertical: 5
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