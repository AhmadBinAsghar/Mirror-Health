import { StyleSheet, Dimensions, Platform } from "react-native";
import { AppColors } from "../../../../assets/colors/AppColors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppConstants } from "../../../../constants/AppConstants";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
        paddingTop: Platform.OS == 'ios' ? AppConstants.topInsets : 40,
    },
    body: {
        flex: 1,
        backgroundColor: AppColors.lighGrey,
    },
    options: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    },
    item: {
        width: Dimensions.get('window').width / 2,
        height: 50,
        alignItems: "center",
        justifyContent: 'center',
        borderBottomWidth: 1,
    },
    notificationItem: {
        flexDirection: "row",
        width: wp(85),
        backgroundColor: AppColors.white,
        padding: 10,
        marginVertical: 5,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: 'space-between'
    },
    ActiveDot: {
        backgroundColor: AppColors.blue,
        width: 8,
        height: 8,
        borderRadius: 5,
        marginHorizontal: 5
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 6
    },
    heartIcon: {
        width: 15,
        height: 15,
        borderRadius: 40,
        position: "absolute",
        bottom: 0,
        right: 2,
        borderWidth: 1,
        borderColor: AppColors.white
    },
    post: {
        width: 45,
        height: 45,
        borderRadius: 8,
        marginHorizontal: 5,
        right: 0
    },
    Details: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 5,
    },
    btnView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        right: 0
    },
    title: {
        width: wp(85),
        height: 30,
        marginVertical: 10,
        alignSelf: "center",
        alignItems: 'flex-start',
        justifyContent: "center"
    },
    detail: {
        width: wp(85),
        paddingVertical: 10,
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-between"
    },
    text: {
        width: wp(65),
        flexWrap: "wrap",
        // backgroundColor: "red"
    },
    switch: {
        width: 44,
        height: 25,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: 'center',
        // backgroundColor: "red"
    },
    seperater: {
        width: wp(85),
        height: 1,
        alignSelf: "center",
        backgroundColor: AppColors.borderColor,
        marginVertical: 2
    },
    saveBtn: {
        alignItems: "center",
        justifyContent: 'center',
    }
})