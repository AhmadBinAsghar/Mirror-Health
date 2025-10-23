import { StyleSheet } from "react-native";
import { AppColors } from "../../../assets/colors/AppColors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppFonts } from "../../../constants/AppFonts";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
        justifyContent: 'space-between'
    },
    header: {
        width: wp(85),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    phoneInput: {
        width: wp(85),
        height: hp(12),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    PhoneContainer: {
        width: wp(85),
        height: 55,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: AppColors.borderColor,
        borderRadius: 16
    },
    PhoneFlagContainer: {
        paddingVertical: 0,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        backgroundColor: AppColors.white,
    },
    PhoneInput: {
        color: AppColors.black,
        fontFamily: AppFonts.GeneralSans.medium
    },
    btnView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    }
})