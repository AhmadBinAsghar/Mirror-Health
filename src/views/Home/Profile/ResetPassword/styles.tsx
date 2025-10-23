import { StyleSheet } from "react-native";
import { AppColors } from "../../../../assets/colors/AppColors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
    header: {
        width: wp(85),
        height: hp(13),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    Inputs: {
        width: wp(85),
        alignSelf: "center",
        // alignItems: "center",
        justifyContent: "center",
        marginVertical: 20
    },
    btnView: {
        width: wp(85),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
})