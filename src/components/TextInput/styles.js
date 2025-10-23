import { StyleSheet } from "react-native";
import { AppColors } from "../../assets/colors/AppColors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppFonts } from "../../constants/AppFonts";

export const styles = StyleSheet.create({
  inputStyle: {
    width: wp(75),
    color: AppColors.black,
    borderRadius: 16,
    height: 35,
    fontSize: 16,
    paddingVertical: -10,
    fontFamily: AppFonts.GeneralSans.medium,
    paddingHorizontal: 12,
  },
  container: {
    justifyContent: "center",
    width: wp(85),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    height: 55,
    marginVertical: 5
  },
  searhInputContainer: {
    width: wp(85),
    alignSelf: "center",
    flexDirection: "row",
    height: 45,
    borderRadius: 50,
    backgroundColor: AppColors.lighGrey,
    borderColor: AppColors.lighGrey,
    borderWidth: 0.75,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontFamily: AppFonts.GeneralSans.regular,
    // marginHorizontal: 8,
    color: AppColors.black,
  },
  closeButtonContainer: {
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 0.75,
    borderColor: AppColors.borderColor,
  },
  closeIcon: {
    width: 9,
    height: 9,
    resizeMode: 'contain'
  },
  closeBtnContainer: {
    width: 30,
    height: 30,
    marginRight: -5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
