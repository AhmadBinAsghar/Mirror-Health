import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppColors } from "../../../assets/colors/AppColors";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
        justifyContent: 'space-between'
    },
    imageView: {
        width: wp(100),
        height: hp(30),
        marginTop: hp(10)
    },
    img: {
        width: wp(70),
        height: hp(30),
        alignSelf: 'center'
    },
    header: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 30,
        marginHorizontal: 35,
    },
    btnView: {
        alignItems: 'center',
        marginBottom: 15
    }
})