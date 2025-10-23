import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppColors } from "../../../assets/colors/AppColors";
import { AppFonts } from "../../../constants/AppFonts";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: "center",
        alignSelf: "center",
        justifyContent: 'center',
        marginTop: 20,
    },
    inputs: {
        width: wp(85),
        alignSelf: "center",
        justifyContent: 'center',
        marginVertical: 15,
        alignItems: 'flex-start',
        // backgroundColor: 'red'
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
        backgroundColor: AppColors.white
    },
    PhoneInput: {
        paddingRight: wp(7),
        color: AppColors.black,
        fontFamily: AppFonts.GeneralSans.medium
    },
    Checks: {
        // flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        width: wp(85),
        marginVertical: 5
    },
    checkboxs: {
        width: 20,
        height: 20
    },
    btnView: {
        alignItems: "center",
        marginBottom: 10,
    }
})