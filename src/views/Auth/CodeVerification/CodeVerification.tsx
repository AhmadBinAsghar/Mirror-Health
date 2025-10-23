import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import AppHeader from '../../../components/Header/AppHeader'
import { useNavigation, useRoute } from '@react-navigation/native'
import LargeText from '../../../components/AppText/LargeText'
import NormalText from '../../../components/AppText/NormalText'
import AppCodeInput from '../../../components/CodeInput/AppCodeInput'
import SmallText from '../../../components/AppText/SmallText'
import { AppColors } from '../../../assets/colors/AppColors'
import { AppFonts } from '../../../constants/AppFonts'
import AppButton from '../../../components/Button/AppButton'
import { AppRoutes } from '../../../constants/AppRoutes'
import { SafeAreaView } from 'react-native-safe-area-context'
import en from "../../../../translation/en.json";
import { API_REQUEST } from '../../../network/NetworkRequest'
import { endPoints } from '../../../network/endPoints'
import AppLoader from '../../../components/AppLoader/AppLoader'
import { useSelector } from 'react-redux'
import Helper from '../../../utilis/Helper'

const CodeVerification = () => {
    const UserData = useSelector((state: any) => state.userData.userData);
    const navigation: any = useNavigation();
    const route: any = useRoute();
    const email = route?.params?.email;
    const reset = route?.params?.reset;
    const [disabled, setDisabled] = React.useState<boolean>(true);
    const [error, setError] = React.useState<boolean>(false);
    const [errorText, setErrorText] = React.useState<string>('');
    const [timer, setTimer] = React.useState<number>(59);
    const [isloading, setIsLoading] = React.useState<boolean>(false);

    const [code, setCode] = React.useState(['', '', '', '', '', '']);
    const inputRefs: any = React.useRef([]);

    const verifyOTP = () => {
        Keyboard.dismiss();
        setIsLoading(true);
        const data = {
            userId: UserData?._id,
            email: email,
            otp: code?.join(''),
        }
        try {
            API_REQUEST("POST", endPoints.verifyOTP, data,
                ((sucess: any) => {
                    setIsLoading(false);
                    console.log(sucess)
                    !reset ? Helper.resetAndGo(navigation, AppRoutes.PasswordCreation) : navigation.navigate(AppRoutes.NewPassword, { email: email })
                }),
                ((error: any) => {
                    setIsLoading(false);
                    setErrorText(error ?? en.Validations.correctCode)
                    setError(true);
                    // Helper.showToast(error)
                })
            )
        } catch (e) {
            setIsLoading(false);
        }
    }
    const resendOTP = () => {
        setIsLoading(true);
        const data = {
            email: email,
        }
        try {
            API_REQUEST("POST", endPoints.sendOTP, data,
                ((sucess: any) => {
                    setIsLoading(false);
                    setTimer(59)
                }),
                ((error: any) => {
                    setIsLoading(false);
                    setError(true);
                    Helper.showToast(error)
                })
            )
        } catch (e) {
            setIsLoading(false);
        }
    }
    const handleChange = (text: any, index: number,) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text.length === 1 && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };
    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    React.useEffect(() => {
        if (code.join('').length === 6) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [code]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timer > 0) {
                setTimer(prevSeconds => prevSeconds - 1);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timer]);

    return (
        <SafeAreaView
            style={styles.wrapper}>
            <AppHeader title={en.Headings.AccConfirmation} />
            <KeyboardAvoidingView
                style={{ flex: 1, }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    keyboardDismissMode='interactive'
                    keyboardShouldPersistTaps='handled'
                    overScrollMode='never'
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
                >
                    <View>
                        <View style={styles.header}>
                            <LargeText text={en.SignUp.enterCode} />
                            <NormalText
                                text={`${en.SignUp.ToConfirmAcc} ${email}`}
                                customStyle={{ textAlign: "center", marginVertical: 5 }}
                            />
                        </View>
                        <View style={styles.codeInputs}>
                            {code.map((value, index) => (
                                <AppCodeInput key={index} keyboardType="number-pad" maxLength={1} error={error} onKeyPress={(e: any) => handleKeyPress(e, index)} inputRef={(ref: any) => (inputRefs.current[index] = ref)} value={value} onChangeText={(text: string) => handleChange(text, index)}
                                />
                            ))}
                        </View>
                        <View style={styles.timerSection}>
                            {error && <SmallText text={errorText ?? ""} customStyle={{ color: AppColors.red, textAlign: "center" }} />}
                            <View style={styles.timer} >
                                <NormalText text={en.SignUp.SendConfirmation} />
                                <TouchableOpacity disabled={timer <= 0 ? false : true} onPress={() => { timer <= 0 && resendOTP() }}>
                                    <NormalText text={timer <= 0 ? `${en.SignUp.SendAgain}` : `0:${timer}`} customStyle={{ color: AppColors.blue, fontFamily: AppFonts.GeneralSans.medium }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.btnView}>
                        <AppButton text={en.Buttons.continue} disabled={disabled} onPress={verifyOTP}
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

export default CodeVerification