import {
    Image,
    LayoutChangeEvent,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { FC, useRef } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    measure,
    runOnUI,
} from "react-native-reanimated";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppColors } from "../../../../assets/colors/AppColors";
import { AppFonts } from "../../../../constants/AppFonts";
import SmallText from "../../../../components/AppText/SmallText";
import en from "../../../../../translation/en.json"
import { AppImages } from "../../../../assets/images/AppImages";

type Props = {
    description: string[];
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const COLLAPSED_HEIGHT = 125;
const ColorsArray = [
    AppColors.RespiratoryEnd,
    AppColors.sleepEnd,
    AppColors.activityEnd,
    AppColors.heartMetricsEnd
]
const baseSpringConfig = {
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
};

const getSpringConfig = (isExpanding: boolean) => ({
    ...baseSpringConfig,
    damping: isExpanding ? 20 : 30, // Less bounce when collapsing
    stiffness: isExpanding ? 100 : 200, // Faster when collapsing
});

const InterestAccordian = ({ description }: Props) => {
    const fullHeight = useSharedValue(0);
    const progress = useSharedValue(0);
    const height = useSharedValue(COLLAPSED_HEIGHT);
    const [expanded, setExpanded] = React.useState<boolean>(false);

    // console.log(description?.length)
    const handleAccordionPress = () => {
        const isExpanding = progress.value === 0;
        if (isExpanding) {
            // Expanding
            setExpanded(true);
            progress.value = withSpring(1, getSpringConfig(true));
            height.value = withSpring(description?.length === 3 ? 125 : description?.length <= 6 ? 160 : description?.length <= 9 ? 190 : 220, getSpringConfig(true));
        } else {
            // Collapsing
            setExpanded(false);
            progress.value = withSpring(0, getSpringConfig(false));
            height.value = withSpring(COLLAPSED_HEIGHT, getSpringConfig(false));
        }
    };

    const accordionAnimatedStyle = useAnimatedStyle(() => {
        return { height: height.value };
    });

    const handleOnLayout = (event: LayoutChangeEvent) => {
        const currentHeight = event.nativeEvent.layout.height;
        if (!fullHeight.value && expanded) {
            // Set full height only once when the accordion expands the first time
            fullHeight.value = currentHeight;
        }
    };

    const headerViewRef: any = useRef(null);
    React.useEffect(() => {
        // Measure the height of the content on the first render
        if (!fullHeight.value && headerViewRef.current) {
            headerViewRef.current.measure((x: any, y: any, width: any, measuredHeight: any) => {
                fullHeight.value = measuredHeight ? measuredHeight : COLLAPSED_HEIGHT;
            });
        }
    }, []);
    return (
        <AnimatedPressable
            style={[styles.container, accordionAnimatedStyle]}
            onPress={() => description?.length > 3 ? handleAccordionPress() : {}}
        >
            <View ref={headerViewRef} onLayout={handleOnLayout} style={{ gap: expanded ? 0 : 40 }}>
                <View style={styles.header}>
                    <SmallText text={en.Profile.Interests} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, marginBottom: 10, alignSelf: "center" }} />
                    {!expanded && description?.length > 3 &&
                        <Image source={AppImages.dropBlack} resizeMode='contain' style={{ width: 25, height: 25, position: "absolute", right: 0, top: 0 }} />}
                    <View style={{ flexDirection: "row", flexWrap: 'wrap', alignItems: "center", justifyContent: 'center' }}>
                        {description?.slice(0, 3).map((interest: any, index: number) => {
                            const bgColor = ColorsArray[index % ColorsArray?.length];
                            return (
                                <View key={index} style={[styles.iconView, { backgroundColor: bgColor }]}>
                                    <SmallText text={interest} customStyle={{ color: AppColors.white, fontFamily: AppFonts.GeneralSans.medium }} />
                                </View>
                            );
                        })}
                    </View>
                </View>
                <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: "center", alignItems: "center", marginTop: -10 }}>
                    {description?.slice(3)?.map((interest: any, index: number) => {
                        const bgColor = ColorsArray[index % ColorsArray?.length];
                        return (
                            <View key={index} style={[styles.iconView, { backgroundColor: bgColor }]}>
                                <SmallText text={interest} customStyle={{ color: AppColors.white, fontFamily: AppFonts.GeneralSans.medium }} />
                            </View>
                        );
                    })}
                </View>
            </View>
        </AnimatedPressable>
    );
};

export default React.memo(InterestAccordian);

const styles = StyleSheet.create({
    container: {
        width: wp(85),
        paddingHorizontal: 16,
        alignSelf: "center",
        marginVertical: 10,
        paddingTop: 15,
        paddingBottom: 20,
        borderWidth: 1,
        overflow: 'hidden',
        borderColor: AppColors.borderColor,
        borderRadius: 12,
    },
    header: {
        justifyContent: "center",
        paddingVertical: 10,
    },
    iconView: {
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 25,
        borderRadius: 100,
        marginHorizontal: 3,
        marginVertical: 4,
        backgroundColor: AppColors.white,
    },
});
