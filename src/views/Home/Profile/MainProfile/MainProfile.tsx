import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import AppHeader from '../../../../components/Header/AppHeader'
import en from '../../../../../translation/en.json';
import LargeText from '../../../../components/AppText/LargeText'
import NormalText from '../../../../components/AppText/NormalText'
import { AppFonts } from '../../../../constants/AppFonts'
import { AppImages } from '../../../../assets/images/AppImages'
import { AppColors } from '../../../../assets/colors/AppColors'
import SmallText from '../../../../components/AppText/SmallText'
import { useNavigation } from '@react-navigation/native'
import { AppRoutes } from '../../../../constants/AppRoutes'
import ProfileModal from '../../../../components/Modals/ProfileModal'
import Clipboard from '@react-native-clipboard/clipboard'
import { useToast } from 'react-native-toast-notifications'
import { accessToken, fetchFAQ, fetchMembers, fetchPreConditions, userDataReset, userDataSave, userDetailsReset, userDetailsSave } from '../../../../redux/Slices/userDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import LogOutAccountModal from '../../../../components/Modals/LogOutAccountModal'
import DeleteAccountModal from '../../../../components/Modals/DeleteAccountModal'
import { Logout } from '../../../../services/Firebase/FirebaseAuth'
import MainProfileSkeleton from '../../../../components/Skeletons/MainProfileSkeleton'
import { API_REQUEST } from '../../../../network/NetworkRequest'
import { endPoints } from '../../../../network/endPoints'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { appKeys } from '../../../../network/AppKeys'
import ImageComponent from '../../../../components/ImageComponent/ImageComponent'
import messaging from '@react-native-firebase/messaging';
import InterestAccordian from './InterestAccordian'
import { City, Country } from 'country-state-city'

const MainProfile = () => {
    const navigation: any = useNavigation();
    const UserData = useSelector((state: any) => state.userData.userData);
    const UserDetails = useSelector((state: any) => state.userData.userDetails);
    const [profile, setProfile] = React.useState<string>("Personal");
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showLogout, setShowLogout] = React.useState<boolean>(false);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const toast = useToast();
    const [link] = React.useState<string>(UserDetails?.appURL ?? 'verahealth.com/fgfgfgdg');
    const dispatch: any = useDispatch();
    const [onLoad, setOnLoad] = React.useState<boolean>(UserData ? false : true);
    const [interests, setInterest] = React.useState<any[]>(UserDetails?.interests ?? [])

    React.useEffect(() => {
        const country = Country.getAllCountries();
        const city = City.getAllCities();
    }, [])
    const getAppUrl = () => {
        try {
            API_REQUEST("GET", endPoints.appUrl, null,
                ((success: any) => {
                    // console.log("App url is: ", success)
                    dispatch(userDetailsSave({ appURL: success?.data }))
                }),
                ((error: any) => {
                    console.log("Error while getting app url \n", error);
                })
            )
        } catch (err) {
            console.log("Error while getting app url \n", err);
        }
    }
    const getUserInfo = async () => {
        const method = "GET";
        API_REQUEST(method, endPoints.getUserInfo, null,
            ((success: any) => {
                // console.log("===================================>", JSON.stringify(success));
                dispatch(userDataSave(success?.data?.userData))
                dispatch(userDetailsSave(success?.data?.userDetails))
                setOnLoad(false);
            }),
            ((error: any) => {
                console.log(error);
                setOnLoad(false);
            })
        )
    }
    const delToken = async () => {
        const token = await messaging().getToken();
        try {
            const data = {
                deviceToken: token
            };
            API_REQUEST("DELETE", endPoints.deleteToken, data,
                ((sucess: any) => {
                    AsyncStorage.removeItem(appKeys.sessionToken);
                }),
                ((error: any) => {
                    console.log("\n Error while delete FCM token [dlToken] \n", error);
                })
            )
        } catch (e) {
            console.log(e)
        }
    }

    const handleLogout = () => {
        delToken();
        dispatch(userDetailsReset());
        Logout();
        dispatch(userDataReset());
        dispatch(accessToken(''));
    }
    const deleteAcc = () => {
        try {
            // const data = {
            //     userId: UserData?.userId,
            //     password: password
            // };
            API_REQUEST("DELETE", endPoints.deleteAcc, null,
                ((sucess: any) => {
                    delToken();
                    AsyncStorage.removeItem(appKeys.sessionToken)
                    dispatch(userDetailsReset());
                    Logout();
                    dispatch(userDataReset());
                    dispatch(accessToken(''));
                }),
                ((error: any) => {
                    console.log(error);
                })
            )
        } catch (e) {
            console.log(e)
        }
    }
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAppUrl()
            getUserInfo();
            dispatch(fetchPreConditions());
            dispatch(fetchFAQ());
            dispatch(fetchMembers());
        });
        return unsubscribe;
    }, [dispatch]);

    const handleShare = async () => {
        Clipboard.setString(link),
            toast.show('URL copied successfully', {
                type: 'custom',
                icon: AppImages.verified,
                placement: "bottom",
                duration: 1500,
                animationType: "slide-in",
            })
    }

    const filterInterests = () => {
        const FilteredArray = UserDetails?.interests?.map((item: any) => {
            return (item)
        })
        return (setInterest(FilteredArray))
    }
    React.useEffect(() => {
        filterInterests()
    }, [UserDetails])
    return (
        <SafeAreaView style={styles.wrapper} >
            <DeleteAccountModal visible={showDelete} onClose={() => setShowDelete(!showDelete)} onDelete={() => { deleteAcc() }} />
            <LogOutAccountModal visible={showLogout} onClose={() => setShowLogout(!showLogout)} onLogOut={() => { handleLogout() }} />
            <ProfileModal visible={showModal} onEditInfo={() => { navigation.navigate(AppRoutes.EditProfile) }} onShare={() => handleShare()} onClose={() => { setShowModal(!showModal) }} onEditInterest={() => { navigation.navigate(AppRoutes.EditInterests) }} />
            <AppHeader title={en.Headings.Profile} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} onThreeDots={() => { setShowModal(!showModal) }} />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}
                keyboardDismissMode='interactive'
                overScrollMode='never'
                keyboardShouldPersistTaps='handled'
            >
                <View style={styles.profileView}>
                    {onLoad ? (
                        <MainProfileSkeleton />
                    ) : (<>
                        <ImageComponent uri={UserDetails?.profileImage} customStyle={styles.avatr} />
                        <LargeText text={UserData?.firstName ? `${UserData?.firstName + " " + UserData?.lastName}` : 'Unknown'} customStyle={{ letterSpacing: -0.33, marginTop: 5 }} />
                        <View style={styles.JoinedDate}>
                            <SmallText text={en.Profile.Joined} customStyle={{ fontSize: 12, color: AppColors.placeholderColor }} />
                            <SmallText text={UserData?.joiningDate ? moment(UserData?.joiningDate, 'yyyy-MM-DD HH:mm:ss').format('MMM DD,yyyy') : ` Nov 11, 2023`} customStyle={{ fontSize: 12 }} />
                        </View>
                        <View style={styles.ageView}>
                            <View style={styles.age}>
                                <Image source={AppImages.star} resizeMode='contain' style={{ width: 15, height: 15, marginRight: 3 }} />
                                <SmallText text={`${UserDetails?.age} years old`} />
                            </View>
                            <View style={styles.age}>
                                {/* <CountryFlag isoCode={UserDetails?.countryIsoCode ?? "us"} size={20} style={{ borderWidth: 1, borderColor: AppColors.borderColor, marginRight: 4, borderRadius: 100 }} /> */}

                                <Image source={{ uri: `https://flagcdn.com/w320/${UserDetails?.countryIsoCode?.toLowerCase() ?? "us".toLowerCase()}.png` }} resizeMode='stretch' style={{ width: 18, height: 18, borderRadius: 100, borderWidth: 0.6, borderColor: AppColors.borderColor, marginHorizontal: 3 }} />
                                <SmallText text={UserDetails?.country} />
                            </View>
                        </View>
                        {interests && interests.length > 0 && <InterestAccordian description={interests} />}
                    </>
                    )}
                </View>
                <View style={styles.Navs}>
                    <LargeText text={en.Profile.PersonalProfile} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: profile === "Personal" ? AppColors.black : AppColors.placeholderColor, alignSelf: 'center', marginBottom: 15 }} />
                    {profile === "Personal" ? (
                        <>
                            <LargeText text={en.Profile.Account} customStyle={{ fontSize: 18 }} />
                            <View style={styles.NavOptions}>
                                <TouchableOpacity onPress={() => { navigation.navigate(AppRoutes.MyMetrics) }} activeOpacity={1} style={styles.NavItem}>
                                    <NormalText text={en.Profile.MyMetrics} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                                    <Image source={AppImages.arrowNext} resizeMode='contain' style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                                <View style={styles.seperator} />
                                <TouchableOpacity onPress={() => { navigation.navigate(AppRoutes.MyPreconditions) }} activeOpacity={1} style={styles.NavItem}>
                                    <NormalText text={en.Profile.MyPreconditions} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                                    <Image source={AppImages.arrowNext} resizeMode='contain' style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                                <View style={styles.seperator} />
                                <TouchableOpacity onPress={() => { navigation.navigate(AppRoutes.MyMembers) }} activeOpacity={1} style={styles.NavItem}>
                                    <NormalText text={en.Profile.MyMembers} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                                    <Image source={AppImages.arrowNext} resizeMode='contain' style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                                <View style={styles.seperator} />
                                <TouchableOpacity onPress={() => { navigation.navigate(AppRoutes.ChangeEmail) }} activeOpacity={1} style={styles.NavItem}>
                                    <NormalText text={en.Profile.ChangeEmail} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                                    <Image source={AppImages.arrowNext} resizeMode='contain' style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                                <View style={styles.seperator} />
                                <TouchableOpacity onPress={() => { navigation.navigate(AppRoutes.ResetPassword) }} activeOpacity={1} style={styles.NavItem}>
                                    <NormalText text={en.Profile.ResetPassword} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                                    <Image source={AppImages.arrowNext} resizeMode='contain' style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                            </View>
                            <LargeText text={en.Profile.Settings} customStyle={{ fontSize: 18 }} />
                            <View style={styles.NavOptions}>
                                <TouchableOpacity onPress={() => { navigation.navigate(AppRoutes.MyDevice) }} activeOpacity={1} style={styles.NavItem}>
                                    <NormalText text={en.Profile.MyDevices} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                                    <Image source={AppImages.arrowNext} resizeMode='contain' style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                                {/* <View style={styles.seperator} />
                                <TouchableOpacity onPress={() => { navigation.navigate(AppRoutes.Notifications) }} activeOpacity={1} style={styles.NavItem}>
                                    <NormalText text={en.Profile.Notifications} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                                    <Image source={AppImages.arrowNext} resizeMode='contain' style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                                <View style={styles.seperator} />
                                <TouchableOpacity onPress={() => { navigation.navigate(AppRoutes.Language) }} activeOpacity={1} style={styles.NavItem}>
                                    <NormalText text={en.Profile.Language} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                                    <Image source={AppImages.arrowNext} resizeMode='contain' style={{ width: 25, height: 25 }} />
                                </TouchableOpacity> */}
                            </View>
                            <LargeText text={en.Profile.AboutVeraHealth} customStyle={{ fontSize: 18 }} />
                            <View style={styles.NavOptions}>
                                <TouchableOpacity onPress={() => { navigation.navigate(AppRoutes.AppInfo) }} activeOpacity={1} style={styles.NavItem}>
                                    <NormalText text={en.Profile.AppInformation} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                                    <Image source={AppImages.arrowNext} resizeMode='contain' style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                                <View style={styles.seperator} />
                                {/* <TouchableOpacity onPress={() => { navigation.navigate(AppRoutes.FAQ) }} activeOpacity={1} style={styles.NavItem}>
                                    <NormalText text={en.Profile.FAQ} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                                    <Image source={AppImages.arrowNext} resizeMode='contain' style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                                <View style={styles.seperator} /> */}
                                <TouchableOpacity onPress={() => { navigation.navigate(AppRoutes.Legal) }} activeOpacity={1} style={styles.NavItem}>
                                    <NormalText text={en.Profile.Legal} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                                    <Image source={AppImages.arrowNext} resizeMode='contain' style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                                <View style={styles.seperator} />
                                <TouchableOpacity onPress={() => { navigation.navigate(AppRoutes.ContactUs) }} activeOpacity={1} style={styles.NavItem}>
                                    <NormalText text={en.Profile.ContactSupport} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                                    <Image source={AppImages.arrowNext} resizeMode='contain' style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.NavOptions}>
                                <TouchableOpacity onPress={() => { setShowLogout(!showLogout) }} activeOpacity={1} style={[styles.NavItem, { justifyContent: "flex-start" }]}>
                                    <Image source={AppImages.logout} resizeMode='contain' style={{ width: 25, height: 25 }} />
                                    <NormalText text={en.Profile.LogOut} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, marginLeft: 5 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setShowDelete(!showDelete) }} activeOpacity={1} style={[styles.NavItem, { justifyContent: "flex-start" }]}>
                                    <Image source={AppImages.delAccount} resizeMode='contain' tintColor={AppColors.red} style={{ width: 25, height: 25 }} />
                                    <NormalText text={en.Profile.DeleteAccount} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, marginLeft: 5, color: AppColors.red }} />
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <></>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MainProfile