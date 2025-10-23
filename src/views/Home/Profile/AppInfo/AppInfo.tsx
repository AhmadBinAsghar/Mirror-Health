import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppHeader from '../../../../components/Header/AppHeader'
import { AppFonts } from '../../../../constants/AppFonts'
import en from '../../../../../translation/en.json';
import NormalText from '../../../../components/AppText/NormalText'
import { AppColors } from '../../../../assets/colors/AppColors'
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import VersionCheck from 'react-native-version-check';


const AppInfo = () => {
    const navigation: any = useNavigation();
    const [storeVersion, setStoreVersion] = React.useState<string>('');

    React.useEffect(() => {
        // It checks the current version of application
        const version = VersionCheck.getCurrentVersion();
        setStoreVersion(version);
    }, []);

    return (
        <SafeAreaView style={styles.wrapper}>
            <AppHeader title={en.Headings.AppInfo} onBackPress={() => { navigation.goBack() }} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
            <View style={styles.body}>
                <NormalText text={en.Profile.Version} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
                <NormalText text={storeVersion ?? ''} customStyle={{ color: AppColors.placeholderColor, marginLeft: 10 }} />
            </View>
            <View style={styles.sperater} />
        </SafeAreaView>
    )
}

export default AppInfo

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
    body: {
        width: widthPercentageToDP(85),
        alignSelf: "center",
        flexDirection: 'row',
        marginTop: 20
    },
    sperater: {
        height: 1,
        width: '85%',
        alignSelf: 'center',
        backgroundColor: AppColors.borderColor,
        marginVertical: 20
    }
})