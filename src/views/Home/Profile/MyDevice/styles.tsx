import { StyleSheet } from "react-native";
import { AppColors } from "../../../../assets/colors/AppColors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
    connectView: {
        width: wp(85),
        height: hp(25),
        alignSelf: 'center',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    bgImage: {
        width: wp(85),
        height: hp(25),
        alignSelf: 'center',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    Seperater: {
        height: 1,
        width: wp(35),
        marginVertical: 15,
        backgroundColor: AppColors.borderColor
    },
    ORSection: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    deviceView: {
        width: wp(85),
        alignSelf: 'center',
        marginVertical: 10
    }
})