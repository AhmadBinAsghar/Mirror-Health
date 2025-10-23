import { Platform, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppColors } from "../../../../assets/colors/AppColors";

export const styles = StyleSheet.create({
    wrapper: {
        flex: Platform.OS == 'ios' ? 0 : 1,
        backgroundColor: AppColors.white,
    },
    Navs: {
        flex: 1,
        padding: 20,
        backgroundColor: AppColors.background,
    },
    NavOptions: {
        flex: 1,
        backgroundColor: AppColors.white,
        borderWidth: 1,
        borderColor: AppColors.borderColor,
        borderRadius: 16,
        marginTop: 10,
        marginBottom: 18,
        overflow: "hidden",
    },
    NavItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    seperator: {
        flex: 1,
        height: 1,
        backgroundColor: AppColors.borderColor,
    },
    genderView: {
        flexDirection: 'row',
        width: wp(85),
        height: hp(7),
        padding: 2,
        marginTop: 10,
        marginBottom: 25,
        borderRadius: 12,
        backgroundColor: AppColors.dimGrey,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: "space-between"
    },
    genderBtn: {
        width: wp(40), height: hp(6.3),
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileView: {
        width: wp(85),
        alignSelf: "center",
        justifyContent: "center",
        alignItems: 'center'
    },
    avatr: {
        width: wp(21),
        height: hp(10),
        borderRadius: 100,
        borderWidth: 0.7,
        borderColor: AppColors.borderColor,
        // backgroundColor: 'red',
        alignSelf: "center"
    },
    JoinedDate: {
        flexDirection: "row",
        paddingVertical: 2,
        paddingHorizontal: 5,
        marginVertical: 3,
        borderRadius: 50,
        backgroundColor: AppColors.lighGrey
    },
    ageView: {
        width: wp(60),
        flexDirection: "row",
        justifyContent: 'space-around',
        marginVertical: 10
    },
    age: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    interests: {
        width: wp(85),
        borderWidth: 1,
        borderColor: AppColors.borderColor,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        padding: 12,
    },
    interestItems: {
        width: wp(85),
        alignItems: "center",
        justifyContent: 'space-between',
    },
    iconView: {
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 25,
        borderRadius: 100,
        marginHorizontal: 3,
        marginVertical: 4,
        backgroundColor: AppColors.white
    },
    interestcont: {
        width: wp(85),
        paddingHorizontal: 16,
        alignSelf: "center",
        overflow: 'hidden',
        borderRadius: 20,
    },
});