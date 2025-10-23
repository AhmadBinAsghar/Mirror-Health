import { Platform, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppColors } from "../../../assets/colors/AppColors";
import { AppConstants } from "../../../constants/AppConstants";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
        paddingTop: AppConstants.topInsets,
    },
    header: {
        width: wp(85),
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 15,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: Platform.OS == 'ios' ? AppConstants.bottomInsets : 0,
    },
    btnsView: {
        flex: 1,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 10
    },
    ORSection: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    Seperater: {
        height: 1,
        width: wp(34),
        marginVertical: 15,
        backgroundColor: AppColors.borderColor
    },
    login: {
        flexDirection: 'row',
        marginVertical: 15
    }
})