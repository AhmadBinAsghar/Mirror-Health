import { StyleSheet } from 'react-native';
import { AppColors } from '../../../assets/colors/AppColors';
import { AppFonts } from '../../../constants/AppFonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        // backgroundColor: AppColors.white,
    },
    ImageSection: {
        width: wp(100),
        height: "100%",
    },
    PagerView: {
        width: wp(100),
        height: "100%",
        // marginTop: hp(6)
    },
    Image: {
        width: wp(100),
        height: hp(100),
    },
    SecondSection: {
        width: wp(85),
        height: hp(45),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
    Dots: {
        width: 5,
        height: 5,
        borderRadius: 4,
        marginHorizontal: 2
    },
    BtnView: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 45,
        justifyContent: "space-between"
    },
});