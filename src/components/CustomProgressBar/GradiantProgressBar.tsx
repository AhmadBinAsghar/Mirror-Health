import { View, StyleSheet, Animated, StyleProp, ViewStyle } from 'react-native'
import React, { useRef } from 'react'
import { AppColors } from '../../assets/colors/AppColors';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SmallText from '../AppText/SmallText';
import { AppFonts } from '../../constants/AppFonts';

interface CustomProgressBarInterface {
    progress: any
    customStyle?: StyleProp<ViewStyle>
    min?: any
    max?: any
    title: string
}

const GradiantProgressBar = ({ progress = 30, customStyle, min, max, title }: CustomProgressBarInterface) => {

    const animatedHeight = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        const clampProgress = progress > (max ?? 100) ? (max ?? 100) : progress;

        Animated.timing(animatedHeight, {
            toValue: clampProgress,
            duration: 500, // Adjust the duration as needed
            useNativeDriver: false, // This is required for layout animations on Android
        }).start();

    }, [progress, animatedHeight]);

    return (
        <View style={{ marginTop: 12 }}>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={["#D9E4EE", "#96CBFF", "#4CBAF9", "#FFBD70", "#FF4139",]}
                style={styles.progressBarView}>
            </LinearGradient>
            <Animated.View style={[styles.progressBar,
            {
                marginLeft: animatedHeight.interpolate({
                    inputRange: [min ?? 0, max ?? 100],
                    outputRange: ['0%', '97%'],
                    extrapolate: 'clamp',
                }),
            }
            ]
            } />
            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
                {min && <View style={{ flexDirection: "row" }}>
                    <SmallText text='MIN: ' customStyle={{ fontFamily: AppFonts.GeneralSans.medium, fontSize: 10, color: AppColors.placeholderColor }} />
                    <SmallText text={`${min} ${title}`} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, fontSize: 10 }} />
                </View>}
                {max && <View style={{ flexDirection: "row" }}>
                    <SmallText text='MAX: ' customStyle={{ fontFamily: AppFonts.GeneralSans.medium, fontSize: 10, color: AppColors.placeholderColor }} />
                    <SmallText text={`${max} ${title}`} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, fontSize: 10, marginRight: 5 }} />
                </View>}
            </View>
        </View>
    );
}

export default React.memo(GradiantProgressBar);

const styles = StyleSheet.create({
    progressBarView: {
        width: wp(78),
        height: 5,
        borderRadius: 16,
        marginVertical: 5,
        overflow: 'hidden', // Ensure the progress bar doesn't overflow its container
    },
    progressBar: {
        width: 8,
        borderWidth: 2,
        borderColor: AppColors.white,
        height: 15,
        backgroundColor: AppColors.blue,
        borderRadius: 5,
        position: "absolute"
    },
});