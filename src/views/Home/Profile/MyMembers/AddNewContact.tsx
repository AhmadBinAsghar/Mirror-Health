import { Image, StyleSheet, Text, View, Share, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import AppHeader from '../../../../components/Header/AppHeader'
import en from '../../../../../translation/en.json';
import { useNavigation } from '@react-navigation/native'
import { AppImages } from '../../../../assets/images/AppImages'
import LargeText from '../../../../components/AppText/LargeText'
import SmallText from '../../../../components/AppText/SmallText'
import { AppColors } from '../../../../assets/colors/AppColors'
import AppButton from '../../../../components/Button/AppButton'
import Clipboard from '@react-native-clipboard/clipboard'
import { useToast } from 'react-native-toast-notifications'
import { useSelector } from 'react-redux'

const AddNewContact = () => {
    const navigation: any = useNavigation();
    const UserDetails = useSelector((state: any) => state.userData.userDetails);
    const toast = useToast();
    const [link] = React.useState<string>(UserDetails?.appURL ?? 'verahealth.com/fgfgfgdg');
    const handleCopy = async () => {
        Clipboard.setString(link),
            toast.show('URL copied successfully', {
                type: 'custom',
                icon: AppImages.verified,
                placement: "bottom",
                duration: 1500,
                animationType: "slide-in",
            })
    }
    return (
        <SafeAreaView style={styles.wrapper}>
            <AppHeader title={en.Headings.AddNewContact} onBackPress={() => { navigation.goBack() }} />
            <View style={styles.header}>
                <Image source={AppImages.image4} resizeMode='contain' style={styles.ringsImage} />
            </View>
            <View style={styles.LinkView}>
                <LargeText text={en.Profile.Share} customStyle={{ marginVertical: 10 }} />
                <SmallText text='Invite your friends to join by sharing our app! Simply copy the App Store link below or use the share options to spread the word.' customStyle={{ textAlign: 'center', color: AppColors.placeholderColor, marginBottom: 20 }} />
                <View style={[styles.conatiner, { padding: 10, paddingHorizontal: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
                    <SmallText text={link} />
                    <TouchableOpacity onPress={() => handleCopy()} activeOpacity={0.8} hitSlop={10}>
                        <Image source={AppImages.copy} resizeMode='cover' style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>
                <AppButton text={en.Buttons.share} onPress={() => { Share.share({ message: link, url: link, title: 'Vera-Health' }) }} colors={[AppColors.lightBlue, AppColors.darkBlue]} customStyle={{ borderWidth: 0 }} txtStyle={{ color: AppColors.white }} />
            </View>
        </SafeAreaView>
    )
}

export default AddNewContact