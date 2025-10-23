import { StyleSheet } from "react-native";
import { AppColors } from "../../../../assets/colors/AppColors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
    AvatrView: {
        width: wp(85),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    AvatarBorder: {
        // backgroundColor: "red",
        borderRadius: 100,
        borderWidth: 3,
        borderColor: AppColors.borderColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Avatar: {
        width: 140,
        height: 140,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: wp(3)
    },
    iconView: {
        position: "absolute",
        bottom: 0,
        right: 0,
    },
    icon: {
        width: 40,
        height: 40,
    },
    inputs: {
        width: wp(85),
        marginVertical: 10,
        alignSelf: 'center',
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
    dropIcon: {
        width: 40,
        position: 'absolute',
        top: 15,
        alignSelf: 'flex-end'
    },
    listItem: {
        height: 40,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    clnderView: {
        width: wp(85),
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnView: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    iconTick: {
        width: 25,
        height: 25,
    }
})