import { StyleSheet } from "react-native";
import { AppColors } from "../../../assets/colors/AppColors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
        justifyContent: 'space-between'
    },
})