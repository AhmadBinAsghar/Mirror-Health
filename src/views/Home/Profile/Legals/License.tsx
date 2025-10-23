import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColors } from '../../../../assets/colors/AppColors';
import { AppFonts } from '../../../../constants/AppFonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../../components/Header/AppHeader';
import PrivacyPolicyShimmer from '../../../../components/Skeletons/PrivacyPolicyShimmer';
import { endPoints } from '../../../../network/endPoints';
import { API_REQUEST } from '../../../../network/NetworkRequest';
import HTML from "react-native-render-html";
import { useNavigation } from '@react-navigation/native';
import NormalText from '../../../../components/AppText/NormalText';
import SmallText from '../../../../components/AppText/SmallText';

const License = () => {
    const navigation: any = useNavigation();
    const [lic, setLic] = React.useState<any>(null);
    const [provider, setProvider] = React.useState<string>('');
    const [owner, setOwner] = React.useState<string>('');

    const getPolicy = async () => {
        const method = "GET";
        try {
            await API_REQUEST(method, endPoints.license, null, ((succes: any) => {
                setLic(succes?.data[0]?.licenseImage);
                setProvider(succes?.data[0]?.content);
                setOwner(succes?.data[0]?.owner);
            }), ((error: any) => {
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

            <AppHeader title='License' onBackPress={() => { navigation.goBack() }} />

            {!lic ? <PrivacyPolicyShimmer /> :
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainer}
                    style={styles.container}>
                    <Image source={{ uri: lic }} resizeMode='contain' style={{ borderColor: AppColors.borderColor, borderWidth: 0.7, width: '100%', height: 400, marginBottom: 15 }} />
                    <View style={{ flexDirection: "row", marginLeft: 25 }}>
                        <NormalText text='Owner:  ' customStyle={{ fontFamily: AppFonts.GeneralSans.bold }} />
                        <SmallText text={owner} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                    </View>
                </ScrollView>}
            <View style={{ flexDirection: "row", position: "absolute", alignSelf: "center", bottom: 0, height: 30 }}>
                {/* <NormalText text='Approved by: ' customStyle={{ fontFamily: AppFonts.GeneralSans.bold }} /> */}
                <SmallText text={provider} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
            </View>
        </SafeAreaView>
    )
}

export default License

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
    container: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
    contentContainer: {
        paddingVertical: "5%",
    },
    aboutText: {
        fontSize: 16,
        color: AppColors.black,
        fontFamily: AppFonts.GeneralSans.regular,
        marginTop: 20,
    }
})