import React from 'react';
import { ScrollView, View } from 'react-native';
import { Svg, Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { styles } from '../Header/styles';

interface radial {
    width: any
    height: any
    colors: any
    stops: any
}
const CustomRadialGradient = ({ width, height, colors, stops }: radial) => {
    const cx = width / 2; // Center X coordinate
    const cy = 0; // Center Y coordinate
    const r = Math.min(width, height); // Radius (use the smaller of width and height)

    return (
        <View style={{ position: "absolute" }}>
            <Svg width={width} height={height}>
                <Defs>
                    <RadialGradient id="grad" cx={cx} cy={cy} r={r} gradientUnits="userSpaceOnUse" >
                        {stops.map((stop, index) => (
                            <Stop key={index} stopColor={colors[index]} offset={stop} />
                        ))}
                    </RadialGradient>
                </Defs>
                <Rect x="0" y="0" width={width} height={height} fill="url(#grad)" />
            </Svg>
        </View>
    );
};

export default CustomRadialGradient;
