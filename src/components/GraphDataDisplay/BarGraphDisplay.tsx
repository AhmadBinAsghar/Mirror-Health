import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AppColors } from '../../assets/colors/AppColors'
import { AppFonts } from '../../constants/AppFonts'
import NormalText from '../AppText/NormalText'
import SmallText from '../AppText/SmallText'
import { AppImages } from '../../assets/images/AppImages'
import { BarChart } from 'react-native-gifted-charts'
import ViewMoreModal from '../Modals/ViewMoreModal'

interface Graph {
    time: string
    suf: string
    graphData: {
        title: string
        range: string
        status: string
        comp?: string
        content?: string
        data: any[]
        data1?: any[]
        data2?: any[]
    }
}
const BarGraphDisplay = ({ graphData, time, suf }: Graph) => {

    const [showMore, setShowMore] = React.useState<boolean>(false);
    return (
        <View style={styles.wrapper}>
            <ViewMoreModal visible={showMore} onClose={() => { setShowMore(!showMore) }} description={graphData?.content} onContinue={() => { setShowMore(!showMore) }} />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: 'flex-end', justifyContent: 'center' }}>
                    <NormalText text={graphData?.range ?? 0} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, fontSize: 30, lineHeight: 36 }} />
                    <SmallText text={graphData?.title} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: AppColors.placeholderColor, marginLeft: 10 }} />
                </View>
                <TouchableOpacity style={{ marginTop: -8, position: "absolute", right: 0 }} activeOpacity={0.8} onPress={() => { setShowMore(!showMore) }}>
                    <SmallText text='What’s this?' customStyle={{ backgroundColor: AppColors.babyblue, color: AppColors.blue, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 100, fontFamily: AppFonts.GeneralSans.semiBold, fontSize: 12 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 6 }}>
                {graphData?.status && <Image source={graphData?.status === "Good" ? AppImages.greenArrow : AppImages.checkAlert} resizeMode='contain' style={{ width: 20, height: 20 }} />}
                {graphData?.comp ? <SmallText text={graphData?.comp} customStyle={{ fontSize: 12, fontFamily: AppFonts.GeneralSans.medium, marginLeft: 5, color: graphData?.status === "Good" ? AppColors.green : AppColors.red }} />
                    : <SmallText text={graphData?.status} customStyle={{ fontSize: 12, fontFamily: AppFonts.GeneralSans.medium, marginLeft: 5, color: graphData?.status === "Good" ? AppColors.green : AppColors.red }} />}
            </View>
            <View style={styles.graph}>
                {graphData?.data && (
                    <>
                        <BarChart
                            scrollToEnd={true}
                            xAxisLabelTextStyle={{ color: AppColors.placeholderColor, fontSize: 7, width: 35, textTransform: "uppercase", marginLeft: graphData?.title === "Sleep duration" ? -4 : 0 }}
                            barWidth={16}
                            frontColor={AppColors.blue}
                            barBorderRadius={5}
                            showVerticalLines
                            showValuesAsTopLabel={true}
                            topLabelTextStyle={{ fontSize: 8, color: AppColors.placeholderColor, fontFamily: AppFonts.GeneralSans.regular }}
                            renderTooltip={(item: any) => {
                                return (item?.stacks[0]?.value != 0 ?
                                    <View style={styles.tooltip}>
                                        <View style={styles.tiphead}>
                                            <SmallText text={`${item?.stacks[0]?.value}${suf ?? ''}`} />
                                            <SmallText text={graphData?.title} customStyle={{ fontSize: 8, textAlignVertical: "bottom", marginLeft: 3 }} />
                                        </View>
                                        <View style={{ backgroundColor: AppColors.borderColor, flex: 1, height: 1, marginVertical: 2 }} />
                                        <SmallText text={item?.label} customStyle={{ alignSelf: "center", fontSize: 9, textTransform: "uppercase" }} />
                                    </View> :
                                    <View style={[{ top: -30, flex: 1, backgroundColor: AppColors.white, position: "absolute", borderRadius: 3, elevation: 7 }]}>
                                        <SmallText text='No Record!' customStyle={{ fontSize: 8, margin: 4 }} />
                                    </View>
                                )
                            }}
                            verticalLinesColor={AppColors.borderColor}
                            noOfSections={6}
                            yAxisTextStyle={{ fontSize: 11, color: AppColors.placeholderColor, fontFamily: AppFonts.GeneralSans.regular }}
                            yAxisLabelSuffix={suf}
                            xAxisColor={AppColors.transparent}
                            yAxisColor={AppColors.transparent}
                            initialSpacing={graphData?.title === "Sleep duration" ? wp(8) : 0}
                            stackData={graphData?.data ?? []}
                            color={AppColors.blue}
                            dashWidth={0}
                            height={hp(16)}
                            spacing={35}
                        />
                        <View style={{ width: wp(60), height: 3, borderRadius: 100, backgroundColor: AppColors.borderColor, position: 'absolute', bottom: hp(8.2) }} />
                    </>
                )}
            </View>
            {graphData?.title === "Sleep duration" ? <View style={{ flexDirection: 'row', width: wp(65), alignSelf: 'center', justifyContent: "space-between", alignItems: "center", marginTop: 15 }}>
                <View style={{ width: 10, height: 10, backgroundColor: AppColors.SkyBlue, borderRadius: 2 }} />
                <SmallText text='Light' customStyle={{ fontSize: 12, fontFamily: AppFonts.GeneralSans.medium }} />
                <View style={{ width: 10, height: 10, backgroundColor: AppColors.DeepBlue, borderRadius: 2 }} />
                <SmallText text='Deep' customStyle={{ fontSize: 12, fontFamily: AppFonts.GeneralSans.medium }} />
                <View style={{ width: 10, height: 10, backgroundColor: AppColors.lightBlue, borderRadius: 2 }} />
                <SmallText text='REM' customStyle={{ fontSize: 12, fontFamily: AppFonts.GeneralSans.medium }} />
                <View style={{ width: 10, height: 10, backgroundColor: AppColors.borderColor, borderRadius: 2 }} />
                <SmallText text='Awake' customStyle={{ fontSize: 12, fontFamily: AppFonts.GeneralSans.medium }} />
            </View> :
                <View style={{ flexDirection: 'row', width: wp(65), alignSelf: 'center', justifyContent: "space-between", alignItems: "center", marginTop: 15 }}>
                    <View style={{ width: 10, height: 10, backgroundColor: AppColors.red, borderRadius: 2 }} />
                    <SmallText text='HR' customStyle={{ fontSize: 12, fontFamily: AppFonts.GeneralSans.medium }} />
                    <View style={{ width: 10, height: 10, backgroundColor: AppColors.darkBlue, borderRadius: 2 }} />
                    <SmallText text='Steps' customStyle={{ fontSize: 12, fontFamily: AppFonts.GeneralSans.medium }} />
                    <View style={{ width: 10, height: 10, backgroundColor: AppColors.orange, borderRadius: 2 }} />
                    <SmallText text='KCal' customStyle={{ fontSize: 12, fontFamily: AppFonts.GeneralSans.medium }} />
                    <View style={{ width: 10, height: 10, backgroundColor: AppColors.lightBlue, borderRadius: 2 }} />
                    <SmallText text='Distance' customStyle={{ fontSize: 12, fontFamily: AppFonts.GeneralSans.medium }} />
                </View>}
        </View>
    )
}

export default React.memo(BarGraphDisplay)

const styles = StyleSheet.create({
    wrapper: {
        width: wp(88),
        alignSelf: "center",
        padding: 20,
        borderWidth: 1,
        borderColor: AppColors.borderColor,
        borderRadius: 16,
        marginTop: 10
    },
    graph: {
        marginTop: 10,
        backgroundColor: AppColors.lighGrey,
        borderRadius: 12,
        paddingTop: 10,
        alignItems: "center",
        justifyContent: 'center',
        paddingBottom: 10,
    }, tooltip: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 6,
        borderRadius: 5,
        elevation: 5,
        zIndex: 999
    },
    tooltipText: {
        fontSize: 16,
    },
    tiphead: {
        flexDirection: "row"
    }
})