import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SmallText from '../AppText/SmallText'
import { AppImages } from '../../assets/images/AppImages'
import { AppColors } from '../../assets/colors/AppColors'

interface Validater {
    valid: boolean,
    text: string,
}
const PassValidater = ({
    valid,
    text,
}: Validater) => {
    return (
        <View style={styles.wrapper}>
            <Image source={valid != true ? AppImages.unChecked : AppImages.checkTrue} resizeMode='contain' style={styles.icon} />
            <SmallText text={text} customStyle={{ color: AppColors.placeholderColor }} />
        </View>
    )
}

export default PassValidater

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 5
    },
    icon: {
        width: 20,
        height: 20,
        marginHorizontal: 5
    }
})