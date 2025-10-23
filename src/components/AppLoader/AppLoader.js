import React from "react";
import { ActivityIndicator, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AppColors } from "../../assets/colors/AppColors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const AppLoader = () => {
  return (
    <View style={{ flex: 1, width: wp(100), height: hp(110), alignItems: "center", justifyContent: "center", backgroundColor: "rgba(105, 104, 104,0.4)", position: 'absolute', zIndex: 10 }}>
      <ActivityIndicator animating size={'large'} color={AppColors.white} />
    </View>
  )
};

export default AppLoader;
