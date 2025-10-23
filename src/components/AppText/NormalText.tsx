import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { styles } from './styles';

export interface AppText {
    text: string | undefined,
    customStyle?: StyleProp<TextStyle>,
    numberOfLines?: number | undefined
}
function NormalText({ text, customStyle, numberOfLines }: AppText) {
    return (
        <Text numberOfLines={numberOfLines} maxFontSizeMultiplier={1} style={[styles.txtStyle, customStyle]}>
            {text}
        </Text>
    );
}

export default NormalText;