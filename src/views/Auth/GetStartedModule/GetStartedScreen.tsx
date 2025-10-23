import { Animated, Dimensions, ImageBackground, View, Linking } from 'react-native'
import React, { } from 'react'
import { useNavigation } from '@react-navigation/native';
import PagerView, {
    // PagerViewOnPageScrollEventData
} from "react-native-pager-view";
import { ScreensData } from './ScreensData';
// import { ExpandingDot } from 'react-native-animated-pagination-dots';
import AppButton from '../../../components/Button/AppButton';
import { styles } from './styles';
import { AppColors } from '../../../assets/colors/AppColors';
import { AppRoutes } from '../../../constants/AppRoutes';
import NormalText from '../../../components/AppText/NormalText';
import LargeText from '../../../components/AppText/LargeText';
import en from "../../../../translation/en.json";
// import { heightPercentageToDP as wp, widthPercentageToDP as hp } from 'react-native-responsive-screen';
import PaginationDots from '../../../components/PaginationDots/PaginationDots';

const GetStartedScreen = () => {
    // const windowWidth = Dimensions.get('window').width;
    const navigation: any = useNavigation();
    const [page, setPage] = React.useState<number>(0);
    const AnimatedPagerView: any = Animated.createAnimatedComponent(PagerView);
    const ref: any = React.useRef<PagerView>(null);

    React.useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (page + 1) % ScreensData.length;
            ref.current.setPage(nextIndex);
        }, 3000);
        return () => clearInterval(interval);
    }, [page, ScreensData.length]);

    return (
        <View style={{ flex: 1 }}>
            <AnimatedPagerView
                style={styles.PagerView}
                ref={ref}
                initialPage={page}
                onPageSelected={({ nativeEvent }: any) => { setPage(nativeEvent.position) }}
            // onPageScroll={onPageScroll}
            >
                {ScreensData.map(item => (
                    <View key={item.key}>
                        {/* <View style={styles.ImageSection}> */}
                        <ImageBackground
                            source={item.img}
                            resizeMode="cover"
                            style={styles.ImageSection}
                        >
                            {/* <View style={styles.transLayer}></View> */}
                            {/* </View> */}
                            <View style={styles.SecondSection}>
                                <LargeText text={en.Onboarding.welcome} customStyle={{ fontSize: 40, textAlign: 'center' }} />
                                <NormalText text={`${item.text}`} customStyle={{ textAlign: 'center', marginTop: 5 }} />
                            </View>
                        </ImageBackground>

                    </View>
                ))}
            </AnimatedPagerView>
            <View style={styles.BtnView}>
                <AppButton
                    text={en.Buttons.getStarted}
                    txtStyle={{ color: AppColors.white }}
                    colors={[AppColors.black, AppColors.black]}
                    onPress={() =>
                        navigation.navigate(AppRoutes.SignupOptions)
                    }
                />
                <AppButton
                    text={en.Buttons.notOrdered}
                    txtStyle={{ color: AppColors.black }}
                    colors={[AppColors.white, AppColors.white]}
                    onPress={() => { Linking.openURL("https://mirror.health/products/the-mirror-ring-1") }

                    }
                />
            </View>
            <PaginationDots
                DataArray={ScreensData}
                currentIndex={page}
                activeColor={page != 0 ? AppColors.black : AppColors.white}
                inactiveColor={page != 0 ? AppColors.grey : AppColors.lightWhite}
            />
        </View>
    )
}

export default GetStartedScreen