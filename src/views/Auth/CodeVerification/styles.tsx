import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppColors } from "../../../assets/colors/AppColors";
import { AppFonts } from "../../../constants/AppFonts";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
        justifyContent: 'space-between'
    },
    header: {
        width: wp(85),
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    codeInputs: {
        flexDirection: "row",
        width: wp(85),
        height: hp(8),
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timerSection: {
        width: wp(85),
        height: hp(15),
        // backgroundColor: "red",
        alignSelf: "center"
    },
    timer: {
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: "row"
    },
    btnView: {
        alignItems: "center",
        marginBottom: 10
    }

})