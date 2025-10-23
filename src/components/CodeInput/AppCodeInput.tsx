import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { AppColors } from '../../assets/colors/AppColors'

interface Inputs {
    inputRef?: React.LegacyRef<TextInput> | undefined,
    autoFocus?: boolean,
    maxLength?: number,
    value: string | undefined,
    keyboardType?: KeyboardTypeOptions,
    customStyle?: StyleProp<TextStyle>,
    onChangeText: CallableFunction,
    onKeyPress: CallableFunction,
    error?: boolean
}
const AppCodeInput = ({
    inputRef,
    autoFocus,
    maxLength,
    onKeyPress,
    value,
    keyboardType,
    customStyle,
    onChangeText,
    error,
}: Inputs) => {
    return (
        <View style={[styles.container, { borderColor: error ? AppColors.red : AppColors.borderColor }]}>
            <TextInput
                ref={inputRef}
                maxLength={1}
                autoFocus={autoFocus}
                keyboardType={keyboardType || 'default'}
                value={value}
                onKeyPress={e => onKeyPress(e)}
                placeholderTextColor={AppColors.placeholderColor}
                onChangeText={(text) => onChangeText && onChangeText(text)}
                style={[styles.inputStyle, customStyle]}
            />
        </View>
    )
}

export default AppCodeInput