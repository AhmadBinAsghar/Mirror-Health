import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppColors } from "../../../../assets/colors/AppColors";

export const styles = StyleSheet.create({
    header: {
        height: wp(50),
        // backgroundColor: "red",
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    progresDetails: {
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
    },
    ViewMore: {
        flexDirection: "row",
        width: wp(90),
        alignItems: "center",
        justifyContent: 'space-around',
        backgroundColor: AppColors.white,
        alignSelf: "center",
        borderRadius: 100,
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginVertical: 20
    },
    VertSeperater: {
        width: 1,
        height: 18,
        backgroundColor: AppColors.borderColor,
        marginHorizontal: 10,
    },
    DetailsView: {
        flex: 1,
        backgroundColor: AppColors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        // paddingLeft: 20
    },
    recoView: {
        width: wp(70),
        backgroundColor: AppColors.background,
        padding: 20,
        marginVertical: 20,
        marginRight: 20,
        borderRadius: 16
    },
    seperater: {
        width: wp(100),
        alignSelf: "center",
        height: 2,
        backgroundColor: AppColors.borderColor,
        marginVertical: 6
    },
    DateView: {
        width: wp(88),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
    },
    genderView: {
        flexDirection: 'row',
        width: wp(66),
        height: hp(6),
        padding: 2,
        borderRadius: 12,
        backgroundColor: AppColors.dimGrey,
        alignItems: 'center',
        justifyContent: "space-between"
    },
    genderBtn: {
        width: wp(21), height: hp(5.3),
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center'
    },
    DateBtn: {
        width: wp(20), height: hp(6),
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        paddingHorizontal: 8,
        borderColor: AppColors.borderColor
    },
    clnder: {
        width: wp(88),
        marginTop: 6,
        borderWidth: 1,
        borderColor: AppColors.borderColor,
        borderRadius: 16,
        padding: 10,
        alignSelf: "center",
    },
    calnderFooter: {
        width: wp(88),
        height: hp(7),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: AppColors.blue,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: -10
    }
})