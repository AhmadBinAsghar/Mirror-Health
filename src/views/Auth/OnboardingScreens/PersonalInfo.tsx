import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AppColors } from '../../../assets/colors/AppColors'
import AppButton from '../../../components/Button/AppButton'
import LargeText from '../../../components/AppText/LargeText'
import NormalText from '../../../components/AppText/NormalText'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import SmallText from '../../../components/AppText/SmallText'
import { AppFonts } from '../../../constants/AppFonts'
import AppInput from '../../../components/TextInput/AppInput'
import { AppImages } from '../../../assets/images/AppImages'
import { Calendar } from 'react-native-calendars'
import HeightModal from '../../../components/Modals/HeightModal'
import WeightModal from '../../../components/Modals/WeightModal'
import en from '../../../../translation/en.json';
import DateTimePicker from 'react-native-ui-datepicker'
import moment from 'moment'
import Helper from '../../../utilis/Helper'
import { useSelector } from 'react-redux'

const RaceOptions = [
    {
        id: 1,
        name: 'Alaska Native'
    },
    {
        id: 2,
        name: 'Asian'
    },
    {
        id: 3,
        name: 'African American'
    },
    {
        id: 4,
        name: 'Native Hawaiian'
    },
    {
        id: 5,
        name: 'White'
    },
]
const PersonalInfo = ({ onContinue }: any) => {
    const [disabled, setDisabled] = React.useState<boolean>(true);
    const UserDetails = useSelector((state: any) => state.userData.userDetails);
    const [gender, setGender] = React.useState<string>(UserDetails?.gender ?? "Male");
    const [dob, setDob] = React.useState<string>(UserDetails?.dob ?? new Date().toDateString());
    const [height, setHeight] = React.useState<string>(UserDetails?.height?.toString() ?? '');
    const [weight, setWeight] = React.useState<string>(UserDetails?.weight?.toString() ?? '');
    const [raceOptional, setRaceOptional] = React.useState<string>(UserDetails?.race ?? '');
    const [showClnder, setShowClnder] = React.useState<boolean>(false);
    const [showHeightModal, setShowHeightModal] = React.useState<boolean>(false);
    const [showWeightModal, setShowWeightModal] = React.useState<boolean>(false);
    const [heightMeter, setHeightMeter] = React.useState<string>('ft');
    const [weightMeter, setWeightMeter] = React.useState<string>('kg');
    const [heightError, setHeightError] = React.useState<boolean>(false);
    const [weightError, setWeightError] = React.useState<boolean>(false);
    const [showRaces, setShowRaces] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (gender && dob && height && weight) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [gender, height, weight, dob])
    const markedDates = {
        [dob]: { selected: true, selectedColor: AppColors.blue }
    }
    const HandleContinue = () => {
        if (!height) {
            setHeightError(true);
        }
        if (!weight) {
            setWeightError(true);
        }
        if (gender && dob && height && weight) {
            onContinue && onContinue(gender, dob, height, weight, raceOptional, heightMeter, weightMeter)
        }
    }
    const handleheight = (text: string) => {
        setHeight(text)
        if (text.length != 0) {
            setHeightError(false);
        } else {
            setHeightError(true);
        }
    }
    const handleweight = (text: string) => {
        setWeight(text)
        if (text.length != 0) {
            setWeightError(false);
        } else {
            setWeightError(true);
        }
    }
    return (
        <View style={styles.wrapper}>
            <HeightModal visible={showHeightModal} onClose={() => setShowHeightModal(!showHeightModal)} onSelect={(val: string) => setHeightMeter(val)} />
            <WeightModal visible={showWeightModal} onClose={() => setShowWeightModal(!showWeightModal)} onSelect={(val: string) => setWeightMeter(val)} />

            <KeyboardAvoidingView
                style={{ flex: 1, }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    keyboardDismissMode='interactive'
                    keyboardShouldPersistTaps='handled'
                    overScrollMode='never'
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
                >
                    <View>
                        <View style={styles.header}>
                            <LargeText text={en.ProfileBuilder.personalInfo} />
                            <NormalText text={en.ProfileBuilder.sharedetails} customStyle={{ textAlign: 'center', marginTop: 5 }} />
                        </View>
                        <View style={styles.genderView}>
                            <TouchableOpacity onPress={() => setGender('Male')} style={[styles.genderBtn, { backgroundColor: gender === 'Male' ? AppColors.white : AppColors.transparent }]}>
                                <SmallText text={en.ProfileBuilder.male} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, color: gender === "Male" ? AppColors.black : AppColors.placeholderColor }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setGender('Female')} style={[styles.genderBtn, { backgroundColor: gender === 'Female' ? AppColors.white : AppColors.transparent }]}>
                                <SmallText text={en.ProfileBuilder.female} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, color: gender === "Female" ? AppColors.black : AppColors.placeholderColor }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setGender('Other')} style={[styles.genderBtn, { backgroundColor: gender === 'Other' ? AppColors.white : AppColors.transparent }]}>
                                <SmallText text={en.ProfileBuilder.other} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, color: gender === "Other" ? AppColors.black : AppColors.placeholderColor }} />
                            </TouchableOpacity>

                        </View>
                        <View style={styles.clnderView}>
                            <AppInput editable={false} placeholder={en.Inputs.Dob} value={moment(dob?.toLocaleString()).format('MM.DD.YYYY')} onChangeText={() => { }} />
                            <TouchableOpacity hitSlop={20} onPress={() => { setShowClnder(!showClnder) }} activeOpacity={1} style={styles.dropIcon}>
                                <Image source={AppImages.dropBlack} tintColor={AppColors.placeholderColor} resizeMode='contain' style={{ width: 30, height: 30, transform: [{ rotate: showClnder ? "180deg" : "0deg" }] }} />
                            </TouchableOpacity>
                            {showClnder && <View style={styles.clnder}>
                                <DateTimePicker
                                    mode='single'
                                    date={dob}
                                    maxDate={new Date()}
                                    height={hp(34)}
                                    weekDaysTextStyle={{ color: AppColors.black }}
                                    headerTextStyle={{ color: AppColors.black }}
                                    calendarTextStyle={{ color: AppColors.black }}
                                    selectedItemColor={AppColors.blue}
                                    onChange={({ date }: any) => {
                                        setDob(date);
                                        setShowClnder(!showClnder);

                                    }}
                                />
                            </View>}
                        </View>
                        <View style={styles.hgtWgtView}>
                            <View>
                                <AppInput keyboardType='numeric' error={heightError} errorIcon={false} value={height} onChangeText={handleheight} placeholder={en.Inputs.height} containerStyle={{ width: wp(41) }} />
                                <TouchableOpacity activeOpacity={1} onPress={() => setShowHeightModal(!showHeightModal)} style={styles.slideView} >
                                    <SmallText text={heightMeter} customStyle={{ marginRight: 3 }} />
                                    <Image source={AppImages.slider} resizeMode='contain' style={styles.slideIcon} />
                                </TouchableOpacity>
                                {heightError && <SmallText text='Required*' customStyle={{ fontSize: 12, color: AppColors.red, marginLeft: 12 }} />}
                            </View>
                            <View>
                                <AppInput keyboardType='numeric' error={weightError} errorIcon={false} value={weight} onChangeText={handleweight} placeholder={en.Inputs.weight} containerStyle={{ width: wp(41) }} />
                                <TouchableOpacity onPress={() => setShowWeightModal(!showWeightModal)} style={styles.slideView} >
                                    <SmallText text={weightMeter} customStyle={{ marginRight: 3 }} />
                                    <Image source={AppImages.slider} resizeMode='contain' style={styles.slideIcon} />
                                </TouchableOpacity>
                                {weightError && <SmallText text='Required*' customStyle={{ fontSize: 12, color: AppColors.red, marginLeft: 12 }} />}
                            </View>
                        </View>
                        <View style={[styles.clnderView, { marginTop: 0 }]}>
                            <AppInput editable={false} placeholder={en.Inputs.Race} value={raceOptional} onChangeText={() => { }} />
                            <TouchableOpacity hitSlop={20} onPress={() => { setShowRaces(!showRaces) }} activeOpacity={1} style={styles.dropIcon}>
                                <Image source={AppImages.dropBlack} tintColor={AppColors.placeholderColor} resizeMode='contain' style={{ width: 30, height: 30, transform: [{ rotate: showRaces ? "180deg" : "0deg" }] }} />
                            </TouchableOpacity>
                            {showRaces && <View style={styles.RaceList}>
                                <ScrollView keyboardShouldPersistTaps="handled">
                                    {RaceOptions.map((race) => (
                                        <View key={race.id} style={styles.listItem}>
                                            <TouchableOpacity hitSlop={10} onPress={() => { setRaceOptional(race.name), setShowRaces(!showRaces) }} style={{ flex: 1 }} activeOpacity={0.8}>
                                                <NormalText text={race.name} />
                                            </TouchableOpacity>
                                            {race.name === raceOptional && <Image source={AppImages.true} resizeMode='contain' style={styles.icon} />}
                                        </View>
                                    ))}

                                </ScrollView>
                            </View>}
                        </View >
                    </View>
                    <View style={styles.btnView}>
                        <AppButton
                            text={en.Buttons.next}
                            onPress={() => HandleContinue()}
                            // disabled={disabled} 
                            colors={[AppColors.lightBlue, AppColors.darkBlue]}
                            customStyle={{ borderWidth: 0 }}
                            txtStyle={{ color: AppColors.white }} />
                    </View>
                </ScrollView >
            </KeyboardAvoidingView>
        </View >
    )
}

export default PersonalInfo

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    btnView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    header: {
        width: wp(85),
        height: hp(15),
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center'
    },
    genderView: {
        flexDirection: 'row',
        width: wp(85),
        height: 52,
        padding: 3,
        borderRadius: 16,
        backgroundColor: AppColors.lighGrey,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: "space-between"
    },
    genderBtn: {
        width: wp(27),
        height: 46,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    clnderView: {
        width: wp(85),
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    dropIcon: {
        width: wp(80),
        position: 'absolute',
        top: 15,
        alignItems: 'flex-end'
    },
    clnder: {
        width: wp(85),
        marginTop: -16,
        borderWidth: 1,
        backgroundColor: AppColors.white,
        borderColor: AppColors.borderColor,
        borderRadius: 16,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        padding: 10
    },
    hgtWgtView: {
        flexDirection: "row",
        width: wp(85),
        alignSelf: "center",
        alignItems: 'flex-start',
        justifyContent: "space-between",
        marginVertical: 10
    },
    slideIcon: {
        width: 10,
        height: 10
    },
    slideView: {
        flexDirection: 'row',
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        right: 10,
        top: 25
    },
    RaceList: {
        width: wp(85),
        maxHeight: 200,
        minHeight: 55,
        marginTop: -16,
        borderWidth: 1,
        backgroundColor: AppColors.white,
        borderColor: AppColors.borderColor,
        borderRadius: 16,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        padding: 10
    },
    listItem: {
        height: 40,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    icon: {
        width: 25,
        height: 25,
    }
})