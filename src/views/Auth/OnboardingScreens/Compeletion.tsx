import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import LargeText from '../../../components/AppText/LargeText'
import NormalText from '../../../components/AppText/NormalText'
import AppButton from '../../../components/Button/AppButton'
import { AppColors } from '../../../assets/colors/AppColors'
import { AppImages } from '../../../assets/images/AppImages'
import en from '../../../../translation/en.json';

const Compeletion = ({ onContinue }: any) => {
    const HandleContinue = () => {
        onContinue && onContinue()
    }
    return (
        <View style={styles.wrapper}>
            <ImageBackground
                source={AppImages.onboarding}
                resizeMode='cover'
                style={styles.imgView}>
                <View style={styles.header}>
                    <LargeText text={en.ProfileBuilder.complete} />
                    <NormalText text={`Congratulations! Your profile is now complete`} customStyle={{ textAlign: "center", marginTop: 5 }} />
                </View>
            </ImageBackground>
            <View style={styles.btnView}>
                <AppButton text={en.Buttons.goToHome} onPress={() => HandleContinue()} colors={[AppColors.lightBlue, AppColors.darkBlue]} customStyle={{ borderWidth: 0 }} txtStyle={{ color: AppColors.white }} />
            </View>
        </View>
    )
}

export default Compeletion

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    header: {
        width: wp(85),
        height: hp(20),
        alignItems: "center",
        alignSelf: "center",
        justifyContent: 'center'
    },
    btnView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    imgView: {
        flex: 1
    },
})