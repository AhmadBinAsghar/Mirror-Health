import { Image, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './styles';
import { AppColors } from '../../../../assets/colors/AppColors';
import HeightModal from '../../../../components/Modals/HeightModal';
import WeightModal from '../../../../components/Modals/WeightModal';
import NormalText from '../../../../components/AppText/NormalText';
import en from '../../../../../translation/en.json';
import SmallText from '../../../../components/AppText/SmallText';
import AppInput from '../../../../components/TextInput/AppInput';
import { AppImages } from '../../../../assets/images/AppImages';
import AppButton from '../../../../components/Button/AppButton';
import { AppFonts } from '../../../../constants/AppFonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../../components/Header/AppHeader';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from 'react-native-ui-datepicker';
import moment from 'moment';
import BleProvider from '../../../../navigations/BleProvider';
import { BleSDK } from '../../../../services/ble/Util/BleSDK';
import { MyPersonalInfoImpl } from '../../../../services/ble/model/MyPersonalInfo';
import { BASE_URL } from '../../../../network/NetworkRequest';
import { endPoints } from '../../../../network/endPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appKeys } from '../../../../network/AppKeys';
import { useSelector } from 'react-redux';
import AppLoader from '../../../../components/AppLoader/AppLoader';

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

const MyMetrics = () => {
    const navigation: any = useNavigation();
    const UserDetails = useSelector((state: any) => state.userData.userDetails);
    const [gender, setGender] = React.useState<string>(UserDetails?.gender ?? "Male");
    const [dob, setDob] = React.useState<string>(UserDetails?.dob ?? new Date().toDateString());
    const [height, setHeight] = React.useState<string>(UserDetails?.height_ft?.toString() ?? '');
    const [weight, setWeight] = React.useState<string>(UserDetails?.weight_kg?.toFixed(2) ?? '');
    const [raceOptional, setRaceOptional] = React.useState<string>(UserDetails?.race ?? '');
    const [disabled, setDisabled] = React.useState<boolean>(true);
    const [showClnder, setShowClnder] = React.useState<boolean>(false);
    const [showHeightModal, setShowHeightModal] = React.useState<boolean>(false);
    const [showWeightModal, setShowWeightModal] = React.useState<boolean>(false);
    const [heightMeter, setHeightMeter] = React.useState<string>('ft');
    const [weightMeter, setWeightMeter] = React.useState<string>('kg');
    const [showRaces, setShowRaces] = React.useState<boolean>(false);
    const Ble = BleProvider();
    const [isloading, setIsLoading] = React.useState<boolean>(false);

    const setMetrics = () => {
        const genderInNum = gender === 'Male' ? 1 : gender === 'Female' ? 0 : 2;
        const dobDate: any = moment(moment(dob?.toLocaleString()).format('MM-DD-YYYY'), 'MM-DD-YYYY').fromNow();
        Ble.writeOnDevice([...BleSDK.SetPersonalInfo(new MyPersonalInfoImpl(genderInNum, dobDate?.substring(0, 2), parseInt(height), parseInt(weight)))]);
    }
    const createProfile = async () => {
        setIsLoading(true);
        const token = await AsyncStorage.getItem(appKeys.sessionToken);
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const formdata = new FormData();
        formdata.append("gender", gender);
        formdata.append("height_cm", heightMeter === "cm" ? height : (+height * 30.48));
        formdata.append("weight_kg", weightMeter === "kg" ? weight : (+weight * 0.4535).toFixed());
        formdata.append("height_ft", heightMeter === "ft" ? height : (+height * 0.0328084));
        formdata.append("weight_lb", weightMeter === "lb" ? weight : (+weight / 0.4535).toFixed());
        formdata.append("weight_in_kg", weightMeter === "lb" ? false : true);
        formdata.append("height_in_ft", heightMeter === "kg" ? false : true);
        formdata.append("race", raceOptional);
        formdata.append("dob", moment(dob?.toLocaleString()).format('YYYY-MM-DD'));

        const requestOptions: any = {
            method: "PUT",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };

        fetch(BASE_URL + endPoints.createProfile, requestOptions)
            .then((response) => response.json())
            .then((result) => { setIsLoading(false), setMetrics(); navigation.goBack() })
            .catch((error) => { setIsLoading(false); console.log(error) });
    }


    React.useEffect(() => {
        if (gender && dob && height && weight) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [gender, height, weight, dob])

    return (
        <SafeAreaView style={styles.wrapper}>
            <AppHeader title={en.Headings.MyMetrics} onCrossPress={() => { navigation.goBack() }} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
            <HeightModal visible={showHeightModal} onClose={() => setShowHeightModal(!showHeightModal)} onSelect={(val: string) => setHeightMeter(val)} />
            <WeightModal visible={showWeightModal} onClose={() => setShowWeightModal(!showWeightModal)} onSelect={(val: string) => setWeightMeter(val)} />

            <KeyboardAvoidingView
                style={{ flex: 1, }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
                    keyboardDismissMode='interactive'
                    keyboardShouldPersistTaps='handled'
                    overScrollMode='never'
                >
                    <View>
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
                            <AppInput editable={false} placeholder={en.Inputs.Dob} value={moment(dob?.toLocaleString()).format('MM-DD-YYYY')} onChangeText={() => { }} />
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
                                <AppInput keyboardType='numeric' value={height} onChangeText={setHeight} placeholder={en.Inputs.height} containerStyle={{ width: wp(41) }} />
                                <TouchableOpacity activeOpacity={1} onPress={() => setShowHeightModal(!showHeightModal)} style={styles.slideView} >
                                    <SmallText text={heightMeter} customStyle={{ marginRight: 3 }} />
                                    <Image source={AppImages.slider} resizeMode='contain' style={styles.slideIcon} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <AppInput keyboardType='numeric' value={weight} onChangeText={setWeight} placeholder={en.Inputs.weight} containerStyle={{ width: wp(41) }} />
                                <TouchableOpacity onPress={() => setShowWeightModal(!showWeightModal)} style={styles.slideView} >
                                    <SmallText text={weightMeter} customStyle={{ marginRight: 3 }} />
                                    <Image source={AppImages.slider} resizeMode='contain' style={styles.slideIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.clnderView, { marginTop: 0 }]}>
                            <AppInput editable={false} placeholder={en.Inputs.Race} value={raceOptional} onChangeText={() => { }} />
                            <TouchableOpacity hitSlop={20} onPress={() => { setShowRaces(!showRaces) }} activeOpacity={1} style={styles.dropIcon}>
                                <Image source={AppImages.dropBlack} tintColor={AppColors.placeholderColor} resizeMode='contain' style={{ width: 30, height: 30, transform: [{ rotate: showRaces ? "180deg" : "0deg" }] }} />
                            </TouchableOpacity>
                            {showRaces && <View style={styles.RaceList}>
                                <ScrollView
                                    keyboardDismissMode='on-drag'
                                    keyboardShouldPersistTaps='handled'
                                    overScrollMode='never'
                                >
                                    {RaceOptions.map((race) => (
                                        <View key={race?.id} style={styles.listItem}>
                                            <TouchableOpacity hitSlop={10} onPress={() => { setRaceOptional(race.name), setShowRaces(!showRaces) }} style={{ flex: 1 }} activeOpacity={0.8}>
                                                <NormalText text={race?.name} />
                                            </TouchableOpacity>
                                            {race?.name === raceOptional && <Image source={AppImages.true} resizeMode='contain' style={styles.icon} />}
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>}
                        </View >
                    </View>
                    <View style={styles.btnView}>
                        <AppButton text={en.Buttons.Save} onPress={() => { createProfile() }} disabled={disabled} colors={disabled ? [AppColors.disabled, AppColors.disabled] : [AppColors.lightBlue, AppColors.darkBlue]} customStyle={{ borderWidth: 0 }} txtStyle={{ color: AppColors.white }} />
                    </View>
                </ScrollView >
            </KeyboardAvoidingView>
            {isloading && <AppLoader />}
        </SafeAreaView>
    )
}

export default React.memo(MyMetrics)