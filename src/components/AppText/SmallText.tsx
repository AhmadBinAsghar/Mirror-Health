import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';
import { AppText } from './NormalText';
function SmallText({ text, customStyle }: AppText) {
    return (
        <Text maxFontSizeMultiplier={1} style={[styles.smallTxtStyle, customStyle]}>
            {text}
        </Text>
    );
}

export default SmallText;