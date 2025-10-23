import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppColors } from '../../../../assets/colors/AppColors'
import en from '../../../../../translation/en.json';
import AppHeader from '../../../../components/Header/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { AppFonts } from '../../../../constants/AppFonts';
import FAQSkeleton from '../../../../components/Skeletons/FAQSkeleton';
import { Accordion } from '../../../../components/Accordian/Accordian';
import { useSelector } from 'react-redux';

const FAQ = () => {
    const { FAQs, loadingFAQ, errorFAQ } = useSelector((state: any) => state.userData);
    const navigation: any = useNavigation();
    // const [onLoad, setOnLoad] = React.useState<boolean>(true);
    const [faqData, setFaqData] = React.useState<any[]>(FAQs);

    return (
        <SafeAreaView style={styles.wrapper}>
            <AppHeader title={en.Profile.FAQ} onBackPress={() => { navigation.goBack() }} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
            {loadingFAQ ? (
                <FAQSkeleton />
            ) : (
                <ScrollView style={{ flexGrow: 1 }}>
                    {faqData.map((sec, index) => (
                        <Accordion key={sec?._id} title={sec?.question} description={sec?.answer} />
                    ))}
                </ScrollView>
            )}
        </SafeAreaView>
    )
}

export default FAQ

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white
    }
})