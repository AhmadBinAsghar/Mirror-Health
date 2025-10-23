import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        // backgroundColor: 'red'
    },
    backbutton: {
        width: 18,
        height: 18,
        marginTop: 2
    },
    backTouch: {
        position: "absolute",
        left: 20,
        top: 6
    },
    DotsTouch: {
        position: "absolute",
        right: 20,
        top: 3
    }
})