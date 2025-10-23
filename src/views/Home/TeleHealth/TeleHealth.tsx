import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppColors } from '../../../assets/colors/AppColors'
import { AppImages } from '../../../assets/images/AppImages'
import LargeText from '../../../components/AppText/LargeText'
import en from '../../../../translation/en.json';
import NormalText from '../../../components/AppText/NormalText'

const TeleHealth = () => {
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.iconView}>
                <Image source={AppImages.hospital} resizeMode='contain' style={styles.icon} />
            </View>
            <LargeText text={en.TeleHealth.ComingSoon} customStyle={{ textAlign: "center", fontSize: 20 }} />
            <NormalText text={en.TeleHealth.description} customStyle={{ textAlign: "center", marginVertical: 10, color: AppColors.placeholderColor, lineHeight: 23 }} />
        </SafeAreaView>
    )
}

export default TeleHealth

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
        alignItems: 'center',
        justifyContent: "center"
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