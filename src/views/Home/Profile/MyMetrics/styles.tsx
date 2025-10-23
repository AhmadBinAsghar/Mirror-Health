import { StyleSheet } from "react-native";
import { AppColors } from "../../../../assets/colors/AppColors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
    btnView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    header: {
        width: wp(85),
        height: hp(15),
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center'
    },
    genderView: {
        flexDirection: 'row',
        width: wp(85),
        height: hp(7),
        padding: 2,
        borderRadius: 16,
        backgroundColor: AppColors.lighGrey,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: 10,
    },
    genderBtn: {
        width: wp(27), height: hp(6.3),
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    clnderView: {
        width: wp(85),
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    dropIcon: {
        width: wp(80),
        position: 'absolute',
        top: 15,
        alignItems: 'flex-end'
    },
    clnder: {
        width: wp(85),
        marginTop: -16,
        borderWidth: 1,
        backgroundColor: AppColors.white,
        borderColor: AppColors.borderColor,
        borderRadius: 16,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        padding: 10
    },
    hgtWgtView: {
        flexDirection: "row",
        width: wp(85),
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: "space-between",
        marginVertical: 10
    },
    slideIcon: {
        width: 10,
        height: 10
    },
    slideView: {
        flexDirection: 'row',
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        right: 10,
        top: 25
    },
    RaceList: {
        width: wp(85),
        maxHeight: 200,
        minHeight: 55,
        marginTop: -16,
        borderWidth: 1,
        backgroundColor: AppColors.white,
        borderColor: AppColors.borderColor,
        borderRadius: 16,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        padding: 10
    },
    listItem: {
        height: 40,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    icon: {
        width: 25,
        height: 25,
    }
})