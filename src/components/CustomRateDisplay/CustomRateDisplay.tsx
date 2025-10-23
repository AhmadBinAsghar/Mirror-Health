import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AppColors } from '../../assets/colors/AppColors'
import GradiantProgressBar from '../CustomProgressBar/GradiantProgressBar'
import LargeText from '../AppText/LargeText'
import { AppFonts } from '../../constants/AppFonts'
import NormalText from '../AppText/NormalText'
import SmallText from '../AppText/SmallText'
import AppButton from '../Button/AppButton'
import LottieView from 'lottie-react-native'
import TypeWriter from '../Typewriter/TypeWriter'

interface Rate {
    progress: any
    title: string
    min?: any
    max?: any
    btnText?: string
    onBtnPress?: CallableFunction
    selectedAct?: string
    lottie?: boolean
    live?: boolean
    monitering?: boolean
}
const CustomRateDisplay = ({ progress, monitering = false, title, min, max, onBtnPress, btnText = '', selectedAct = '', lottie = false, live = false }: Rate) => {
    return (
        <View style={styles.Wrapper}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: "flex-end" }}>
                    {progress === 0 && monitering === true ? <>
                        <SmallText text={`Calibrating.`} customStyle={{ fontSize: 12, color: AppColors.placeholderColor, fontFamily: AppFonts.GeneralSans.medium }} />
                        <TypeWriter text="..." delay={400} />
                    </>
                        : <>
                            <LargeText text={`${progress === 0 ? "--" : progress}`} customStyle={{ fontSize: 36 }} />
                            <SmallText text={title} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: AppColors.placeholderColor, marginLeft: 10 }} />
                        </>
                    }
                </View>
                <View style={{ flexDirection: 'row', }}>
                    {selectedAct && <View style={{ height: 25, alignItems: "center", justifyContent: "center", paddingHorizontal: 8, backgroundColor: AppColors.babyblue, borderRadius: 50, marginRight: 5 }}>
                        <NormalText text={selectedAct.toLocaleUpperCase()} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, fontSize: 10, color: AppColors.blue }} />
                    </View>}
                    <View style={{ flexDirection: "row" }}>
                        {lottie && <View style={{ backgroundColor: AppColors.background, borderRadius: 100, height: 25, width: 25, alignItems: "center", justifyContent: "center", marginHorizontal: 6 }} >
                            <LottieView source={require('../../assets/lottieFile/heartPulse.json')} speed={1.5} autoPlay={monitering} loop={monitering} style={{ width: 18, height: 18 }} />
                        </View>}
                        {live && <View style={{ height: 25, alignItems: "center", justifyContent: "center", paddingHorizontal: 8, backgroundColor: AppColors.background, borderRadius: 50 }}>
                            <NormalText text='LIVE' customStyle={{ fontFamily: AppFonts.GeneralSans.medium, fontSize: 10 }} />
                        </View>}
                    </View>
                </View>
            </View>
            {title && <GradiantProgressBar progress={progress} min={min} max={max} title={title} />}
            {onBtnPress && <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <AppButton text={btnText} onPress={() => { onBtnPress() }} colors={[AppColors.lightBlue, AppColors.darkBlue]} txtStyle={{ color: AppColors.white }} customStyle={{ borderWidth: 0, width: wp(79) }} containerStyle={{ width: wp(79) }} />
            </View>}
        </View>
    )
}

export default React.memo(CustomRateDisplay)

const styles = StyleSheet.create({
    Wrapper: {
        width: wp(88),
        padding: 15,
        borderWidth: 1,
        borderColor: AppColors.borderColor,
        borderRadius: 16,
        marginVertical: 20,
        alignSelf: "center"
    }
})