import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface Dots {
    currentIndex: number,
    DataArray: any[],
    activeColor: string,
    inactiveColor: string,
}
const PaginationDots = ({ currentIndex, DataArray, activeColor, inactiveColor }: Dots) => {
    return (
        <View style={styles.wrapper}>
            {DataArray.map((dots, index) => (
                <View key={dots.key} style={[styles.Dot, { backgroundColor: currentIndex === index ? activeColor : inactiveColor, width: currentIndex === index ? 20 : 6 }]} />
            ))}
        </View>
    )
}

export default PaginationDots

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        position: "absolute",
        bottom: 30,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    Dot: {
        width: 6,
        height: 6,
        borderRadius: 100,
        marginHorizontal: 2
    }
})