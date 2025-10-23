import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AppHeader from '../../../components/Header/AppHeader'
import { useNavigation } from '@react-navigation/native'
import LargeText from '../../../components/AppText/LargeText'
import NormalText from '../../../components/AppText/NormalText'
import AppInput from '../../../components/TextInput/AppInput'
import PassValidater from '../../../components/PassValidator/PassValidater'
import AppButton from '../../../components/Button/AppButton'
import { AppRoutes } from '../../../constants/AppRoutes'
import { AppColors } from '../../../assets/colors/AppColors'
import { SafeAreaView } from 'react-native-safe-area-context'
import en from '../../../../translation/en.json';
import { API_REQUEST } from '../../../network/NetworkRequest'
import { endPoints } from '../../../network/endPoints'
import { useSelector } from 'react-redux'
import AppLoader from '../../../components/AppLoader/AppLoader'
import Helper from '../../../utilis/Helper'

const PasswordCreation = () => {
    const navigation: any = useNavigation();
    const UserData = useSelector((state: any) => state.userData.userData);
    const [password, setPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');
    const [hidePassword, setHidePassword] = React.useState<boolean>(true);
    const [hideConfirmPassword, setHideConfirmPassword] = React.useState<boolean>(true);
    const [disabled, setdisabled] = React.useState<boolean>(true);
    const [OneDigit, setOneDigit] = React.useState<boolean>(false);
    const [length8, setlenght8] = React.useState<boolean>(false);
    const [OneSpecial, setOneSpecial] = React.useState<boolean>(false);
    const [OneLower, setOneLower] = React.useState<boolean>(false);
    const [OneUpper, setOneUpper] = React.useState<boolean>(false);
    const [isloading, setIsLoading] = React.useState<boolean>(false);

    const createPass = () => {
        Keyboard.dismiss();
        setIsLoading(true);
        const data = {
            email: UserData?.email,
            password: password,
            password_confirmation: confirmPassword
        }
        try {
            API_REQUEST("POST", endPoints.createPass, data,
                ((sucess: any) => {
                    setIsLoading(false);
                    Helper.resetAndGo(navigation, AppRoutes.CompleteRegisteration)
                }),
                (error: any) => {
                    setIsLoading(false);
                    Helper.showToast(error)
                    console.log(error)
                }
            )
        } catch (e) {
            setIsLoading(false);
            console.log(e)
        }
    }
    React.useEffect(() => {
        if (password.match(`[!"#$%&'*+,./:;<=>?@\\^_{|}~-]`)) {
            setOneSpecial(true)
        } else {
            setOneSpecial(false)
        }
    }, [password])
    React.useEffect(() => {
        if (password.match(`[A-Z]`)) {
            setOneUpper(true)
        } else {
            setOneUpper(false)
        }
    }, [password])
    React.useEffect(() => {
        if (password.match(`[a-z]`)) {
            setOneLower(true)
        } else {
            setOneLower(false)
        }
    }, [password])
    React.useEffect(() => {
        if (password.match(`[0-9]`)) {
            setOneDigit(true)
        } else {
            setOneDigit(false)
        }
    }, [password])
    React.useEffect(() => {
        if (password.length > 7) {
            setlenght8(true)
        } else {
            setlenght8(false)
        }
    }, [password])

    React.useEffect(() => {
        if (OneDigit && OneSpecial && OneLower && OneUpper && length8 && password === confirmPassword) {
            setdisabled(false);
        } else {
            setdisabled(true);
        }
    }, [OneDigit, OneSpecial, OneLower, OneUpper, length8, password, confirmPassword])
    return (
        <SafeAreaView
            style={styles.wrapper}>
            <AppHeader title={en.Headings.PasswordCreation} />

            <KeyboardAvoidingView
                style={{ flex: 1, }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    overScrollMode='never'
                    keyboardDismissMode='interactive'
                    keyboardShouldPersistTaps='handled'
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
                >
                    <View>
                        <View style={styles.header}>
                            <LargeText text={en.SignUp.CreatePass} />
                            <NormalText text={en.SignUp.pleaseCreatePass} customStyle={{ textAlign: 'center', marginTop: 10 }} />
                        </View>
                        <View style={styles.inputs}>
                            <AppInput isPassword secureTextEntry={hidePassword} hidePass={() => setHidePassword(!hidePassword)} value={password} onChangeText={setPassword} placeholder={en.Inputs.createPass} />
                            <AppInput isPassword secureTextEntry={hideConfirmPassword} hidePass={() => setHideConfirmPassword(!hideConfirmPassword)} value={confirmPassword} onChangeText={setConfirmPassword} placeholder={en.Inputs.confirmPass} />
                        </View>
                        <View style={styles.validations}>
                            <PassValidater valid={OneDigit} text={en.Validations.oneDigit} />
                            <PassValidater valid={length8} text={en.Validations.eightSymbols} />
                            <PassValidater valid={OneSpecial} text={en.Validations.oneSpecial} />
                            <PassValidater valid={OneLower} text={en.Validations.lowerCase} />
                            <PassValidater valid={OneUpper} text={en.Validations.upperCase} />
                        </View>
                    </View>
                    <View style={styles.btnView}>
                        <AppButton text={en.Buttons.continue} disabled={disabled} onPress={createPass}
                            txtStyle={{ color: AppColors.white }}
                            colors={disabled ? [AppColors.disabled, AppColors.disabled] : [AppColors.lightBlue, AppColors.darkBlue]}
                            customStyle={{ borderWidth: 0 }}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {isloading && <AppLoader />}
        </SafeAreaView>
    )
}

export default PasswordCreation