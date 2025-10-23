import { StyleSheet, Text, View, Animated } from 'react-native'
import React from 'react'
import { AppColors } from '../../assets/colors/AppColors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const parts = [
    { name: 'Part 1', color: AppColors.blue, value: 17 }, // Red
    { name: 'Part 2', color: AppColors.blue, value: 34 }, // Yellow
    { name: 'Part 3', color: AppColors.blue, value: 51 }, // Green
    { name: 'Part 4', color: AppColors.blue, value: 68 }, // Blue
    { name: 'Part 5', color: AppColors.blue, value: 85 }, // Purple
    { name: 'Part 6', color: AppColors.blue, value: 100 }, // Purple
];

const Progress = ({ currentProgress = 0 }: any) => {
    const progress = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        const clampProgress = currentProgress > 5 ? 5 : currentProgress;
        Animated.timing(progress, {
            toValue: clampProgress,
            duration: 500, // Adjust animation duration as needed
            useNativeDriver: false,
        }).start();
    }, [currentProgress, progress]);

    return (
        <View style={styles.progressBarContainer}>
            {parts.map((part, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.progressBarPart,
                        {
                            backgroundColor: index <= currentProgress ? AppColors.blue : AppColors.borderColor,
                            // backgroundColor: progress.interpolate({
                            //     inputRange: [0, 4],
                            //     outputRange: [AppColors.borderColor, AppColors.blue],
                            // extrapolate: 'clamp'
                            // }),
                        }]}
                />
            ))}
        </View>
    )
}


export default React.memo(Progress)

const styles = StyleSheet.create({
    progressBarContainer: {
        marginHorizontal: 30,
        alignSelf: "center",
        borderRadius: 50,
        flexDirection: 'row',
        height: 6,
        justifyContent: 'space-between',
        marginVertical: 8,
        overflow: 'hidden',
    },
    progressBarPart: {
        flex: 1,
        borderRadius: 50,
        marginHorizontal: 2,
    },
})