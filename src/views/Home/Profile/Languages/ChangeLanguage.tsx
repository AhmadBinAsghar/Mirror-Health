import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppFonts } from '../../../../constants/AppFonts'
import AppHeader from '../../../../components/Header/AppHeader'
import en from '../../../../../translation/en.json';
import AppButton from '../../../../components/Button/AppButton'
import { AppColors } from '../../../../assets/colors/AppColors'
import { AppImages } from '../../../../assets/images/AppImages'
import NormalText from '../../../../components/AppText/NormalText'
import ChangeLanguageModal from '../../../../components/Modals/ChangeLanguageModal'
import { useNavigation } from '@react-navigation/native'
import LanguagesSkeleton from '../../../../components/Skeletons/LanguagesSkeleton'
import { API_REQUEST } from '../../../../network/NetworkRequest'
import { endPoints } from '../../../../network/endPoints'
import { useSelector } from 'react-redux'
import Helper from '../../../../utilis/Helper'

const languages = [
    {
        id: 1,
        lang: "en",
        name: "English",
        flag: AppImages.flag,
    },
    {
        id: 2,
        lang: "fn",
        name: "French",
        flag: AppImages.french,
    },
    {
        id: 3,
        lang: "gm",
        name: "German",
        flag: AppImages.german,
    },
    {
        id: 4,
        lang: "itl",
        name: "Italian",
        flag: AppImages.italian,
    },
    {
        id: 5,
        lang: "ph",
        name: "Polish",
        flag: AppImages.polish,
    },
    {
        id: 6,
        lang: "ptg",
        name: "Portuguese",
        flag: AppImages.port,
    },
    {
        id: 7,
        lang: "sph",
        name: "Spanish",
        flag: AppImages.spanish,
    },
    {
        id: 8,
        lang: "sd",
        name: "Swedish",
        flag: AppImages.swedish,
    }
]
const ChangeLanguage = () => {
    const UserData = useSelector((state: any) => state.userData.userData);
    const UserDetails = useSelector((state: any) => state.userData.userDetails);
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const [language, setLang] = React.useState<string>(UserDetails?.language ?? "English");
    const navigation: any = useNavigation();
    const [onLoad, setOnLoad] = React.useState<boolean>(false);

    const updateLang = async () => {
        const method = 'POST';
        const data = {
            userId: UserData?.userId,
            language: language
        };
        API_REQUEST(method, endPoints.langSelection, data,
            (async (success: any) => {
                Helper?.showToast(success?.message)
                console.log(success);
                navigation.goBack();
            }),
            ((error: any) => {
                Helper?.showToast(error)
                console.log(error);
            }))
    }
    React.useEffect(() => {
        setInterval(() => {
            setOnLoad(false);
        }, 2000);
    }, [])
    return (
        <SafeAreaView style={styles.wrapper}>
            <ChangeLanguageModal visible={modalVisible} onClose={() => { setModalVisible(!modalVisible) }} onSelect={() => { setModalVisible(!modalVisible), updateLang() }} />
            <AppHeader title={en.Headings.SelectLang} onBackPress={() => { navigation.goBack() }} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
            {onLoad ? (
                <LanguagesSkeleton />
            ) : (
                <>
                    <ScrollView>
                        {languages.map(lang => (
                            <View key={lang.id}>
                                <TouchableOpacity style={styles.langView} onPress={() => { setLang(lang.name) }} activeOpacity={0.8}>
                                    <View style={styles.nameView}>
                                        <Image source={lang.flag} resizeMode='center' style={styles.icon} />
                                        <NormalText text={lang.name} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, marginLeft: 10 }} />
                                    </View>
                                    <Image source={lang.name === language ? AppImages.checkTrue : AppImages.checkFalse} resizeMode='contain' style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                    <View style={styles.btnView}>
                        <AppButton onPress={() => { setModalVisible(!modalVisible) }} text={en.Buttons.ChangeLang} colors={[AppColors.lightBlue, AppColors.darkBlue]} txtStyle={{ color: AppColors.white }} customStyle={{ borderWidth: 0 }} containerStyle={{ marginVertical: 10 }} />
                    </View>
                </>
            )}
        </SafeAreaView>
    )
}

export default ChangeLanguage