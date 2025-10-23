import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColors } from '../../assets/colors/AppColors';
import { AppFonts } from '../../constants/AppFonts';

interface writer {
    text: string,
    delay: number, // in milliseconds
}
const TypeWriter = ({ text, delay }: writer) => {
    const [currentText, setCurrentText] = React.useState('');
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setInterval(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);

            return () => clearInterval(timeout);
        } else {
            setCurrentText('');
            setCurrentIndex(0);
        }
    }, [currentIndex, delay, text]);

    return <Text style={{
        fontSize: 12,
        color: AppColors.placeholderColor,
        fontFamily: AppFonts.GeneralSans.medium
    }}>{currentText}</Text>;
}
export default TypeWriter