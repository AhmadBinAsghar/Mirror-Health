import { Image, KeyboardAvoidingView, Platform, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import AppHeader from '../../../../components/Header/AppHeader'
import en from '../../../../../translation/en.json';
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AppSearchInput from '../../../../components/TextInput/AppSearchInput'
import NormalText from '../../../../components/AppText/NormalText'
import { AppFonts } from '../../../../constants/AppFonts'
import SmallText from '../../../../components/AppText/SmallText'
import { AppColors } from '../../../../assets/colors/AppColors'
import { AppImages } from '../../../../assets/images/AppImages'
import { AppRoutes } from '../../../../constants/AppRoutes'
import AddMemberSkeleton from '../../../../components/Skeletons/AddMemberSkeleton'
import { API_REQUEST } from '../../../../network/NetworkRequest'
import { endPoints } from '../../../../network/endPoints'

interface Contacts {
    _id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    details: Details;
}

interface Details {
    avatar: string;
    profileImage: string;
}

const AddMember = () => {
    const navigation: any = useNavigation();
    const [search, setSearch] = React.useState<string>('');
    const [onLoad, setOnLoad] = React.useState<boolean>(false);
    const [globalContacts, setGlobalContacts] = React.useState<Contacts[]>([]);
    const [searchedContacts, setSearchedContacts] = React.useState<Contacts[]>([]);
    const [timer, setTimer] = React.useState<any>(null);

    const searchUsers = async () => {
        setOnLoad(true);
        try {
            API_REQUEST("GET", endPoints.searchUser + `?query=${search}`, null,
                ((sucess: any) => {
                    // console.log(JSON.stringify(sucess?.data))
                    setSearchedContacts(sucess?.data);
                    setOnLoad(false);
                }),
                ((error: any) => {
                    setOnLoad(false);
                    console.log(error);
                })
            )
        } catch (e) {
            setOnLoad(false);
            console.log(e);
        }
    }

    const inputChanged = (text: string) => {
        setSearch(text);
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            searchUsers();
        }, 800)
        setTimer(newTimer)
    }

    const MemeberContact = [
        {
            title: "Contacts",
            data: searchedContacts
        }
        // {
        //     title: "Global Search",
        //     data: globalContacts
        // }
    ]
    // React.useEffect(() => {
    //     getMembers();
    // }, [])
    return (
        <SafeAreaView style={styles.wrapper}>
            <AppHeader title={en.Headings.AddMember} onBackPress={() => { navigation.goBack() }} />

            <AppSearchInput value={search} onChangeText={inputChanged} placeholder={en.Inputs.searchcontact} crossPress={() => { setSearch('') }} />
            <KeyboardAvoidingView
                style={{ flex: 1, }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                {searchedContacts.length > 0 ? <SectionList
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps='handled'
                    overScrollMode='never'
                    sections={MemeberContact}
                    stickySectionHeadersEnabled
                    style={styles.List}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => item?._id.toString()}
                    renderItem={({ item }) => (
                        item && <TouchableOpacity onPress={() => { navigation.navigate(AppRoutes.MemberDetailScreen, { data: item }) }} activeOpacity={0.8}>
                            {item?.first_name ? <SmallText text={item?.first_name + " " + item?.last_name} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} /> : <SmallText text={item?.phone_number} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />}
                            {item?.first_name && item?.phone_number ? <SmallText text={item?.phone_number} customStyle={{ color: AppColors.placeholderColor, fontSize: 12, marginVertical: 2 }} /> : null}
                            {item?.email && <SmallText text={item?.email} customStyle={{ color: AppColors.placeholderColor, fontSize: 12, marginVertical: 2 }} />}
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={styles.seperater} />
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={{ backgroundColor: AppColors.white }}>
                            <SmallText text={title} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, marginVertical: 25 }} />
                        </View>
                    )}
                /> : onLoad ? <AddMemberSkeleton /> : null}
                <View style={[styles.List, { marginBottom: 20 }]}>
                    <SmallText text={en.Profile.Invitefriend} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, marginVertical: 25 }} />
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate(AppRoutes.AddNewContact) }} style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image source={AppImages.userAdd} resizeMode='contain' style={{ width: 25, height: 25 }} />
                        <SmallText text={en.Profile.Sharelink} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, marginLeft: 10 }} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default AddMember