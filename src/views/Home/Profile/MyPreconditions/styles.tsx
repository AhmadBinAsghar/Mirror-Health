import { StyleSheet } from "react-native";
import { AppColors } from "../../../../assets/colors/AppColors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
    btnView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    header: {
        width: wp(85),
        height: hp(15),
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchBar: {
        width: wp(85),
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    issuesView: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
        marginTop: 10
    },
    issue: {
        flexDirection: 'row',
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "space-evenly",
        margin: 3,
        padding: 8,
        backgroundColor: 'red'
    },
    heart: {
        width: 20,
        height: 20,
        borderRadius: 40,
        backgroundColor: AppColors.white,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 5
    },
    icon: {
        width: 12,
        height: 12
    }
})