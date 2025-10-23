import React from 'react';
import { Image, ImageProps, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { styles } from './styles';
import NormalText from '../AppText/NormalText';
import LinearGradient from 'react-native-linear-gradient';
import { AppColors } from '../../assets/colors/AppColors';

interface Button {
    disabled?: boolean,
    text: string,
    customStyle?: StyleProp<ViewStyle>,
    containerStyle?: StyleProp<ViewStyle>,
    txtStyle?: StyleProp<TextStyle>,
    onPress: CallableFunction,
    colors?: string[],
    icon?: ImageProps,
}
function AppButton({ disabled, text, customStyle, txtStyle, onPress, colors, icon, containerStyle }: Button) {
    return (
        <LinearGradient
            colors={colors ? colors : [AppColors.transparent, AppColors.transparent]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={[styles.gradiantContainer, containerStyle]}>
            <TouchableOpacity onPress={() => onPress && onPress()}
                disabled={disabled}
                activeOpacity={0.8}
                style={[
                    styles.container, customStyle,
                    // { backgroundColor: disabled ? THEME.button.tertiary : THEME.button.primary }
                ]}>
                {icon && <Image source={icon} resizeMode='contain' style={styles.iconStyle} />}
                <NormalText text={text} customStyle={[styles.txtStyle, txtStyle]} />
            </TouchableOpacity>
        </LinearGradient>
    );
}

export default AppButton;