import { View, TouchableOpacity, Image, TextInput, ActivityIndicator, StyleProp, TextStyle } from "react-native";
import React from "react";
import { styles } from "./styles";
import { AppColors } from "../../assets/colors/AppColors";
import { AppImages } from "../../assets/images/AppImages";

interface Input {
  value: string,
  placeholder?: string,
  customStyle?: StyleProp<TextStyle>,
  onChangeText: CallableFunction,
  onSubmitEditing?: CallableFunction,
  onRightIconButtonPress?: CallableFunction,
  isLeftIcon?: boolean,
  maxLength?: number
  onFocus?: CallableFunction
  isLoading?: boolean
  crossPress?: CallableFunction
}
const AppSearchInput = ({
  value,
  placeholder,
  customStyle,
  onChangeText,
  onSubmitEditing,
  onRightIconButtonPress,
  isLeftIcon = true,
  maxLength,
  onFocus,
  isLoading,
  crossPress,
}: Input) => {
  return (
    <View style={styles.searhInputContainer}>
      {isLeftIcon && (
        <Image
          source={AppImages.searchGrey}
          resizeMode="contain"
          tintColor={AppColors.placeholderColor}
          style={{ width: 30, height: 30 }}
        />
      )}

      <TextInput
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onFocus={() => onFocus && onFocus()}
        placeholderTextColor={AppColors.placeholderColor}
        onChangeText={(text) => onChangeText && onChangeText(text)}
        onSubmitEditing={(text) => onSubmitEditing && onSubmitEditing(text)}
        style={[styles.searchInput, customStyle]}
      />
      {isLoading && (
        <ActivityIndicator color={"#4597F7"} size={"small"} style={{}} />
      )}
      {crossPress && value.length != 0 &&

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => { crossPress() }}>
          <Image
            source={AppImages.cross}
            resizeMode="contain"
            tintColor={AppColors.placeholderColor}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>}
      {/* {value && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.closeBtnContainer}
          onPress={onRightIconButtonPress}
        >
          <View style={styles.closeButtonContainer}>
            <Image
              source={AppImages.closeIcon}
              resizeMode="contain"
              style={styles.closeIcon}
            />
          </View>
        </TouchableOpacity>
      )
      } */}
    </View >
  );
};

export default AppSearchInput;
