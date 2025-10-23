import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppColors } from '../../../../assets/colors/AppColors'
import en from '../../../../../translation/en.json';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../../../components/Header/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { AppFonts } from '../../../../constants/AppFonts';
import LargeText from '../../../../components/AppText/LargeText';
import SmallText from '../../../../components/AppText/SmallText';
import NormalText from '../../../../components/AppText/NormalText';
import AppButton from '../../../../components/Button/AppButton';
import { API_REQUEST } from '../../../../network/NetworkRequest';
import { endPoints } from '../../../../network/endPoints';

const ContactUs = () => {
    const navigation: any = useNavigation();
    const [contactData, setContactData] = React.useState<any>(null);

    const getContactData = async () => {
        const method = "GET";
        API_REQUEST(method, endPoints.contactUs, null,
            ((success: any) => {
                setContactData(success?.data);
            }),
            ((error: any) => {
                console.log(error);
            })
        )
    }
    React.useEffect(() => {
        getContactData();
    }, [])
    return (
        <SafeAreaView style={styles.wrapper}>
            <AppHeader title={en.Headings.Contact} onBackPress={() => { navigation.goBack() }} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
            <ScrollView>
                <View style={styles.body}>
                    <LargeText text={en.Profile.Contacts} />
                    <SmallText text={en.Profile.toContactus} customStyle={{ color: AppColors.placeholderColor, marginTop: 6, fontSize: 14 }} />
                    {/* <LargeText text={contactData?.admin_phone_no ?? "+137 213-8441-302"} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, marginTop: 20 }} /> */}
                    {/* <SmallText text={en.Profile.forOrder} customStyle={{ color: AppColors.placeholderColor, marginTop: 6, fontSize: 14 }} /> */}
                    <View style={{ marginVertical: 15 }}>
                        {/* <AppButton text={en.Buttons.Callus} onPress={() => { }} colors={[AppColors.lightBlue, AppColors.darkBlue]} txtStyle={{ color: AppColors.white }} /> */}
                    </View>
                    <LargeText text={en.Profile.Commerce} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, marginTop: 5 }} />
                    {/* <SmallText text={en.Profile.Writeforsuggestions} customStyle={{ color: AppColors.placeholderColor, marginTop: 6, fontSize: 14 }} /> */}
                    <View style={{ flexDirection: 'row', alignItems: "center", marginVertical: 8 }}>
                        <SmallText text={en.Inputs.email + ':'} customStyle={{ fontSize: 14, fontFamily: AppFonts.GeneralSans.semiBold }} />
                        <SmallText text={contactData?.commerce_department_email ?? 'support@mirror.health'} customStyle={{ fontSize: 14, color: AppColors.placeholderColor, marginLeft: 5, textDecorationLine: "underline" }} />
                    </View>
                    {/* <LargeText text={en.Profile.PressService} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, marginTop: 15 }} />
                    <SmallText text={en.Profile.Formediainquiries} customStyle={{ color: AppColors.placeholderColor, marginTop: 6, fontSize: 14 }} />
                    <View style={{ flexDirection: 'row', alignItems: "center", marginVertical: 8 }}>
                        <SmallText text={en.Inputs.email + ':'} customStyle={{ fontSize: 14, fontFamily: AppFonts.GeneralSans.semiBold }} />
                        <SmallText text={contactData?.press_service_email ?? 'pressoffice@verahealth.org'} customStyle={{ fontSize: 14, color: AppColors.placeholderColor, marginLeft: 5, textDecorationLine: "underline" }} />
                    </View>
                    <LargeText text={en.Profile.CorporateOrders} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, marginTop: 15 }} />
                    <SmallText text={en.Profile.GiftCards} customStyle={{ color: AppColors.placeholderColor, marginTop: 6, fontSize: 14 }} />
                    <View style={{ flexDirection: 'row', alignItems: "center", marginVertical: 8 }}>
                        <SmallText text={en.Inputs.email + ':'} customStyle={{ fontSize: 14, fontFamily: AppFonts.GeneralSans.semiBold }} />
                        <SmallText text={contactData?.corporate_order_email ?? 'b2b@verahealth.org'} customStyle={{ fontSize: 14, color: AppColors.placeholderColor, marginLeft: 5, textDecorationLine: "underline" }} />
                    </View> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ContactUs

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
    body: {
        width: wp(85),
        alignSelf: "center",
        justifyContent: 'center'
    }
})