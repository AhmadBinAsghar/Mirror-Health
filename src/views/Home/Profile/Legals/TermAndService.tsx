import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HTML from "react-native-render-html";
import AppHeader from '../../../../components/Header/AppHeader';
import PrivacyPolicyShimmer from '../../../../components/Skeletons/PrivacyPolicyShimmer';
import { API_REQUEST } from '../../../../network/NetworkRequest';
import { endPoints } from '../../../../network/endPoints';
import { AppColors } from '../../../../assets/colors/AppColors';
import { AppFonts } from '../../../../constants/AppFonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const TermAndService = () => {
    const navigation: any = useNavigation();
    const [terms, setTerms] = React.useState<string>('');

    const getTerms = async () => {
        const method = "GET";
        try {
            await API_REQUEST(method, endPoints.terms, null, ((succes: any) => {
                setTerms(succes?.data[0]?.terms);
            }), ((error: any) => {
                console.log("privacy_policy Error===============\n ", error);
            }))
        } catch (e) {
            console.log("privacy_policy FUNCTION ERRORS===============\n ", e);
        }
    }

    React.useEffect(() => {
        getTerms();
    }, []);
    return (
        <SafeAreaView style={styles.wrapper}>

            <AppHeader title='Terms of Service' onBackPress={() => { navigation.goBack() }} />

            {!terms ? <PrivacyPolicyShimmer /> :
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainer}
                    style={styles.container}>
                    <HTML
                        source={{ html: terms }}
                        tagsStyles={{ body: { color: "black", textAlign: "justify" } }}
                    />
                </ScrollView>}
        </SafeAreaView>
    )
}

export default TermAndService

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
    container: {
        flex: 1,
        backgroundColor: AppColors.white,
        paddingHorizontal: 25
    },
    contentContainer: {
        paddingVertical: "5%",
        paddingHorizontal: "8%",
        alignItems: 'center',
    },
    aboutText: {
        fontSize: 16,
        color: AppColors.black,
        fontFamily: AppFonts.GeneralSans.regular,
        marginTop: 20,
    }
})