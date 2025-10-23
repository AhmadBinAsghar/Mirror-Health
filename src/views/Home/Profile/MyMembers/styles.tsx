import { StyleSheet } from "react-native";
import { AppColors } from "../../../../assets/colors/AppColors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppFonts } from "../../../../constants/AppFonts";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
    memberView: {
        width: wp(85),
        alignSelf: "center",
        flexDirection: 'row',
        paddingVertical: 20,
        alignItems: 'center',
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: AppColors.borderColor
    },
    detailView: {
        width: wp(48),
        paddingHorizontal: 10,
    },
    inviteBadge: {
        marginHorizontal: 6,
        fontSize: 10,
        fontFamily: AppFonts.GeneralSans.medium,
        color: AppColors.green,
        backgroundColor: AppColors.success,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    icon: {
        width: 20,
        height: 20,
        transform: [{ rotate: '90deg' }],
    },
    iconView: {
        position: "absolute",
        right: 0,
    },
    btnView: {
        // backgroundColor: 'red',
        position: "absolute",
        flexDirection: "row",
        alignItems: "center",
        right: 3
    },
    List: {
        width: wp(85),
        alignSelf: "center",
    },
    seperater: {
        width: wp(85),
        alignSelf: "center",
        height: 1,
        backgroundColor: AppColors.borderColor,
        marginVertical: 10
    },
    conatiner: {
        width: wp(85),
        alignSelf: "center",
        marginVertical: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: AppColors.borderColor,
        borderRadius: 14,
    },
    memberInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    memberDetail: {
        marginTop: 10,
        backgroundColor: AppColors.lighGrey,
        borderRadius: 14,
        padding: 12
    },
    header: {
        width: wp(100),
        height: hp(26),
        alignItems: "center",
        justifyContent: 'flex-end',
        // backgroundColor: "red"
    },
    ringsImage: {
        width: 120,
        height: 110,
        // backgroundColor: "red"
    },
    LinkView: {
        width: wp(85),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    }
})