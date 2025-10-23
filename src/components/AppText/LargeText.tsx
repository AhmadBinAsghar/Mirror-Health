import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';

import { AppText } from './NormalText';
function LargeText({ text, customStyle }: AppText) {
    return (
        <Text maxFontSizeMultiplier={1} style={[styles.largeTxtStyle, customStyle]}>
            {text}
        </Text>
    );
}

export default LargeText;