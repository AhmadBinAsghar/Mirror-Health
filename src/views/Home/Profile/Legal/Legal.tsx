import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppColors } from '../../../../assets/colors/AppColors'
import AppHeader from '../../../../components/Header/AppHeader'
import en from '../../../../../translation/en.json';
import { useNavigation } from '@react-navigation/native'
import { AppFonts } from '../../../../constants/AppFonts'
import NormalText from '../../../../components/AppText/NormalText'
import { AppImages } from '../../../../assets/images/AppImages'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { AppRoutes } from '../../../../constants/AppRoutes'


const Legal = () => {
    const navigation: any = useNavigation();
    return (
        <SafeAreaView style={styles.wrapper}>
            <AppHeader title={en.Headings.Legal} onBackPress={() => { navigation.goBack() }} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
            <ScrollView>
                <View style={styles.NavOptions}>
                    <TouchableOpacity onPress={() => { navigation.navigate(AppRoutes.TermAndService) }} activeOpacity={1} style={styles.NavItem}>
                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Image source={AppImages.terms} resizeMode='contain' style={{ width: 25, height: 25, marginRight: 6 }} />
                            <NormalText text={en.Profile.TermsService} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                        </View>
                        <Image source={AppImages.arrowNext} resizeMode='contain' style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                    <View style={styles.seperator} />
                    <TouchableOpacity onPress={() => { navigation.navigate(AppRoutes.PrivacyPolicy) }} activeOpacity={1} style={styles.NavItem}>
                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Image source={AppImages.lock} resizeMode='contain' style={{ width: 25, height: 25, marginRight: 6 }} />
                            <NormalText text={en.Profile.PrivacyPolicy} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                        </View>
                        <Image source={AppImages.arrowNext} resizeMode='contain' style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                    {/* <View style={styles.seperator} />
                    <TouchableOpacity onPress={() => { navigation.navigate(AppRoutes.License) }} activeOpacity={1} style={styles.NavItem}>
                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Image source={AppImages.license} resizeMode='contain' style={{ width: 25, height: 25, marginRight: 6 }} />
                            <NormalText text={en.Profile.Licenses} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                        </View>
                        <Image source={AppImages.arrowNext} resizeMode='contain' style={{ width: 25, height: 25 }} />
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Legal

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white
    },
    NavOptions: {
        width: wp(85),
        alignSelf: "center",
        flex: 1,
        backgroundColor: AppColors.white,
        marginVertical: 12
    },
    NavItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15
    },
    seperator: {
        flex: 1,
        height: 1,
        backgroundColor: AppColors.borderColor,
    },
})