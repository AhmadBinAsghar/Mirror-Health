import { Image, Keyboard, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AppImages } from '../../assets/images/AppImages'
import { AppColors } from '../../assets/colors/AppColors'
import LargeText from '../AppText/LargeText'
import NormalText from '../AppText/NormalText'
import SmallText from '../AppText/SmallText'
import AppButton from '../Button/AppButton'
import en from '../../../translation/en.json';
import AppInput from '../TextInput/AppInput'
import Helper from '../../utilis/Helper'

interface Decline {
    onDelete: CallableFunction
    onClose: CallableFunction
    visible: boolean
}
const DeleteAccountModal = ({ visible, onClose, onDelete }: Decline) => {
    // const [password, setPassword] = React.useState<string>('');
    // const [hidePass, setHidePass] = React.useState<boolean>(false);
    const [disabled, setDisabled] = React.useState<boolean>(false);
    const [isKeyboardVisible, setKeyboardVisible] = React.useState<boolean>(false);
    // const [validPass, setValidPass] = React.useState<boolean>(true);

    // React.useEffect(() => {
    //     if (password.length != 0) {
    //         if (Helper.isValidPassword(password)) {
    //             setValidPass(true)
    //             setDisabled(false);
    //         } else {
    //             setValidPass(false)
    //             setDisabled(true);
    //         }
    //     } else {
    //         setValidPass(true)
    //         setDisabled(true);
    //     }
    // }, [password])

    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <Modal
            isVisible={visible}
            onBackButtonPress={() => onClose && onClose()}
            onBackdropPress={() => onClose && onClose()}
            hasBackdrop={true}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            backdropTransitionInTiming={0}
            backdropTransitionOutTiming={0}
            style={{ zIndex: 999, margin: 0, justifyContent: 'center' }}
        >
            <View style={[styles.container, styles.boxShadow, { marginBottom: isKeyboardVisible ? 80 : 0 }]}>
                <LargeText text={en.Modals.DeleteAccount} customStyle={{ fontSize: 20 }} />
                <SmallText text={en.Modals.SureToDeleteAcc} customStyle={{ marginTop: 6 }} />
                {/* <AppInput isPassword secureTextEntry={hidePass} hidePass={() => setHidePass(!hidePass)} value={password} onChangeText={setPassword} placeholder={en.Inputs.password} error={!validPass} containerStyle={{ width: wp(74), marginTop: 20, marginBottom: 0 }} customStyle={{ width: wp(56) }} />
                {!validPass && <SmallText text={en.Validations.passError} customStyle={{ color: AppColors.red, left: 12 }} />} */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <AppButton text={en.Buttons.cancel} onPress={() => { onClose() }} customStyle={{ width: wp(36), height: 50 }} containerStyle={{ width: wp(36), height: 50 }} />
                    <AppButton disabled={disabled} text={en.Buttons.Confirm} onPress={() => { onClose(), onDelete && onDelete() }} colors={disabled ? [AppColors.disabled, AppColors.disabled] : [AppColors.lightBlue, AppColors.darkBlue]} txtStyle={{ color: AppColors.white }} customStyle={{ borderWidth: 0, width: wp(36), height: 50 }} containerStyle={{ width: wp(36), height: 50 }} />
                </View>
            </View>
        </Modal>
    )
}
export default DeleteAccountModal

const styles = StyleSheet.create({
    container: {
        width: wp(85),
        backgroundColor: AppColors.white,
        borderRadius: 24,
        padding: 20,
        alignSelf: "center",
    },
    boxShadow: {
        shadowOffset: { width: -2, height: 0 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    topNav: {
        flexDirection: 'row',
        width: wp(94),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    icon: {
        width: 30,
        height: 30
    },
    btnView: {
        width: wp(85),
        alignSelf: "center",
        justifyContent: 'space-between',
        marginVertical: 10
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp(85),
        alignSelf: "center",
        marginVertical: 10
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    }

})