import React from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import LargeText from '../AppText/LargeText';
import { AppImages } from '../../../assets/images/AppImages';

const ScreenLoader = ({ title }) => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size={'large'} />
        </View>
    );
}

export default ScreenLoader


const styles = StyleSheet.create({
    loaderImage: {
        width: 48,
        height: 48,
    }
})