import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AppColors } from '../../assets/colors/AppColors'
import { AppFonts } from '../../constants/AppFonts'
import NormalText from '../AppText/NormalText'
import SmallText from '../AppText/SmallText'
import { AppImages } from '../../assets/images/AppImages'
import { LineChart } from 'react-native-gifted-charts'
import ViewMoreModal from '../Modals/ViewMoreModal'

export enum CurveType {
  CUBIC,
  QUADRATIC,
}
interface Graph {
  time: string
  graphData: {
    title?: string
    range?: string
    suf?: string
    status: string
    comp?: string
    content?: string
    data: any[]
    data1?: any[]
    data2?: any[]
  }
}
const GraphDataDisplay = ({ graphData, time }: Graph) => {
  const [showMore, setShowMore] = React.useState<boolean>(false);

  return (
    <View style={styles.wrapper}>
      <ViewMoreModal visible={showMore} onClose={() => { setShowMore(!showMore) }} description={graphData?.content} onContinue={() => { setShowMore(!showMore) }} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: 'flex-end', justifyContent: 'center' }}>
          {graphData?.range && <NormalText text={graphData?.range ?? ''} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, fontSize: graphData?.suf === " m" ? 30 : 30, lineHeight: 36 }} />}
          {graphData?.title && <SmallText text={graphData?.title ?? ''} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: AppColors.placeholderColor, marginLeft: 10 }} />}
        </View>
        <TouchableOpacity style={{ marginTop: -6 }} activeOpacity={0.8} onPress={() => { setShowMore(!showMore) }}>
          <SmallText text='What’s this?' customStyle={{ backgroundColor: AppColors.babyblue, color: AppColors.blue, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 100, fontFamily: AppFonts.GeneralSans.semiBold, fontSize: 12 }} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 6 }}>
        {graphData?.status && <Image source={graphData?.status === "Good" || graphData?.status === "Better than yesterday" ? AppImages.greenArrow : AppImages.checkAlert} resizeMode='contain' style={{ width: 20, height: 20 }} />}
        {graphData.comp ? <SmallText text={graphData.comp} customStyle={{ fontSize: 12, fontFamily: AppFonts.GeneralSans.medium, marginLeft: 5, color: graphData.status === "Good" || "Better than yesterday" ? AppColors.green : AppColors.red }} />
          : <SmallText text={graphData.status} customStyle={{ fontSize: 12, fontFamily: AppFonts.GeneralSans.medium, marginLeft: 5, color: graphData.status === "Good" || "Better than yesterday" ? AppColors.green : AppColors.red }} />}
      </View>
      <View style={styles.graph}>
        {graphData?.data && graphData?.data?.length > 0 && (
          <LineChart
            scrollToEnd={true}
            noOfVerticalLines={graphData?.data?.length ?? 0}
            showVerticalLines
            areaChart
            curveType={CurveType.QUADRATIC}
            onlyPositive
            yAxisLabelSuffix={graphData?.suf ? graphData?.suf : ''}
            startFillColor={AppColors.lightBlue}
            endFillColor1={AppColors.lighGrey}
            startOpacity={0.6}
            endOpacity={0.4}
            verticalLinesColor={AppColors.borderColor}
            noOfSections={6}
            yAxisTextStyle={{ fontSize: 11, color: AppColors.placeholderColor, fontFamily: AppFonts.GeneralSans.regular }}
            xAxisColor={AppColors.transparent}
            yAxisColor={AppColors.transparent}
            initialSpacing={5}
            data={graphData?.data?.slice(0, 40) ?? []}
            color={AppColors.blue}
            dashWidth={0}
            curved hideDataPoints={false}
            dataPointsColor={AppColors.blue}
            thickness={2}
            height={120}
            focusEnabled
            xAxisThickness={0}
            showTextOnFocus={true}
            focusedDataPointShape="square"
            focusedDataPointWidth={50}
            focusedDataPointHeight={50}
            focusedDataPointColor={AppColors.white}
            focusedDataPointRadius={6}
            delayBeforeUnFocus={1000}
            focusedCustomDataPoint={(item: any) => {
              return (item?.value != 0 ?
                <View style={styles.tooltip}>
                  <View style={styles.tiphead}>
                    <SmallText text={`${item?.value}${graphData?.suf ?? ''}`} />
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
            xAxisLabelTextStyle={{ color: AppColors.placeholderColor, fontSize: 7, textTransform: "uppercase" }}
          />
        )}
      </View>
    </View>
  )
}

export default React.memo(GraphDataDisplay)

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
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: 'center',
    // transform: [{ scaleX: -1 }]
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modal: {
    justifyContent: 'center',  // Center the modal in the chart container
    alignItems: 'center',
  },
  tooltip: {
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