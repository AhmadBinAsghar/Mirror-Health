import { Platform, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppColors } from "../../../assets/colors/AppColors";

export const styles = StyleSheet.create({
    wrapper: {
        flex: Platform.OS == 'ios' ? 0 : 1,
        backgroundColor: AppColors.background
    },
    header: {
        flexDirection: "row",
        width: wp(85),
        height: hp(7),
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "space-between"
    },
    notiIcon: {
        width: 18,
        height: 18
    },
    members: {
        width: wp(85),
        height: 90,
        alignSelf: "center",
        alignItems: "center",
        // backgroundColor: "red",
    },
    memberItem: {
        backgroundColor: AppColors.background,
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 15,
        padding: 2,
    },
    memberImage: {
        borderRadius: 12,
        borderWidth: 0.8,
        borderColor: AppColors.borderColor
    },
    body: {
        flex: 1,
        backgroundColor: AppColors.white,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingTop: 20,
    },
    greetings: {
        flexDirection: "row",
        width: wp(85),
        alignSelf: "center",
        flexWrap: 'wrap'
    },
    alertIcon: {
        width: 22,
        height: 22,
        position: "absolute",
        bottom: -5,
        right: -5,
        backgroundColor: AppColors.white,
        borderRadius: 100
    },
    Status: {
        width: wp(85),
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderWidth: 1,
        borderColor: AppColors.borderColor,
        borderRadius: 16,
        marginVertical: 16
    }
})