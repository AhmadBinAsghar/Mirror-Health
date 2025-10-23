import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppColors } from "../../../../assets/colors/AppColors";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
    btnView: {
        alignItems: "center",
        justifyContent: "center"
    },
    langView: {
        flexDirection: 'row',
        width: wp(85),
        alignSelf: 'center',
        marginVertical: 5,
        paddingHorizontal: 15,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: "space-between",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: AppColors.borderColor
    },
    nameView: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center"
    },
    icon: {
        width: 20,
        height: 20,
    }
})