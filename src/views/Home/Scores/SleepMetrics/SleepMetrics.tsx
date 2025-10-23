import { Image, Platform, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './styles';
import en from '../../../../../translation/en.json';
import MetricsWrapper from '../../../../components/MetricsWrapper/MetricsWrapper';
import { AppColors } from '../../../../assets/colors/AppColors';
import AppHeader from '../../../../components/Header/AppHeader';
import { AppFonts } from '../../../../constants/AppFonts';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SmallText from '../../../../components/AppText/SmallText';
import LargeText from '../../../../components/AppText/LargeText';
import { AppImages } from '../../../../assets/images/AppImages';
import NormalText from '../../../../components/AppText/NormalText';
import moment from 'moment';
import BarGraphDisplay from '../../../../components/GraphDataDisplay/BarGraphDisplay';
import DateTimePicker from 'react-native-ui-datepicker';
import { AppConstants } from '../../../../constants/AppConstants';
import ProgressSkeleton from '../../../../components/Skeletons/ProgressSkeleton';
import MetricsSkeletons from '../../../../components/Skeletons/MetricsSkeletons';
import BleProvider from '../../../../navigations/BleProvider';
import { BleSDK } from '../../../../services/ble/Util/BleSDK';
import { useSelector } from 'react-redux';
import { API_REQUEST } from '../../../../network/NetworkRequest';
import { endPoints } from '../../../../network/endPoints';
import { ViewMoreContent } from '../../../../constants/ViewMoreContent';

interface SleepQualityData {
    GPSTime: string;
    _id: string;
    sleepQuality: {
        one: number;
        two: number;
        three: number;
        four: number;
        five: number;
    };
    totalMinute: number;
    userId: string;
}

type SleepQuality = {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
};

type SleepData = {
    sleepQuality: SleepQuality;
    _id: string;
    userId: string;
    totalMinute: number;
    deviceId: string;
    GPSTime: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

type Session = {
    start: string;
    end: string;
};
interface SleepQualitySums {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
}
interface SleepQualityPercentages {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
}
interface Result {
    percentages: SleepQualityPercentages;
    sums: SleepQualitySums;
    totalSum: number;
    data: SleepQualityData[];
}
const SleepMetrics = () => {
    const { SleepToday, loadingSleep, errorSleep } = useSelector((state: any) => state.userData);
    const navigation: any = useNavigation();
    const [time, setTime] = React.useState<string>('Today');
    const route: any = useRoute();
    const { routeData } = route.params ?? 0;
    const { asof } = route.params ?? '';
    const [progress, setProgress] = React.useState<number>(routeData);
    const [showClnder, setShowClnder] = React.useState<boolean>(false);
    const [StartDate, setStart] = React.useState<string>('');
    const [EndDate, setEnd] = React.useState<string>('');
    const [todaysData, setTodaysData] = React.useState<any>(SleepToday);
    const [rangeData, setRangeData] = React.useState<any>();
    // const [depth, setDepth] = React.useState<any>(0);
    const [sleepDur, setSleepDur] = React.useState<any>(0)
    const [recomendationsData, setRecomendationsData] = React.useState<any[]>([])
    const Ble = BleProvider();

    const getRecomendations = () => {
        const data = {
            type: "sleep",
        }
        API_REQUEST("POST", endPoints.recommendation, data,
            ((success: any) => {
                // console.log("Recomendations :: ", success?.data);
                setRecomendationsData(success?.data);
            }),
            ((error: any) => {
                console.log("ERROR in Recomendtions :: ", error)
            })
        )
    }
    // const getDepth = () => {
    //     try {
    //         API_REQUEST("GET", endPoints.sleepDepth, null,
    //             ((sucess: any) => {
    //                 // console.log("Last night sleep data ====================", sucess)
    //                 setDepth(Number(sucess?.data?.toFixed(2)));
    //             }),
    //             ((error: any) => {
    //                 console.log(error)
    //             })
    //         )
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    const GetRangeData = async (from: any, to: any) => {
        try {
            const data = {
                from: from,
                to: to
            }

            API_REQUEST("POST", endPoints.sleepTimly, data,
                ((sucess: any) => {
                    // console.log(JSON.stringify(sucess?.data));
                    setSleepDur(Math.floor(parseInt(sucess?.data?.totalMinutes) ?? 0))
                    setRangeData(sucess?.data);
                }),
                ((error: any) => {
                    console.log(error);
                })
            );
        } catch (e) {
            console.log(e);
        }
    }

    React.useEffect(() => {
        getRecomendations();
        // getDepth();
        GetRangeData(moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD'));
        Ble.writeOnDevice([...BleSDK.GetDetailSleepDataWithMode(0, moment().format('yyyy-MM-dd HH:mm:ss'))]);
    }, [])

    const formatDuration = (totalMinutes: any) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.floor(totalMinutes % 60);
        if (totalMinutes) {
            if (hours > 0) {
                return `${hours} h`; // Show hours only if greater than 0
            } else {
                return `${minutes} min`; // Show minutes otherwise
            }
        } else {
            return "0 min"; // Show 0 minutes if totalSeconds is 0
        }
    };

    const processSleepData = (data: SleepData[]): { sessions: any, totalTime: string } => {
        if (!Array.isArray(data) || data.length === 0) return { sessions: [], totalTime: "0 min" };

        // Parse data and sort by GPSTime
        const sortedData = data
            .map((item) => ({
                ...item,
                GPSTime: item.GPSTime ? new Date(item.GPSTime) : null,
                endTime: item.GPSTime && item.totalMinute ? new Date(new Date(item.GPSTime).getTime() + item.totalMinute * 60000) : null,
            }))
            .sort((a, b) => (a.GPSTime && b.GPSTime ? a.GPSTime.getTime() - b.GPSTime.getTime() : 0));

        const sessions: { start: Date; end: Date }[] = [];
        let currentSession:any = [sortedData[0]];

        for (let i = 1; i < sortedData.length; i++) {
            const prevEndTime = currentSession[currentSession.length - 1].endTime;
            const currentStartTime = sortedData[i].GPSTime;

            if (prevEndTime && currentStartTime && (currentStartTime.getTime() - prevEndTime.getTime()) / 1000 > 30 * 60) {
                sessions.push({
                    start: currentSession[0].GPSTime,
                    end: currentSession[currentSession.length - 1].endTime,
                });
                currentSession = [sortedData[i]];
            } else {
                currentSession.push(sortedData[i]);
            }
        }

        if (currentSession.length > 0) {
            const finalStart = currentSession[0]?.GPSTime;
            const finalEnd = currentSession[currentSession.length - 1]?.endTime;

            if (finalStart && finalEnd) {
                sessions.push({
                    start: finalStart,
                    end: finalEnd,
                });
            }
        }

        const totalMinutes = sessions.reduce((sum, session) => {
            const sessionStart = session.start;
            const sessionEnd = session.end;
            return sum + (sessionEnd && sessionStart ? (sessionEnd.getTime() - sessionStart.getTime()) / (1000 * 60) : 0);
        }, 0);

        const totalTime = `${Math.floor(totalMinutes / 60)}hr ${Math.round(totalMinutes % 60)}min`;

        return { sessions, totalTime };
    };

    const processedSleepData = processSleepData(todaysData)

    const calculateSleepQualityPercentages = (data: SleepQualityData[]): Result | string => {
        // const sums: SleepQualitySums = { one: 0, two: 0, three: 0, four: 0, five: 0 };
        const sums: SleepQualitySums = { one: 0, two: 0, three: 0, four: 0, five: 0 };
        if (!Array.isArray(data) || data.length === 0) return "No data available.";

        try {
            // Calculate sums
            data.forEach((item) => {
                if (!item.sleepQuality) {
                    throw new Error(`Missing sleepQuality in item with ID: ${item._id}`);
                }
                Object.keys(sums).forEach((key) => {
                    const value = item.sleepQuality[key as keyof SleepQualitySums];
                    if (typeof value !== "number") {
                        throw new Error(`Invalid sleep quality value for ${key} in item with ID: ${item._id}`);
                    }
                    sums[key as keyof SleepQualitySums] += value;
                });
            });
            // Calculate the total sum of all sleep quality values
            const totalSum = sums.one + sums.two + sums.three + sums.four + sums.five;
            // Handle case where totalSum is zero to avoid division by zero
            if (totalSum === 0) {
                throw new Error("Total sum of sleep qualities is zero, cannot calculate percentages.");
            }
            // Calculate integer percentages for each sleep quality
            const percentages: SleepQualityPercentages = {
                one: Math.round((sums.one / totalSum) * 100),
                two: Math.round((sums.two / totalSum) * 100),
                three: Math.round((sums.three / totalSum) * 100),
                four: Math.round((sums.four / totalSum) * 100),
                five: Math.round((sums.five / totalSum) * 100),
            };
            return {
                percentages,
                sums,
                totalSum,
                data,
            };
        } catch (error) {
            // Return error message if any issue occurs
            return `Error: ${error ?? ''}`;
        }
    };

    const processDynamicSleepData = (rangeData: any) => {
        try {
            // Check if rangeData or its sleepData property is missing
            if (!rangeData || !rangeData.sleepData) {
                console.error("Invalid rangeData: 'sleepData' property is missing or undefined.");
                return {};  // Return an empty object if data is invalid
            }

            // Initialize sums for overall sleepQuality fields
            const overallSummedSleepQuality = {
                one: 0,
                two: 0,
                three: 0,
                four: 0,
                five: 0
            };

            // Iterate over each key and sum the sleepQuality values
            Object.keys(rangeData.sleepData).forEach((key) => {
                const items = rangeData.sleepData[key];

                // Check if the data for the key is an array
                if (!Array.isArray(items)) {
                    console.error(`Invalid data for key '${key}': Expected an array.`);
                    return;
                }

                // Sum sleepQuality values across all objects in the array for the current date
                items.forEach((item: any, index: number) => {
                    try {
                        if (!item || !item.sleepQuality) {
                            console.error(`Invalid sleepQuality data at index ${index} for key '${key}'.`);
                            return;
                        }

                        // Ensure sleepQuality fields are valid numbers
                        overallSummedSleepQuality.one += parseInt(item.sleepQuality.one) || 0;
                        overallSummedSleepQuality.two += parseInt(item.sleepQuality.two) || 0;
                        overallSummedSleepQuality.three += parseInt(item.sleepQuality.three) || 0;
                        overallSummedSleepQuality.four += parseInt(item.sleepQuality.four) || 0;
                        overallSummedSleepQuality.five += parseInt(item.sleepQuality.five) || 0;
                    } catch (innerError) {
                        console.error(`Error processing item at index ${index} for key '${key}':`, innerError);
                    }
                });
            });

            // Calculate the total sum of all sleep qualities
            const totalSum = overallSummedSleepQuality.one +
                overallSummedSleepQuality.two +
                overallSummedSleepQuality.three +
                overallSummedSleepQuality.four +
                overallSummedSleepQuality.five;

            // Check if the total sum is zero to avoid division by zero
            if (totalSum === 0) {
                console.error("Total sum of sleep qualities is zero. Cannot calculate percentages.");
                return {};  // Return an empty object if there's no valid data
            }

            // Calculate the percentage for each sleep quality, rounding to nearest integer
            const sleepQualityPercentages = {
                one: Math.round((overallSummedSleepQuality.one / totalSum) * 100),
                two: Math.round((overallSummedSleepQuality.two / totalSum) * 100),
                three: Math.round((overallSummedSleepQuality.three / totalSum) * 100),
                four: Math.round((overallSummedSleepQuality.four / totalSum) * 100),
                five: Math.round((overallSummedSleepQuality.five / totalSum) * 100)
            };

            return sleepQualityPercentages;

        } catch (error) {
            console.error("Error processing and summing sleep data:", error);
            return {};  // Return an empty object on error
        }
    };
    const sleepSum :any = calculateSleepQualityPercentages(todaysData)
    const RangedSum :any = processDynamicSleepData(rangeData)

    const GraphsData = [
        {
            id: 1,
            title: "Sleep duration",
            range: processedSleepData?.totalTime,
            status: "",
            content: ViewMoreContent?.SleepMetrics?.Sleep,
            data: [
                { stacks: [{ value: sleepSum?.percentages?.one ?? 0, color: AppColors.SkyBlue }], label: "Light" },
                { stacks: [{ value: sleepSum?.percentages?.two ?? 0, color: AppColors.DeepBlue }], label: "Deep" },
                { stacks: [{ value: sleepSum?.percentages?.three ?? 0, color: AppColors.lightBlue }], label: "Rem" },
                { stacks: [{ value: sleepSum?.percentages?.five ?? 0, color: AppColors.borderColor }], label: "Awake" },
            ]
        },
    ]
    const RangeGraphsData = [
        {
            id: 1,
            title: "Sleep duration",
            range: formatDuration(sleepDur),
            status: "",
            content: ViewMoreContent?.SleepMetrics?.Sleep,
            data: [
                { stacks: [{ value: RangedSum?.one ?? 0, color: AppColors.SkyBlue }], label: "Light" },
                { stacks: [{ value: RangedSum?.two ?? 0, color: AppColors.DeepBlue }], label: "Deep" },
                { stacks: [{ value: RangedSum?.three ?? 0, color: AppColors.lightBlue }], label: "Rem" },
                { stacks: [{ value: RangedSum?.five ?? 0, color: AppColors.borderColor }], label: "Awake" },
            ]
        },
    ]

    return (
        <MetricsWrapper color={[AppColors.sleepStart, AppColors.sleepEnd]}>
            <StatusBar barStyle={'light-content'} />
            <AppHeader onBackPress={() => { navigation.goBack() }} iconColor={AppColors.white} title={en.Headings.MySleep} customStyle={{ color: AppColors.white, fontFamily: AppFonts.GeneralSans.semiBold }} wrapperStyle={{ marginTop: Platform.OS == 'android' ? 40 : AppConstants.topInsets }} />
            <ScrollView
                bounces={false}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}>
                {loadingSleep ? (
                    <ProgressSkeleton color={AppColors.sleepEnd} />
                ) : (<>
                    <View style={styles.header}>
                        {asof && <SmallText text={`As of ` + moment(asof).format('MMM DD,yyyy')} customStyle={{ color: AppColors.white, textDecorationLine: 'underline', fontFamily: AppFonts.GeneralSans.italic }} />}
                        <AnimatedCircularProgress
                            size={wp(50)}
                            width={10}
                            fill={progress}
                            rotation={-90}
                            padding={10}
                            lineCap='round'
                            tintColor={AppColors.white}
                            backgroundColor={AppColors.progressBack} />
                        <View style={styles.progresDetails}>
                            <LargeText text={`${progress}`} customStyle={{ fontFamily: AppFonts.GeneralSans.bold, fontSize: 70, letterSpacing: -2, color: AppColors.white }} />
                            <SmallText text='out of 100' customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: AppColors.dimWhite }} />
                        </View>
                    </View>
                    {/* <View style={styles.ViewMore}>
                        <Image source={AppImages.arrowRed} resizeMode='contain' style={{ width: 25, height: 25 }} />
                        <SmallText text='5%' customStyle={{ color: AppColors.red, fontFamily: AppFonts.GeneralSans.semiBold }} />
                        <SmallText text='worse than last week' customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
                        <View style={styles.VertSeperater} />
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate(AppRoutes.ViewMore, { name: en.Headings.MySleep }) }}>
                            <SmallText text='View More' customStyle={{ color: AppColors.placeholderColor, fontFamily: AppFonts.GeneralSans.semiBold }} />
                        </TouchableOpacity>
                    </View> */}
                </>)}
                <View style={styles.DetailsView}>
                    {loadingSleep ? (
                        <MetricsSkeletons color={AppColors.sleepEnd} />
                    ) : (<>
                        <NormalText text={en.MetricsModules.Recommendations} customStyle={{ fontSize: 20, fontFamily: AppFonts.GeneralSans.semiBold, paddingLeft: 23 }} />
                        <ScrollView
                            horizontal
                            overScrollMode='never'
                            contentContainerStyle={{ paddingLeft: 20 }}
                            showsHorizontalScrollIndicator={false}
                        >
                            {recomendationsData.length > 0 ? recomendationsData.map((reco) => (
                                <View key={reco.id} style={styles.recoView}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <SmallText text={reco?.title} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
                                    </View>
                                    <SmallText text={reco?.description} customStyle={{ marginTop: 8, color: AppColors.placeholderColor, width: wp(60) }} />
                                </View>
                            )) :
                                <View style={{ width: wp(85), alignItems: "center", justifyContent: "center", height: 160, alignSelf: "center" }}>
                                    <SmallText text='No Recommendations' />
                                </View>
                            }
                        </ScrollView>
                        <NormalText text={en.MetricsModules.SleepDebt} customStyle={{ fontSize: 20, fontFamily: AppFonts.GeneralSans.semiBold, paddingLeft: 23 }} />
                        <View style={styles.RangeWrap}>
                            <NormalText text='Sleep Duration:' customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />

                            <LargeText text={processedSleepData?.totalTime} customStyle={{ fontSize: 36 }} />
                            {processedSleepData && processedSleepData?.sessions?.length > 0 ? <>
                                <NormalText text='From:' customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, marginBottom: 5 }} />
                                <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
                                    {processedSleepData?.sessions?.map((range: any, index: number) => {
                                        const LastIndex = index === processedSleepData?.sessions?.length - 1
                                        return (<>
                                            <SmallText
                                                text={`${moment(range?.start).format('ddd HH:mm A')} - ${moment(range?.end).format('ddd HH:mm A')}${LastIndex ? '.' : ', '}`}
                                                customStyle={{ fontFamily: AppFonts.GeneralSans.medium, marginBottom: 4 }}
                                            />
                                        </>
                                        );
                                    })}
                                </View></> : null
                            }

                        </View>
                        <View style={styles.seperater} />
                        <NormalText text={en.MetricsModules.Historicalrecords} customStyle={{ fontSize: 20, fontFamily: AppFonts.GeneralSans.semiBold, marginVertical: 20, paddingLeft: 23 }} />
                        <View style={styles.DateView}>
                            <View style={styles.genderView}>
                                <TouchableOpacity onPress={() => setTime("Today")} style={[styles.genderBtn, { backgroundColor: time === "Today" ? AppColors.white : AppColors.transparent }]}>
                                    <SmallText text={en.MetricsModules.Today} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: time === "Today" ? AppColors.black : AppColors.placeholderColor }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setTime("Week"); GetRangeData(moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD')) }} style={[styles.genderBtn, { backgroundColor: time === "Week" ? AppColors.white : AppColors.transparent }]}>
                                    <SmallText text={en.MetricsModules.Week} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: time === "Week" ? AppColors.black : AppColors.placeholderColor }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setTime("Month"); GetRangeData(moment().subtract(1, 'M').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD')) }} style={[styles.genderBtn, { backgroundColor: time === "Month" ? AppColors.white : AppColors.transparent }]}>
                                    <SmallText text={en.MetricsModules.Month} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, color: time === "Month" ? AppColors.black : AppColors.placeholderColor }} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => { setShowClnder(!showClnder), GetRangeData(moment(StartDate?.toLocaleString()).format('YYYY-MM-DD'), moment(EndDate?.toLocaleString()).format('YYYY-MM-DD')), setTime("Range") }} style={styles.DateBtn}>
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
                            {StartDate && EndDate && <TouchableOpacity activeOpacity={0.8} onPress={() => { setShowClnder(!showClnder), setTime("Range"), GetRangeData(moment(StartDate?.toLocaleString()).format('YYYY-MM-DD'), moment(EndDate?.toLocaleString()).format('YYYY-MM-DD')) }} style={styles.calnderFooter}>
                                <NormalText text={`Select Date Range ${moment(StartDate?.toLocaleString()).format('MM-DD')} / ${moment(EndDate?.toLocaleString()).format('MM-DD')}`} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, color: AppColors.white, marginRight: 4 }} />
                                <Image source={AppImages.trip} resizeMode='contain' style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>}
                        </View>}
                        {time === 'Today' ?
                                GraphsData.map((graph) => (
                                    graph?.data?.length > 0 ?
                                        <BarGraphDisplay key={graph.id} suf={'%'} graphData={graph} time={time} />
                                        : <View style={{ width: wp(85), alignItems: "center", justifyContent: "center", height: 160, alignSelf: "center" }}>
                                            <SmallText text='No Sleep Data' />
                                        </View>
                                ))
                            : rangeData ? (
                                RangeGraphsData.map((graph: any) => (
                                    <BarGraphDisplay key={graph.id} suf={'%'} graphData={graph} time={time} />
                                ))) : (
                                    <View style={{ width: wp(85), alignItems: "center", justifyContent: "center", height: 160, alignSelf: "center" }}>
                                        <SmallText text='No Past Data' />
                                    </View>)}
                    </>)}
                </View>
            </ScrollView>
        </MetricsWrapper>
    )
}

export default SleepMetrics