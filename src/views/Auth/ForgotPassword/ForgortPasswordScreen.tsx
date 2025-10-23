import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AppHeader from '../../../components/Header/AppHeader'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LargeText from '../../../components/AppText/LargeText'
import NormalText from '../../../components/AppText/NormalText'
import PhoneInput from 'react-native-phone-number-input'
import { AppImages } from '../../../assets/images/AppImages'
import SmallText from '../../../components/AppText/SmallText'
import { AppColors } from '../../../assets/colors/AppColors'
import AppButton from '../../../components/Button/AppButton'
import { AppRoutes } from '../../../constants/AppRoutes'
import en from '../../../../translation/en.json';
import { AppFonts } from '../../../constants/AppFonts'
import { API_REQUEST, BASE_URL } from '../../../network/NetworkRequest'
import { endPoints } from '../../../network/endPoints'
import AppInput from '../../../components/TextInput/AppInput'
import Helper from '../../../utilis/Helper'
import AppLoader from '../../../components/AppLoader/AppLoader'

const ForgortPasswordScreen = () => {
    const navigation: any = useNavigation();
    const [email, setEmail] = React.useState<string>('');
    const [formatedPhone, setFormattedPhone] = React.useState<string>('');
  const [validEmail, setValidEmail] = React.useState<boolean>(true);
    const [disabled, setDisabled] = React.useState<boolean>(true);
    const PhoneRef: any = React.useRef(null);
    const [isloading, setIsLoading] = React.useState<boolean>(false)
    
    React.useEffect(() => {
        if (email) {
          if (Helper.isValidEmail(email)) {
            setValidEmail(true)
          } else {
            setValidEmail(false)
          };
        } else {
          setValidEmail(true)
        }
      }, [email])
    
      const forgotPassword = () => {
        Keyboard.dismiss();
          setIsLoading(true);
          const raw = {
              email: email
            };
            try {
                API_REQUEST("POST", endPoints.forgotPassword, raw, ((sucess: any) => {
                    setIsLoading(false);
                    navigation.navigate(AppRoutes.CodeVerification, { email: email, reset: true })
                }),
                ((error: any) => {
                    setIsLoading(false);
                    Helper.showToast(error)
                }))
        } catch (error) {
            setIsLoading(false);
        }
    }

    React.useEffect(() => {
        if (email && validEmail) {
          setDisabled(false)
        } else {
          setDisabled(true)
        }
      }, [validEmail, email])

    return (
        <SafeAreaView style={styles.wrapper}>
            <AppHeader title={en.Headings.FindAcc} onBackPress={() => navigation.goBack()} />

            <KeyboardAvoidingView
                style={{ flex: 1, }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    keyboardDismissMode='interactive'
                    keyboardShouldPersistTaps='handled'
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View style={styles.header}>
                        <LargeText text={en.SignIn.resetPass} />
                        <NormalText text={en.SignIn.pleaseEnterPhone} customStyle={{ textAlign: 'center', marginTop: 10 }} />
                    </View>
                    <View style={styles.phoneInput}>
                        <View>
                        <AppInput keyboardType='email-address' value={email} onChangeText={setEmail} placeholder={en.Inputs.email} error={!validEmail} />
                        {!validEmail && <SmallText text={en.Validations.emailError} customStyle={{ color: AppColors.red, left: 20 }} />}
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.btnView}>
                    <AppButton text={en.Buttons.sendCode} onPress={forgotPassword} colors={disabled ? [AppColors.disabled, AppColors.disabled] : [AppColors.lightBlue, AppColors.darkBlue]} customStyle={{ borderWidth: 0 }} txtStyle={{ color: AppColors.white }} disabled={disabled} />
                </View>
            </KeyboardAvoidingView>
            {isloading && <AppLoader/>}
        </SafeAreaView>
    )
}

export default ForgortPasswordScreen