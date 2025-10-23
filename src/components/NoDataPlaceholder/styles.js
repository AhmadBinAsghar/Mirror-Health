import { StyleSheet } from 'react-native'
import { AppFonts } from '../../constants/AppFonts'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: THEME.backGroundColor
    },
    titleStyle: {
        fontSize: 18,
        fontFamily: AppFonts.Avenir.medium,
        // color: THEME.text.secondary
    },
    logo: {
        height: 60,
        width: 60,
        resizeMode: "contain",
        marginBottom: 16,
    }
})