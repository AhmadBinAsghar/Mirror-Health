import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import AppHeader from '../../../../components/Header/AppHeader'
import en from '../../../../../translation/en.json';
import { useNavigation } from '@react-navigation/native'
import AppButton from '../../../../components/Button/AppButton'
import { AppColors } from '../../../../assets/colors/AppColors'
import LargeText from '../../../../components/AppText/LargeText'
import NormalText from '../../../../components/AppText/NormalText'
import AppInput from '../../../../components/TextInput/AppInput'
import SmallText from '../../../../components/AppText/SmallText'
import Helper from '../../../../utilis/Helper'
import { useSelector } from 'react-redux'
import { API_REQUEST } from '../../../../network/NetworkRequest'
import { endPoints } from '../../../../network/endPoints'

const ResetPassword = () => {
    const UserDetails = useSelector((state: any) => state.userData.userDetails);
    const navigation: any = useNavigation();
    const [disabled, setDisabled] = React.useState<boolean>(true);
    const [password, setPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');
    const [hidePassword, setHidePassword] = React.useState<boolean>(true);
    const [hideConfirmPassword, setHideConfirmPassword] = React.useState<boolean>(true);
    const [validpassword, setValidPassword] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (password.length != 0) {
            if (Helper.isValidPassword(password)) {
                setValidPassword(true)
            } else {
                setValidPassword(false)
            }
        } else {
            setValidPassword(true)
        }
    }, [password])

    React.useEffect(() => {
        if (password.length != 0 && validpassword && password === confirmPassword) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [password, confirmPassword, validpassword])


    const updatePass = async () => {
        const method = 'POST';
        const data = {
            userId: UserDetails?.userId,
            new_password: password,
            confirm_password: confirmPassword
        };
        API_REQUEST(method, endPoints.updatePassword, data,
            (async (success: any) => {
                Helper.showToast(success?.message)
                navigation.goBack();
            }),
            ((error: any) => {
                Helper.showToast(error)
                console.log(error);
            }))
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <AppHeader title={en.Headings.ResetPassword} onBackPress={() => { navigation.goBack() }} />

            <KeyboardAvoidingView
                style={{ flex: 1, }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
                    keyboardDismissMode='interactive'
                    keyboardShouldPersistTaps='handled'
                    overScrollMode='never'
                >
                    <View>
                        <View style={styles.header}>
                            <LargeText text={en.ResetPass.CreatePass} />
                            <NormalText text={en.ResetPass.description} customStyle={{ textAlign: "center", marginTop: 10 }} />
                        </View>
                        <View style={styles.Inputs}>
                            <AppInput error={!validpassword} placeholder={en.Inputs.Newpassword} value={password} onChangeText={setPassword} isPassword secureTextEntry={hidePassword} hidePass={() => { setHidePassword(!hidePassword) }} />
                            {!validpassword && <SmallText text={en.Validations.passError} customStyle={{ color: AppColors.red }} />}
                            <AppInput placeholder={en.Inputs.confirmPass} value={confirmPassword} onChangeText={setConfirmPassword} isPassword secureTextEntry={hideConfirmPassword} hidePass={() => { setHideConfirmPassword(!hideConfirmPassword) }} />
                        </View>
                    </View>
                    <View style={styles.btnView}>
                        <AppButton disabled={disabled} text={en.Buttons.Save} onPress={updatePass} colors={disabled ? [AppColors.disabled, AppColors.disabled] : [AppColors.lightBlue, AppColors.darkBlue]} customStyle={{ borderWidth: 0 }} txtStyle={{ color: AppColors.white }} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ResetPassword