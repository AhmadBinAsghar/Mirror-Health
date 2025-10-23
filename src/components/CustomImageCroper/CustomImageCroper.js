import { useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, Image, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import { AppImages } from '../../assets/images/AppImages';
import { AppColors } from '../../assets/colors/AppColors';

const CropScreen = () => {
    const route = useRoute();
    const { imageUri } = route.params;
    const pan = React.useRef(new Animated.ValueXY()).current;
    const [baseScale, setBaseScale] = useState(1);
    const [scale, setScale] = useState(1);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    const pinchRef = useRef();

    const onPinchGestureEvent = event => {
        const { scale, focalX, focalY, state } = event.nativeEvent;
        if (state === State.ACTIVE) {
            setScale(baseScale * scale);
            setTranslateX(translateX + (focalX - (focalX / scale)));
            setTranslateY(translateY + (focalY - (focalY / scale)));
        } else if (state === State.END) {
            setBaseScale(scale);
        }
    };
    // Function to handle pan gestures
    const panResponder = React.useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetPanResponder: () => true,
                onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
                onPanResponderRelease: () => {
                    // Handle release
                },
            }),
        []
    );

    return (
        <View style={styles.container}>
            <View style={{ width: wp(100), height: hp(110), backgroundColor: "rgba(0,0,0,0.7)", alignItems: "center", justifyContent: 'center' }} >
                <View style={{ width: wp(85), height: hp(43), borderRadius: 1000, backgroundColor: AppColors.white, overflow: 'hidden' }} >
                    {/* <PinchGestureHandler
                        ref={pinchRef}
                        onGestureEvent={onPinchGestureEvent}
                        simultaneousHandlers={['image']}
                        onHandlerStateChange={onPinchGestureEvent}
                    >
                        <View style={[styles.imageContainer, {
                            transform: [
                                { translateX: translateX },
                                { translateY: translateY },
                                { scale: scale },
                            ],
                        },]}> */}
                    <Animated.Image
                        source={{ uri: imageUri }}
                        {...panResponder.panHandlers}
                        resizeMode={'contain'}
                        style={[styles.image, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
                    />
                    {/* </View>
                    </PinchGestureHandler> */}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    image: {
        width: "100%",
        height: "100%",
        // position: 'absolute',
    },
    overlay: {
        position: 'absolute',
    },
    draggable: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cropBox: {
        width: wp(100),
        height: hp(100),
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cropText: {
        color: 'white',
        fontSize: 16,
    },
    imageContainer: {
        width: wp(85),
        height: hp(43),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CropScreen;

// import { useRoute } from '@react-navigation/native';
// import React, { useRef, useState } from 'react';

// // import { View, Text, StyleSheet, PanResponder, Animated, Image } from 'react-native';
// import { View, Image, StyleSheet, Dimensions, Animated, PanResponder, } from 'react-native';
// import { PinchGestureHandler, State } from 'react-native-gesture-handler';

// const CropScreen = () => {
//     const route = useRoute();
//     const { imageUri } = route.params;
//     const [baseScale, setBaseScale] = useState(1);
//     const [scale, setScale] = useState(1);
//     const [translateX, setTranslateX] = useState(0);
//     const [translateY, setTranslateY] = useState(0);

//     const pinchRef = useRef();

//     const onPinchGestureEvent = event => {
//         const { scale, focalX, focalY, state } = event.nativeEvent;
//         if (state === State.ACTIVE) {
//             setScale(baseScale * scale);
//             setTranslateX(translateX + (focalX - (focalX / scale)));
//             setTranslateY(translateY + (focalY - (focalY / scale)));
//         } else if (state === State.END) {
//             setBaseScale(scale);
//         }
//     };
//     const pan = React.useRef(new Animated.ValueXY()).current;
//     const initialZoom = 1;
//     // Function to handle pan gestures
//     const panResponder = React.useMemo(
//         () =>
//             PanResponder.create({
//                 onMoveShouldSetPanResponder: () => true,
//                 onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
//                 onPanResponderRelease: () => {
//                     // Handle release
//                 },
//             }),
//         []
//     );

//     return (
//         <View style={styles.container}>
//             <PinchGestureHandler
//                 ref={pinchRef}
//                 onGestureEvent={onPinchGestureEvent}
//                 simultaneousHandlers={['image']}
//                 onHandlerStateChange={onPinchGestureEvent}
//             >
//                 <View style={styles.imageContainer}>
//                     <Animated.Image
//                         source={{ uri: imageUri }}
//                         {...panResponder.panHandlers}
//                         style={[
//                             styles.image,
//                             {
//                                 transform: [
//                                     { translateX },
//                                     { translateY },
//                                     { scale },
//                                 ],
//                             },
//                         ]}
//                         resizeMode="contain"
//                     />
//                 </View>
//             </PinchGestureHandler>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     imageContainer: {
//         width: Dimensions.get('window').width,
//         height: Dimensions.get('window').height,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     image: {
//         width: '100%',
//         height: '100%',
//     },
// });

// export default CropScreen;
