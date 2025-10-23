import { Platform, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import LargeText from '../../../components/AppText/LargeText'
import NormalText from '../../../components/AppText/NormalText'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AppButton from '../../../components/Button/AppButton'
import { AppColors } from '../../../assets/colors/AppColors'
import SmallText from '../../../components/AppText/SmallText'
import { AppImages } from '../../../assets/images/AppImages'
import { AppFonts } from '../../../constants/AppFonts'
import { useNavigation } from '@react-navigation/native'
import { AppRoutes } from '../../../constants/AppRoutes'
import en from "../../../../translation/en.json";
import { accessToken, userDataSave, userDetailsSave } from '../../../redux/Slices/userDataSlice'
import { useDispatch } from 'react-redux'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next'
import { API_REQUEST } from '../../../network/NetworkRequest'
import { endPoints } from '../../../network/endPoints'
import AppLoader from '../../../components/AppLoader/AppLoader'
import { appKeys } from '../../../network/AppKeys'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Helper from '../../../utilis/Helper'
import { appleAuthLogin, onFaceBookLogin, onGoogleLogin } from '../../../services/SocialLoginServices/SocialLoginServices'

const SignUpOptions = () => {
    const navigation: any = useNavigation();
    const dispatch = useDispatch();
    const [isloading, setIsLoading] = React.useState<boolean>(false)

    const SocialLogin = (data: any) => {
        try {
            API_REQUEST("POST", endPoints.register, data,
                (async (success: any) => {
                    await AsyncStorage.setItem(appKeys.sessionToken, success?.accessToken);
                    dispatch(userDataSave(success?.data));
                    setIsLoading(false);
                    if (success?.data?.calibrationStatus === false && success?.data?.userProfileCreated === false) {
                        navigation.navigate(AppRoutes.Onboarding, { step: 0 });
                        dispatch(userDetailsSave({ calibration: false, token: success?.accessToken }))
                    } else if (success?.data?.calibrationStatus === false && success?.data?.userProfileCreated === true) {
                        navigation.navigate(AppRoutes.Onboarding, { step: 4 });
                        dispatch(userDetailsSave({ calibration: false, token: success?.accessToken }))
                    } else if (success?.data?.calibrationStatus === true && success?.data?.userProfileCreated === true) {
                        dispatch(userDetailsSave({ calibration: true }));
                        dispatch(accessToken(success?.accessToken));
                    }
                    // sucess?.data?.calibrationStatus === false ? (navigation.navigate(AppRoutes.Onboarding)) : dispatch(accessToken(sucess?.accessToken));
                    // navigation.navigate(AppRoutes.Onboarding);
                }),
                ((error: any) => {
                    Helper.showToast(error)
                    setIsLoading(false);
                    console.log("Social Sign-In Error \n", error);
                })
            )
        } catch (e) {
            setIsLoading(false);
            console.log(e)
        }
    }

    const GoogleAuth = async () => {
        try {
            setIsLoading(true);

            onGoogleLogin({
                onSuccess: (user: any, userData: any) => {
                    SocialLogin({
                        first_name: userData?.givenName,
                        last_name: userData?.familyName,
                        email: userData?.email,
                        agreeToTerms: true,
                        promotional_emails: true,
                        provider: "google",
                        providerId: userData?.id
                    });
                },
                onError: (error: any) => {
                    setIsLoading(false);
                    console.log(" \n======== Google Signup Failed ==========", error) // Helper.showToast("Something went wrong!")
                }
            });
        }
        catch (error) {
            setIsLoading(false);
            Helper.showToast("Check network connection!")
            console.log("==========Google Signin Error===============\n", error);
        }
    }

    const handleFacebookLogin = async () => {
        try {
            setIsLoading(true);
            onFaceBookLogin({
                onSuccess: (user: any, userData: any) => {
                    SocialLogin({
                        first_name: user?.firstName,
                        last_name: user?.lastName,
                        phone_number: '',
                        email: user?.email,
                        agreeToTerms: true,
                        promotional_emails: true,
                        provider: "facebook",
                        providerId: user?.uid
                    });
                },
                onError: (error: any) => {
                    setIsLoading(false);
                    console.log(" \n======== Facabook Signup Failed ==========", error) // Helper.showToast("Something went wrong!")
                }
            });
        } catch (error) {
            setIsLoading(false);
            Helper.showToast("Check network connection!")
            console.log(error);
        }
    };

    const handleAppleSignIn = async () => {
        try {
            setIsLoading(true);

            appleAuthLogin({
                onSuccess: (userData: any) => {
                    SocialLogin({
                        email: userData?.email,
                        first_name: userData?.first_name,
                        last_name: userData?.last_name,
                        agreeToTerms: true,
                        promotional_emails: true,
                        provider: "apple",
                        providerId: userData?.uid
                    });
                    setIsLoading(false);
                },
                onError: (error: any) => {
                    setIsLoading(false);
                    console.log(" \n======== Apple Signup Failed ==========", error) // Helper.showToast("Something went wrong!")
                }
            });
        }
        catch (error) {
            setIsLoading(false);
            Helper.showToast("Check network connection!")
            console.log("==========Apple Signin Error===============\n", error);
        }
    }

    return (
        <View style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header} >
                    <LargeText text={en.Onboarding.welcome} customStyle={{ textAlign: 'center', fontSize: 36 }} />
                    <NormalText text={en.Onboarding.Screen1} customStyle={{ textAlign: 'center', marginTop: 14 }} />
                </View>
                <View style={styles.btnsView}>
                    <AppButton
                        text={en.Buttons.signUpwithEmail}
                        onPress={() => { navigation.navigate(AppRoutes.SignUp) }}
                        colors={[AppColors.lightBlue, AppColors.darkBlue]}
                        customStyle={{ borderWidth: 0 }}
                        txtStyle={{ color: AppColors.white }} />
                    <View style={styles.ORSection}>
                        <View style={styles.Seperater} />
                        <SmallText text='or' customStyle={{ marginHorizontal: 20, textAlign: 'center' }} />
                        <View style={styles.Seperater} />
                    </View>
                    <AppButton
                        text={en.Buttons.Google}
                        onPress={() => GoogleAuth()}
                        icon={AppImages.google}
                        txtStyle={{ color: AppColors.black }} />
                    {Platform.OS === 'ios' && <AppButton
                        text={en.Buttons.Apple}
                        onPress={() => handleAppleSignIn()}
                        icon={AppImages.apple}
                        txtStyle={{ color: AppColors.black }} />}
                    <AppButton
                        text={en.Buttons.Facebook}
                        onPress={() => { handleFacebookLogin() }}
                        icon={AppImages.facebook}
                        txtStyle={{ color: AppColors.black }} />
                    <View style={styles.login}>
                        <NormalText text={en.Onboarding.haveAccount} />
                        <TouchableOpacity hitSlop={20} onPress={() => navigation.navigate(AppRoutes.Login)} activeOpacity={1}>
                            <NormalText text={en.Buttons.login} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, color: AppColors.blue }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {isloading && <AppLoader />}
        </View>
    )
}

export default SignUpOptions