import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { AppFonts } from '../../../../constants/AppFonts'
import AppHeader from '../../../../components/Header/AppHeader'
import { useNavigation } from '@react-navigation/native'
import en from '../../../../../translation/en.json';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LargeText from '../../../../components/AppText/LargeText'
import NormalText from '../../../../components/AppText/NormalText'
import AppInput from '../../../../components/TextInput/AppInput'
import AppButton from '../../../../components/Button/AppButton'
import { AppColors } from '../../../../assets/colors/AppColors'
import Helper from '../../../../utilis/Helper'
import SmallText from '../../../../components/AppText/SmallText'
import { useSelector } from 'react-redux'
import { API_REQUEST } from '../../../../network/NetworkRequest'
import { endPoints } from '../../../../network/endPoints'

const ChangeEmail = () => {
    const UserData = useSelector((state: any) => state.userData.userData);
    const navigation: any = useNavigation();
    const [email, setEmail] = React.useState<string>('');
    const [confirmEmail, setConfirmEmail] = React.useState<string>('');
    const [disabled, setDisabled] = React.useState<boolean>(true);
    const [validEmail, setValidEmail] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (email.length != 0) {
            if (Helper.isValidEmail(email)) {
                setValidEmail(true)
            } else {
                setValidEmail(false)
            }
        }
    }, [email])
    React.useEffect(() => {
        if (email.length != 0 && validEmail && email === confirmEmail) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [email, confirmEmail, validEmail])

    const updateEmail = async () => {
        const method = 'POST';
        const data = {
            userId: UserData?.userId,
            new_email: email,
            confirm_email: confirmEmail
        };
        API_REQUEST(method, endPoints.updateEmail, data,
            (async (success: any) => {
                Helper.showToast(success?.message)
                console.log(success);
                navigation.goBack();
            }),
            ((error: any) => {
                Helper.showToast(error)
                console.log(error);
            }))
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <AppHeader title={en.Headings.ChangeEmail} onBackPress={() => { navigation.goBack() }} />

            <KeyboardAvoidingView
                style={{ flex: 1, }}
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
                            <LargeText text={en.ChangeEmail.CreateEmail} />
                            <NormalText text={en.ChangeEmail.description} customStyle={{ textAlign: 'center', marginTop: 10 }} />
                        </View>
                        <View style={styles.Inputs}>
                            <AppInput error={!validEmail} placeholder={en.Inputs.Newemail} value={email} onChangeText={setEmail} keyboardType='email-address' />
                            {!validEmail && <SmallText text={en.Validations.emailError} customStyle={{ color: AppColors.red }} />}
                            <AppInput placeholder={en.Inputs.Confirmemail} value={confirmEmail} onChangeText={setConfirmEmail} keyboardType='email-address' />
                        </View>
                    </View>
                    <View style={styles.btnView}>
                        <AppButton disabled={disabled} text={en.Buttons.Save} onPress={updateEmail} colors={disabled ? [AppColors.disabled, AppColors.disabled] : [AppColors.lightBlue, AppColors.darkBlue]} customStyle={{ borderWidth: 0 }} txtStyle={{ color: AppColors.white }} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChangeEmail