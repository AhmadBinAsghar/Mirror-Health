import { Image, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { AppImages } from '../../assets/images/AppImages'
import NormalText from '../AppText/NormalText'
import { AppFonts } from '../../constants/AppFonts'
import { AppColors } from '../../assets/colors/AppColors'

interface Header {
    onBackPress?: CallableFunction
    onThreeDots?: CallableFunction
    onCrossPress?: CallableFunction
    onPlusPress?: CallableFunction
    title: string
    customStyle?: StyleProp<TextStyle>
    wrapperStyle?: StyleProp<ViewStyle>
    iconColor?: string
    selectedOpt?: number
    onBlePress?: CallableFunction
    bleConnected?: boolean
}
const AppHeader = ({ bleConnected = false, onBackPress, title, wrapperStyle, customStyle, onThreeDots, onBlePress, onCrossPress, onPlusPress, iconColor, selectedOpt = 0 }: Header) => {
    return (
        <View style={[styles.container, wrapperStyle]}>
            {onBackPress &&
                <TouchableOpacity hitSlop={10} activeOpacity={0.8} style={[styles.backTouch, { top: 12 }]}
                    onPress={() => onBackPress && onBackPress()}>
                    <Image source={selectedOpt === 4 ? AppImages.out : AppImages.backBlack} tintColor={iconColor ? iconColor : AppColors.black} resizeMode='contain' style={styles.backbutton} />
                </TouchableOpacity>
            }

            {onCrossPress &&
                <TouchableOpacity hitSlop={10} activeOpacity={0.8} style={[styles.backTouch, { top: 12 }]}
                    onPress={() => onCrossPress && onCrossPress()}
                >
                    <Image source={AppImages.crossLarge} resizeMode='contain' tintColor={iconColor ? iconColor : AppColors.grey} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
            }
            {onBlePress && selectedOpt === 4 &&
                <TouchableOpacity hitSlop={10} activeOpacity={0.8} style={{ top: 8, position: "absolute", right: 20 }}
                    onPress={() => onBlePress()}
                >
                    <Image source={bleConnected ? AppImages.bleCtd : AppImages.ble} resizeMode='contain' tintColor={AppColors.black} style={{ width: 18, height: 18 }} />
                </TouchableOpacity>
            }

            {onThreeDots &&
                <TouchableOpacity hitSlop={10} activeOpacity={0.8} style={[styles.DotsTouch, { top: 8 }]}
                    onPress={() => onThreeDots && onThreeDots()}>
                    <Image tintColor={iconColor ? iconColor : AppColors.darkGrey} source={AppImages.more} resizeMode='contain' style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
            }

            {onPlusPress &&
                <TouchableOpacity hitSlop={10} activeOpacity={0.8} style={[styles.DotsTouch, { top: 14 }]}
                    onPress={() => onPlusPress && onPlusPress()}>
                    <Image tintColor={iconColor ? iconColor : AppColors.darkGrey} source={AppImages.plusBlack} resizeMode='contain' style={{ width: 15, height: 15 }} />
                </TouchableOpacity>
            }
            <NormalText text={title} customStyle={[{ fontFamily: AppFonts.GeneralSans.medium }, customStyle]} />
        </View>
    )
}

export default AppHeader