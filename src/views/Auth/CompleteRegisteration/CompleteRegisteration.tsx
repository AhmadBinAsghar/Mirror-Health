import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from './styles'
import AppHeader from '../../../components/Header/AppHeader'
import { useNavigation } from '@react-navigation/native'
import { AppImages } from '../../../assets/images/AppImages'
import LargeText from '../../../components/AppText/LargeText'
import NormalText from '../../../components/AppText/NormalText'
import AppButton from '../../../components/Button/AppButton'
import { AppColors } from '../../../assets/colors/AppColors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppRoutes } from '../../../constants/AppRoutes'
import en from '../../../../translation/en.json';
import Helper from '../../../utilis/Helper'

const CompleteRegisteration = () => {
    const navigation: any = useNavigation();
    return (
        <SafeAreaView
            style={styles.wrapper}>
            <AppHeader title={en.Headings.CompleteRegister} onBackPress={() => { navigation.goBack() }} />
            <KeyboardAwareScrollView
                keyboardDismissMode='interactive'
                keyboardShouldPersistTaps='handled'
            >
                <View style={styles.imageView}>
                    <Image source={AppImages.rings} resizeMode='contain' style={styles.img} />
                </View>
                <View style={styles.header}>
                    <LargeText text={en.SignUp.Congratulations} customStyle={{ fontSize: 26 }} />
                    <NormalText text={en.SignUp.successFull} customStyle={{ textAlign: 'center', marginTop: 5 }} />
                </View>
            </KeyboardAwareScrollView>
            <View style={styles.btnView}>
                <AppButton
                    text={en.Buttons.Connect}
                    onPress={() => { Helper.resetAndGo(navigation, AppRoutes.Onboarding) }}
                    txtStyle={{ color: AppColors.white }}
                    colors={[AppColors.lightBlue, AppColors.darkBlue]} />
            </View>
        </SafeAreaView>
    )
}

export default CompleteRegisteration