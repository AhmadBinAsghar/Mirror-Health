import { View, StyleSheet, Animated, StyleProp, ViewStyle } from 'react-native'
import React, { useRef } from 'react'
import { AppColors } from '../../assets/colors/AppColors';

interface CustomProgressBarInterface {
    progress: number
    customStyle?: StyleProp<ViewStyle>
}

const CustomProgressBar = ({ progress = 10, customStyle }: CustomProgressBarInterface) => {

    const animatedHeight = useRef(new Animated.Value(0)).current;


    React.useEffect(() => {
        const clampProgress = progress > 100 ? 100 : progress;

        Animated.timing(animatedHeight, {
            toValue: clampProgress,
            duration: 500, // Adjust the duration as needed
            useNativeDriver: false, // This is required for layout animations on Android
        }).start();

    }, [progress, animatedHeight]);

    return (
        <View style={customStyle}>
            <View style={styles.point} />
            <View style={styles.progressBarView}>
                <Animated.View style={[styles.progressBar,
                {
                    backgroundColor: progress >= 20 ? AppColors.parrot : AppColors.red,
                    height: animatedHeight.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                        extrapolate: 'clamp',
                    }),
                }
                ]
                } />
            </View>
        </View>
    );
}

export default React.memo(CustomProgressBar);

const styles = StyleSheet.create({
    progressBarView: {
        height: 50,
        borderWidth: 2,
        padding: 2,
        borderColor: AppColors.grey,
        borderRadius: 6,
        // paddingHorizontal: 5,
        marginTop: 10,
        transform: [{ rotate: '180deg' }],
        overflow: 'hidden', // Ensure the progress bar doesn't overflow its container
    },
    point: {
        width: 10,
        height: 2,
        backgroundColor: AppColors.grey,
        borderRadius: 10,
        position: 'absolute',
        top: 8,
        alignSelf: "center"
    },
    progressBar: {
        width: 20,
        borderRadius: 2,
    },
});