import { Image, Platform, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppColors } from '../../../../assets/colors/AppColors'
import en from '../../../../../translation/en.json';
import { AppFonts } from '../../../../constants/AppFonts';
import AppHeader from '../../../../components/Header/AppHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import SmallText from '../../../../components/AppText/SmallText';
import { AppImages } from '../../../../assets/images/AppImages';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GraphDataDisplay from '../../../../components/GraphDataDisplay/GraphDataDisplay';
import NormalText from '../../../../components/AppText/NormalText';
import moment from 'moment';
import DateTimePicker from 'react-native-ui-datepicker';
import ViewMoreSkeleton from '../../../../components/Skeletons/ViewMoreSkeleton';
import { API_REQUEST } from '../../../../network/NetworkRequest';
import { endPoints } from '../../../../network/endPoints';

const ViewMore = () => {
    const navigation: any = useNavigation();
    const route: any = useRoute();
    const name = route?.params?.name;
    const [time, setTime] = React.useState<string>('Week');
    const [showClnder, setShowClnder] = React.useState<boolean>(false);
    const [TimeSpan, setTimeSpan] = React.useState<string[]>([]);
    const [StartDate, setStart] = React.useState<string>('');
    const [EndDate, setEnd] = React.useState<string>('');
    const [onLoad, setOnLoad] = React.useState<boolean>(true);
    const [rangeData, setRangeData] = React.useState<any[]>([]);
    const [avg, setAvg] = React.useState<number>(0);

    function calculateAverage(values: number[]): number {
        const nonZeroValues = values.filter(value => value !== 0);
        const sum = nonZeroValues.reduce((acc, value) => acc + value, 0);
        return nonZeroValues.length ? sum / nonZeroValues.length : 0;
    }

    const scoreCalculation = (data: any[]) => {
        if (name === "My Heart Health") {
            const mapedData = data?.map((item: any) => item?.cardicScore && Math.floor(item?.cardicScore))
            setAvg(calculateAverage(mapedData))
            setRangeData(mapedData);
        } else if (name === "My Respiratory Health") {
            const mapedData = data?.map((item: any) => item?.respiratoryScore && Math.floor(item?.respiratoryScore))
            setAvg(calculateAverage(mapedData))
            setRangeData(mapedData);
        } else if (name === 'My Sleep Health') {
            const mapedData = data?.map((item: any) => item?.sleepScore && Math.floor(item?.sleepScore))
            setAvg(calculateAverage(mapedData))
            setRangeData(mapedData);
        } else if (name === 'My Activity Score') {
            const mapedData = data?.map((item: any) => item?.activityScore && Math.floor(item?.activityScore))
            setAvg(calculateAverage(mapedData))
            setRangeData(mapedData);
        } else if (name === 'My Stress Score') {
            const mapedData = data?.map((item: any) => item?.stressScore && Math.floor(item?.stressScore))
            setAvg(calculateAverage(mapedData))
            setRangeData(mapedData);
        } else if (name === 'My Immune System Score') {
            const mapedData = data?.map((item: any) => item?.immuneScore && Math.floor(item?.immuneScore))
            setAvg(calculateAverage(mapedData))
            setRangeData(mapedData);
        }
    }

    const GetRangeScoreData = async (from: any, to: any) => {
        try {
            const data = {
                from: from,
                to: to
            }
            console.log(data);

            API_REQUEST("POST", endPoints.getScores, data,
                ((sucess: any) => {
                    // console.log(JSON.stringify(sucess?.data));
                    scoreCalculation(sucess?.data ?? [])
                    setOnLoad(false);
                }),
                ((error: any) => {
                    setOnLoad(false);
                    console.log(error);
                })
            );
        } catch (e) {
            setOnLoad(false);
            console.log(e);
        }
    }

    React.useEffect(() => {
        GetRangeScoreData(moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD'));
        setInterval(() => {
            setOnLoad(false);
        }, 2000);
    }, [])

    const GraphsData = [
        {
            id: 1,
            title: "out of 100",
            range: avg ? Math.floor(avg) : 0,
            status: "",
            comp: "",
            data: rangeData?.map((item: any) => ({ value: item })) ?? []
            // data: [{ value: 40 }, { value: 30 }, { value: 54 }, { value: 10 }, { value: 24 }, { value: 30 }, { value: 76 }],
        },
    ]
    return (
        <View style={styles.wrapper}>
            <StatusBar barStyle={'dark-content'} />
            <AppHeader onBackPress={() => { navigation.goBack() }} title={en.Headings.Viewmore} wrapperStyle={{ marginTop: 10 }} />
            {onLoad ? (
                <ViewMoreSkeleton />
            ) : (
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: Platform.OS == 'ios' ? 30 : 12 }}
                >
                    <NormalText text={name} customStyle={{ fontSize: 20, fontFamily: AppFonts.GeneralSans.semiBold, marginVertical: 20, paddingLeft: 20 }} />
                    <View style={styles.DateView}>
                        <View style={styles.genderView}>
                            <TouchableOpacity onPress={() => setTime("Week")} style={[styles.genderBtn, { backgroundColor: time === "Week" ? AppColors.white : AppColors.transparent }]}>
                                <SmallText text={en.MetricsModules.Week} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: time === "Week" ? AppColors.black : AppColors.placeholderColor }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setTime("Month"); GetRangeScoreData(moment().subtract(1, 'M').format('YYYY-MM-DD'), moment().subtract(1, 'day').format('YYYY-MM-DD')) }} style={[styles.genderBtn, { backgroundColor: time === "Month" ? AppColors.white : AppColors.transparent }]}>
                                <SmallText text={en.MetricsModules.Month} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: time === "Month" ? AppColors.black : AppColors.placeholderColor }} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { setShowClnder(!showClnder) }} style={styles.DateBtn}>
                            <SmallText text={en.MetricsModules.Date} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
                            <Image source={AppImages.clnderBlack} resizeMode="contain" style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                    {showClnder && <View style={styles.clnder}>
                        <DateTimePicker
                            mode="range"
                            maxDate={new Date()}
                            startDate={StartDate}
                            endDate={EndDate}
                            height={hp(34)}
                            weekDaysTextStyle={{ color: AppColors.black }}
                            headerTextStyle={{ color: AppColors.black }}
                            calendarTextStyle={{ color: AppColors.black }}
                            selectedItemColor={AppColors.blue}
                            onChange={({ startDate, endDate }: any) => {
                                setStart(startDate);
                                setEnd(endDate);
                            }}
                        />
                        {StartDate && EndDate && <TouchableOpacity activeOpacity={0.8} onPress={() => { setShowClnder(!showClnder); GetRangeScoreData(moment(StartDate?.toLocaleString()).format('YYYY-MM-DD'), moment(EndDate?.toLocaleString()).format('YYYY-MM-DD')); }} style={styles.calnderFooter}>
                            <NormalText text={`Select Date Range ${moment(StartDate?.toLocaleString()).format('MM-DD')} / ${moment(EndDate?.toLocaleString()).format('MM-DD')}`} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, color: AppColors.white, marginRight: 4 }} />
                            <Image source={AppImages.trip} resizeMode='contain' style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>}
                    </View>}
                    {GraphsData.map((graph) => (
                        graph?.data?.length > 0 ?
                            <GraphDataDisplay key={graph.id} graphData={graph} time={time} />
                            : <View style={{ width: wp(85), alignItems: "center", justifyContent: "center", height: 160, alignSelf: "center" }}>
                                <SmallText text='No Score Data' />
                            </View>
                    ))}
                </ScrollView>
            )}
        </View>
    )
}

export default ViewMore

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: AppColors.white,
        paddingTop: 30
    },
    DateView: {
        width: wp(88),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
    },
    genderView: {
        flexDirection: 'row',
        width: wp(66),
        height: hp(6),
        padding: 2,
        borderRadius: 12,
        backgroundColor: AppColors.dimGrey,
        alignItems: 'center',
        justifyContent: "space-between"
    },
    genderBtn: {
        width: wp(32), height: hp(5.3),
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center'
    },
    DateBtn: {
        width: wp(20), height: hp(6),
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        paddingHorizontal: 8,
        borderColor: AppColors.borderColor
    },
    clnder: {
        width: wp(88),
        marginTop: 6,
        borderWidth: 1,
        borderColor: AppColors.borderColor,
        borderRadius: 16,
        padding: 10,
        alignSelf: "center",
    },
    calnderFooter: {
        width: wp(88),
        height: hp(7),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: AppColors.blue,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: -10
    }
})