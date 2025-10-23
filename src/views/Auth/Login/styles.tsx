import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppColors } from "../../../assets/colors/AppColors";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
        justifyContent: 'space-between'
    },
    header: {
        width: wp(85),
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 30,
    },
    inputs: {
        width: wp(85),
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    btnView: {
        width: wp(85),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
    },
    rememberView: {
        flexDirection: 'row',
        width: wp(85),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    remember: {
        flexDirection: "row",
    },
    checkboxs: {
        width: 20,
        height: 20
    },
    navView: {
        flexDirection: "row",
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
})