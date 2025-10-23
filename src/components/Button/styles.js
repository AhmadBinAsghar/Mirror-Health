import { StyleSheet } from 'react-native';
import { AppFonts } from '../../constants/AppFonts';
import { AppColors } from '../../assets/colors/AppColors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: wp(85),
        height: 55,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: AppColors.borderColor
    },
    gradiantContainer: {
        width: wp(85),
        height: 55,
        borderRadius: 16,
        marginVertical: 5
    },
    txtStyle: {
        fontFamily: AppFonts.GeneralSans.medium,
        alignSelf: 'center',
        // color: THEME.button.primaryText,
    },
    iconStyle: {
        width: 20,
        height: 20,
        position: 'absolute',
        left: 20
    }
})