import { StyleSheet } from "react-native";
import { AppColors } from "../../assets/colors/AppColors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppFonts } from "../../constants/AppFonts";

export const styles = StyleSheet.create({
    inputStyle: {
        width: wp(13),
        color: AppColors.black,
        borderRadius: 16,
        height: 50,
        fontSize: 16,
        fontFamily: AppFonts.GeneralSans.medium,
        // paddingHorizontal: 12,
        textAlign: 'center'
    },
    container: {
        width: wp(13),
        borderRadius: 16,
        borderWidth: 1,
        borderColor: AppColors.borderColor,
        height: 50,
        marginVertical: 5
    },
    searhInputContainer: {
        flexDirection: "row",
        height: 50,
        borderRadius: 10,
        borderColor: AppColors.borderColor,
        borderWidth: 0.75,
        paddingHorizontal: 12,
        alignItems: "center",
    },
    searchInput: {
        flex: 1,
        height: 50,
        marginHorizontal: 8,
        color: AppColors.black,
    },
    closeButtonContainer: {
        width: 18,
        height: 18,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        borderWidth: 0.75,
        borderColor: AppColors.borderColor,
    },
    closeIcon: {
        width: 9,
        height: 9,
        resizeMode: 'contain'
    },
    closeBtnContainer: {
        width: 30,
        height: 30,
        marginRight: -5,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
