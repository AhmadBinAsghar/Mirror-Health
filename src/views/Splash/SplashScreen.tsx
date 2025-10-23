import { Image, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LargeText from '../../components/AppText/LargeText'
import { AppColors } from '../../assets/colors/AppColors'
import { AppImages } from '../../assets/images/AppImages'

const SplashScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: AppColors.white }}>
            <View style={{ alignItems: "center" }}>
                <Image source={AppImages.appIcon} resizeMode='contain' style={{ width: 140, height: 140 }} />
                <LargeText text='Mirror Health' />
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen