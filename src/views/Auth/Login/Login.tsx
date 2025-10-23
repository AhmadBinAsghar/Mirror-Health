import { View, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React from 'react'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AppHeader from '../../../components/Header/AppHeader'
// import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import LargeText from '../../../components/AppText/LargeText'
import NormalText from '../../../components/AppText/NormalText'
import AppInput from '../../../components/TextInput/AppInput'
import { AppColors } from '../../../assets/colors/AppColors'
import SmallText from '../../../components/AppText/SmallText'
import Helper from '../../../utilis/Helper'
import AppButton from '../../../components/Button/AppButton'
import { AppImages } from '../../../assets/images/AppImages'
import { AppFonts } from '../../../constants/AppFonts'
import { AppRoutes } from '../../../constants/AppRoutes'
import en from '../../../../translation/en.json';
import { useDispatch } from 'react-redux'
import { accessToken, userDataSave, userDetailsSave } from '../../../redux/Slices/userDataSlice'
import { API_REQUEST } from '../../../network/NetworkRequest'
import { endPoints } from '../../../network/endPoints'
import AppLoader from '../../../components/AppLoader/AppLoader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { appKeys } from '../../../network/AppKeys'

const Login = ({ navigation }: any) => {
  // const navigation: any = useNavigation();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [hidePassword, setHidePassword] = React.useState<boolean>(true);
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [validEmail, setValidEmail] = React.useState<boolean>(true);
  const [validPass, setValidPass] = React.useState<boolean>(true);
  const [remenberMe, setRememberMe] = React.useState<boolean>(false);
  const [isloading, setIsloading] = React.useState<boolean>(false);
  const dispatch = useDispatch();

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
  // React.useEffect(() => {
  //   if (password?.length != 0) {
  //     if (Helper.isValidPassword(password)) {
  //       setValidPass(true)
  //     } else {
  //       setValidPass(false)
  //     };
  //   };
  // }, [password])

  React.useEffect(() => {
    if (email && validEmail && password.length > 7) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [validEmail, password, email])

  const loginUser = async () => {
    Keyboard.dismiss();
    setIsloading(true);
    const method = 'POST';
    const data = {
      email: email,
      password: password,
      rememberMe: remenberMe
    };
    API_REQUEST(method, endPoints.loginUser, data,
      (async (success: any) => {
        dispatch(userDataSave(success?.data));
        if (success?.data?.calibrationStatus === false && success?.data?.userProfileCreated === false) {
          navigation.navigate(AppRoutes.Onboarding, { step: 0 });
          dispatch(userDetailsSave({ calibration: false, token: success?.accessToken }))
        } else if (success?.data?.calibrationStatus === false && success?.data?.userProfileCreated === true) {
          navigation.navigate(AppRoutes.Onboarding, { step: 4 });
          dispatch(userDetailsSave({ calibration: false, token: success?.accessToken }))
        } else if (success?.data?.calibrationStatus === true && success?.data?.userProfileCreated === true) {
          dispatch(userDetailsSave({ calibration: true }));
          dispatch(accessToken(success?.accessToken));
          // setTimeout(() => {
          //   dispatch(userDetailsSave({ calibration: true }));
          // navigation.navigate(AppRoutes.HomeStack);
          // Helper.resetAndGo(navigation, AppRoutes.HomeStack);
          // }, 1000);
        }
        // success?.data?.calibrationStatus === false ? (navigation.navigate(AppRoutes.Onboarding), dispatch(userDetailsSave({ calibration: false }))) : dispatch(accessToken(success?.accessToken));
        await AsyncStorage.setItem(appKeys.sessionToken, success?.accessToken)
        setIsloading(false);
      }),
      ((error: any) => {
        Helper.showToast(error);
        setIsloading(false);
      }))
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <AppHeader title={en.Headings.Signin} onBackPress={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={{ flex: 1, }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardDismissMode='interactive'
          keyboardShouldPersistTaps='handled'>
          <View style={styles.header}>
            <LargeText text={en.SignIn.SigninToVera} />
            <NormalText text={en.SignIn.UseEmail} customStyle={{ marginTop: 5 }} />
          </View>
          <View style={styles.inputs}>
            <AppInput keyboardType='email-address' value={email} onChangeText={setEmail} placeholder={en.Inputs.email} error={!validEmail} />
            {!validEmail && <SmallText text={en.Validations.emailError} customStyle={{ color: AppColors.red, left: 20 }} />}
            <AppInput isPassword secureTextEntry={hidePassword} hidePass={() => setHidePassword(!hidePassword)} value={password} onChangeText={setPassword} placeholder={en.Inputs.password} error={!validPass} />
            {!validPass && <SmallText text={en.Validations.passError} customStyle={{ color: AppColors.red, left: 20 }} />}

          </View>

          <View style={styles.rememberView}>
            <TouchableOpacity hitSlop={10} onPress={() => setRememberMe(!remenberMe)} activeOpacity={1} style={styles.remember}>
              <Image source={remenberMe ? AppImages.checkBoxTrue : AppImages.checkBoxFalse} resizeMode='contain' style={styles.checkboxs} />
              <SmallText text={en.SignIn.remember} customStyle={{ color: AppColors.placeholderColor, paddingLeft: 6 }} />
            </TouchableOpacity>

            <TouchableOpacity hitSlop={10} onPress={() => { navigation.navigate(AppRoutes.ForgotPassword) }} activeOpacity={1} style={styles.remember}>
              <SmallText text={en.SignIn.ForgotPass} customStyle={{ color: AppColors.blue, fontFamily: AppFonts.GeneralSans.medium }} />
            </TouchableOpacity>
          </View>

          <View style={styles.btnView}>
            <AppButton disabled={disabled} text={en.Buttons.login} onPress={loginUser} colors={disabled ? [AppColors.disabled, AppColors.disabled] : [AppColors.lightBlue, AppColors.darkBlue]} txtStyle={{ color: AppColors.white }} customStyle={{ borderWidth: 0 }} />
          </View>

        </ScrollView>

        <View style={styles.navView}>
          <NormalText text={en.SignIn.dontHaveAccount} />
          <TouchableOpacity hitSlop={10} onPress={() => navigation.navigate(AppRoutes.SignUp)} activeOpacity={1} >
            <NormalText text={en.Buttons.signUp} customStyle={{ color: AppColors.blue, fontFamily: AppFonts.GeneralSans.medium }} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {isloading && <AppLoader />}
    </SafeAreaView>
  )
}

export default Login