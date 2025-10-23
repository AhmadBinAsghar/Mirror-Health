import { StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomRadialGradient from './CustomRadialGradiant';
interface Wrapper {
    children: React.ReactNode,
    color: string[]
}
const MetricsWrapper = ({ children, color }: Wrapper) => {
    return (
        // <RadialGradient
        //     style={{ flex: 1 }}
        //     colors={color}
        //     stops={[0.3, 1]}
        //     center={[wp(50), 0]}
        //     radius={800}
        // >
        //     {children}
        // </RadialGradient>

        <View style={{ flex: 1 }}>
            <CustomRadialGradient width={wp(100)} height={hp(100)} colors={color} stops={[0.3, 1]} />
            {children}
        </View>

        // <LinearGradient
        //     style={{ flex: 1 }}
        //     colors={color}
        // // stops={[0.3, 1]}
        // // center={[wp(50), 0]}
        // // radius={800}
        // >
        //     {children}
        // </LinearGradient>
    )
}

export default MetricsWrapper

const styles = StyleSheet.create({})