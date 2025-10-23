import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from './styles'
import AppHeader from '../../../components/Header/AppHeader'
import { useNavigation } from '@react-navigation/native'
import LargeText from '../../../components/AppText/LargeText'
import NormalText from '../../../components/AppText/NormalText'
import AppInput from '../../../components/TextInput/AppInput'
import PhoneInput from 'react-native-phone-number-input'
import { AppImages } from '../../../assets/images/AppImages'
import SmallText from '../../../components/AppText/SmallText'
import { AppColors } from '../../../assets/colors/AppColors'
import AppButton from '../../../components/Button/AppButton'
import Helper from '../../../utilis/Helper'
import { AppRoutes } from '../../../constants/AppRoutes'
import { SafeAreaView } from 'react-native-safe-area-context'
import en from "../../../../translation/en.json";
import { AppFonts } from '../../../constants/AppFonts'
import { API_REQUEST } from '../../../network/NetworkRequest'
import { endPoints } from '../../../network/endPoints'
import { useDispatch } from 'react-redux'
import { accessToken, userDataSave, userDetailsSave } from '../../../redux/Slices/userDataSlice'
import { appKeys } from '../../../network/AppKeys'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppLoader from '../../../components/AppLoader/AppLoader'
import { useToast } from 'react-native-toast-notifications'

const SignupScreen = () => {
    const [firstName, setFirstName] = React.useState<string>('');
    const [lastName, setLastName] = React.useState<string>('');
    const [phone, setPhone] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [formatedPhone, setFormattedPhone] = React.useState<string>();
    const [terms, setTerms] = React.useState<boolean>(false);
    const [protection, setProtection] = React.useState<boolean>(false);
    const [disabled, setDisabled] = React.useState<boolean>(true);
    const [validEmail, setValidEmail] = React.useState<boolean>(true);
    const [validPhone, setValidPhone] = React.useState<boolean>(true);
    const [emailErrorText, setEmailErrorText] = React.useState<string>('');
    const [phoneError, setPhoneError] = React.useState<string>('');
    const navigation: any = useNavigation();
    const PhoneRef: any = React.useRef(null);
    const dispatch = useDispatch();
    const toast = useToast()
    const [isloading, setIsLoading] = React.useState<boolean>(false);

    const registeration = () => {
        setIsLoading(true);
        const data = {
            first_name: firstName,
            last_name: lastName,
            phone_number: formatedPhone,
            email: email,
            agreeToTerms: terms,
            is_staging:true,
            promotional_emails: protection,
            provider: "email",
            providerId: ""
        }
        try {
            API_REQUEST("POST", endPoints.register, data,
                (async (sucess: any) => {
                    setIsLoading(false);
                    await AsyncStorage.setItem(appKeys.sessionToken, sucess?.accessToken);
                    dispatch(userDetailsSave({ token: sucess?.accessToken }))
                    dispatch(userDataSave(sucess?.data))
                    // Helper.resetAndGo(navigation, AppRoutes.PasswordCreation)
                    Helper.resetAndGoWithParams(navigation, AppRoutes.CodeVerification, { email: email, reset: false })
                }),
                ((error: any) => {
                    setIsLoading(false);
                    Helper.showToast(error)
                    console.log(error);
                })
            )
        } catch (e) {
            setIsLoading(false);
            console.log(e)
        }
    }

    React.useEffect(() => {
        if (firstName && lastName && validPhone && validEmail && formatedPhone && terms && email) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [validPhone, validEmail, formatedPhone, terms, firstName, lastName, email])

    React.useEffect(() => {
        if (email) {
            if (Helper.isValidEmail(email)) {
                setEmailErrorText('');
                setValidEmail(true)
            } else {
                setEmailErrorText(`${en.Validations.emailError}`);
                setValidEmail(false)
            };
        } else {
            setEmailErrorText('');
            setValidEmail(true)
        }
    }, [email])
    React.useEffect(() => {

        if (phone) {
            if (!PhoneRef?.current?.isValidNumber(formatedPhone)) {
                setPhoneError(`${en.Validations.phoneError}`);
                setValidPhone(false)
            } else if (PhoneRef?.current?.isValidNumber(formatedPhone)) {
                setPhoneError('');
                setValidPhone(true)
            }
        } else {
            setPhoneError('');
            setValidPhone(true)
        }
    }, [phone])

    return (
        <SafeAreaView style={styles.wrapper}>
            <AppHeader title={en.Headings.CreateAcc} onBackPress={() => navigation.goBack()} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    keyboardDismissMode='interactive'
                    keyboardShouldPersistTaps='handled'
                    overScrollMode='never'
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
                >
                    <View>
                        <View style={styles.header}>
                            <LargeText text={en.SignUp.AccInfo} />
                            <NormalText text={en.SignUp.dontHaveAcc} customStyle={{ textAlign: 'center', marginTop: 5 }} />
                        </View>
                        <View style={styles.inputs}>
                            <AppInput placeholder={en.Inputs.firstName} value={firstName} onChangeText={setFirstName} />
                            <AppInput placeholder={en.Inputs.lastName} value={lastName} onChangeText={setLastName} />
                            <View>
                                <PhoneInput
                                    defaultValue={phone}
                                    ref={PhoneRef}
                                    renderDropdownImage={<Image source={AppImages.dropBlack} resizeMode='contain' tintColor={AppColors.placeholderColor} style={{ width: 20, height: 20 }} />}
                                    codeTextStyle={{ fontFamily: AppFonts.GeneralSans.regular, color: AppColors.placeholderColor }}
                                    defaultCode="US"
                                    layout="first"
                                    containerStyle={[styles.PhoneContainer, { borderColor: !validPhone ? AppColors.red : AppColors.borderColor }]}
                                    textContainerStyle={styles.PhoneFlagContainer}
                                    placeholder='Phone Number'
                                    textInputStyle={styles.PhoneInput}
                                    onChangeText={(text) => {
                                        setPhone(text);
                                    }}
                                    onChangeFormattedText={(text) => {
                                        setFormattedPhone(text);
                                    }}
                                />
                                {!validPhone && <Image source={AppImages.alert} resizeMode='contain' style={{ width: 20, height: 20, position: 'absolute', bottom: 40, right: 15 }} />}
                                {!validPhone && <SmallText text={phoneError} customStyle={{ color: AppColors.red, paddingLeft: 20 }} />}
                            </View>
                            <AppInput keyboardType='email-address' error={!validEmail} placeholder={en.Inputs.email} value={email} onChangeText={setEmail} />
                            {!validEmail && <SmallText text={emailErrorText} customStyle={{ color: AppColors.red, paddingLeft: 20 }} />}
                            <TouchableOpacity onPress={() => setTerms(!terms)} activeOpacity={1} style={styles.Checks}>
                                <Image source={terms ? AppImages.checkBoxTrue : AppImages.checkBoxFalse} resizeMode='contain' style={styles.checkboxs} />
                                <View style={{ flexWrap: "wrap", flexDirection: 'row', paddingLeft: 10 }}>
                                    <SmallText text={en.SignUp.agreeToTerm} />
                                    <SmallText text={en.SignUp.terms} customStyle={{ color: AppColors.blue }} />
                                    <SmallText text={` and `} />
                                    <SmallText text={en.SignUp.privacy} customStyle={{ color: AppColors.blue }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setProtection(!protection)} activeOpacity={1} style={styles.Checks}>
                                <Image source={protection ? AppImages.checkBoxTrue : AppImages.checkBoxFalse} resizeMode='contain' style={styles.checkboxs} />
                                <SmallText text={en.SignUp.promotions} customStyle={{ paddingLeft: 10 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.btnView}>
                        <AppButton
                            text={en.Buttons.continue}
                            onPress={registeration}
                            disabled={disabled}
                            txtStyle={{ color: AppColors.white }}
                            customStyle={{ borderWidth: 0 }}
                            colors={disabled ? [AppColors.disabled, AppColors.disabled] : [AppColors.lightBlue, AppColors.darkBlue]}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {isloading && <AppLoader />}
        </SafeAreaView>
    )
}
export default SignupScreen
