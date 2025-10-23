import React from 'react';
import { Image, KeyboardTypeOptions, NativeSyntheticEvent, Pressable, ReturnKeyTypeOptions, StyleProp, TextInput, TextInputFocusEventData, TextInputProps, TextStyle, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';
import { styles } from './styles';
import { AppColors } from '../../assets/colors/AppColors';
import { AppImages } from '../../assets/images/AppImages';
import SmallText from '../AppText/SmallText';

interface Inputs {
    inputRef?: React.LegacyRef<TextInput> | undefined,
    autoFocus?: boolean,
    maxLength?: number,
    value: string | undefined,
    autoCapitalize?: "none" | "sentences" | "words" | "characters",
    keyboardType?: KeyboardTypeOptions,
    placeholder?: string,
    customStyle?: StyleProp<TextStyle>,
    onChangeText: CallableFunction,
    onSubmitEditing?: CallableFunction,
    editable?: boolean,
    secureTextEntry?: boolean,
    returnKeyType?: ReturnKeyTypeOptions | undefined,
    blurOnSubmit?: boolean | undefined,
    onFocus?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined,
    onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined,
    numberOfLines?: number | undefined,
    multiline?: boolean | undefined
    onLayout?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined,
    error?: boolean,
    isPassword?: boolean,
    hidePass?: CallableFunction,
    containerStyle?: StyleProp<ViewStyle>,
    errorIcon?: boolean
}
function AppInput({
    inputRef,
    autoFocus,
    maxLength,
    value,
    autoCapitalize,
    keyboardType = 'default',
    placeholder,
    customStyle,
    onChangeText,
    onSubmitEditing,
    editable = true,
    returnKeyType,
    blurOnSubmit,
    onFocus,
    onBlur,
    secureTextEntry = false,
    numberOfLines,
    multiline,
    onLayout,
    error,
    isPassword,
    hidePass,
    containerStyle,
    errorIcon = true,
}: Inputs) {
    const [focus, setFocused] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (value === '' || value === undefined) {
            setFocused(false)
        } else {
            setFocused(true)
        }
    }, [value])
    return (
        <View style={[styles.container, containerStyle, { borderColor: error ? AppColors.red : AppColors.borderColor }]}>
            {focus && <SmallText text={placeholder} customStyle={{ position: 'absolute', color: AppColors.placeholderColor, left: 12, top: 8, fontSize: 10 }} />}
            <TextInput
                editable={editable}
                maxLength={maxLength}
                autoFocus={autoFocus}
                autoCapitalize={autoCapitalize || "none"}
                keyboardType={keyboardType}
                value={value}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                placeholderTextColor={AppColors.placeholderColor}
                onChangeText={(text) => onChangeText && onChangeText(text)}
                style={[styles.inputStyle, customStyle, { bottom: focus ? -6 : 0 }]}
            />
            {isPassword && <TouchableOpacity hitSlop={10} activeOpacity={1} style={{ width: 40, height: 40, position: 'absolute', right: 0, bottom: -3 }} onPress={() => hidePass && hidePass()}>
                <Image source={secureTextEntry != true ? AppImages.eyeOpen : AppImages.eyeClose} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>}
            {error && errorIcon && <Image source={AppImages.alert} resizeMode='contain' style={{ width: 20, height: 20, position: 'absolute', right: isPassword ? 45 : 15, top: 15 }} />}
        </View>
    );
}

export default AppInput;