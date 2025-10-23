import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LargeText from '../AppText/LargeText'
import SmallText from '../AppText/SmallText'
import { AppImages } from '../../assets/images/AppImages'
import en from '../../../translation/en.json';
import { AppColors } from '../../assets/colors/AppColors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const NoNotiContent = () => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.iconView}>
                <Image source={AppImages.bellSlash} resizeMode='contain' style={styles.icon} />
            </View>
            <LargeText text={en.Notifications.NoNotifications} customStyle={{ textAlign: "center", fontSize: 20 }} />
            <SmallText text={en.Notifications.ComeBackHere} customStyle={{ textAlign: "center", marginVertical: 10, color: AppColors.placeholderColor }} />
        </View>
    )
}

export default NoNotiContent

const styles = StyleSheet.create({
    wrapper: {
        width: wp(80),
        height: hp(80),
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconView: {
        width: 55,
        height: 55,
        borderRadius: 40,
        backgroundColor: AppColors.disabled,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15
    },
    icon: {
        width: 30,
        height: 30
    }
})