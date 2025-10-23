import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppColors } from "../../../assets/colors/AppColors";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
        justifyContent: 'space-between'
    },
    header: {
        width: wp(85),
        alignItems: "center",
        alignSelf: "center",
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    inputs: {
        flex: 1,
        marginVertical: 15,
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    validations: {
        flex: 1,
        marginVertical: 15,
        marginHorizontal: 25,
        // backgroundColor: 'red'
    },
    btnView: {
        alignItems: "center",
        marginBottom: 15
    }
})