import { StyleSheet } from 'react-native';
import { AppFonts } from '../../constants/AppFonts';
import { AppColors } from '../../assets/colors/AppColors';

export const styles = StyleSheet.create({
    txtStyle: {
        fontSize: 16,
        color: AppColors.black,
        fontFamily: AppFonts.GeneralSans.regular,
        lineHeight: 20,
    },
    smallTxtStyle: {
        fontSize: 14,
        color: AppColors.black,
        fontFamily: AppFonts.GeneralSans.regular,
    },
    largeTxtStyle: {
        fontSize: 22,
        color: AppColors.black,
        fontFamily: AppFonts.GeneralSans.semiBold,
    },
})