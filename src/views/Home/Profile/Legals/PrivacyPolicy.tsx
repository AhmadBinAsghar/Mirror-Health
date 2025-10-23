import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { API_REQUEST } from '../../../../network/NetworkRequest';
import { endPoints } from '../../../../network/endPoints';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../../components/Header/AppHeader';
import PrivacyPolicyShimmer from '../../../../components/Skeletons/PrivacyPolicyShimmer';
import { AppColors } from '../../../../assets/colors/AppColors';
import { AppFonts } from '../../../../constants/AppFonts';
import HTML from "react-native-render-html";

const PrivacyPolicy = () => {
    const navigation: any = useNavigation();
    const [policy, setPolicy] = React.useState<string>('');

    const getPolicy = async () => {
        const method = "GET";
        try {
            await API_REQUEST(method, endPoints.policy, null, ((succes: any) => {
                setPolicy(succes?.data[0]?.policy);
            }), ((error: any) => {
                console.log("privacy_policy Error===============\n ", error);
            }))
        } catch (e) {
            console.log("privacy_policy FUNCTION ERRORS===============\n ", e);
        }
    }

    React.useEffect(() => {
        getPolicy();
    }, []);
    return (
        <SafeAreaView style={styles.wrapper}>

            <AppHeader title='Privacy Policy' onBackPress={() => { navigation.goBack() }} />

            {!policy ? <PrivacyPolicyShimmer /> :
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainer}
                    style={styles.container}>
                    <HTML
                        source={{ html: policy }}
                        tagsStyles={{ body: { color: "black", textAlign: "justify" } }}
                    />
                </ScrollView>}
        </SafeAreaView>
    )
}

export default PrivacyPolicy

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