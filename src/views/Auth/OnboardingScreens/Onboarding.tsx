import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AppHeader from '../../../components/Header/AppHeader'
import { useNavigation } from '@react-navigation/native'
import CustomProgressBar from '../../../components/CustomProgressBar/CustomProgressBar'
import { styles } from './styles'
import AccountInfo from './AccountInfo'
import PersonalInfo from './PersonalInfo'
import PreExistingConditions from './PreExistingConditions'
import Compeletion from './Compeletion'
import Progress from '../../../components/CustomProgressBar/Progress'
import PutRing from './PutRing'
import en from '../../../../translation/en.json';
import { accessToken, fetchPreConditions, userDataReset, userDataSave, userDetailsReset, userDetailsSave } from '../../../redux/Slices/userDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../../../network/NetworkRequest'
import { endPoints } from '../../../network/endPoints'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { appKeys } from '../../../network/AppKeys'
import moment from 'moment'
import DeviceConnect from './DeviceConnect'
import { AppRoutes } from '../../../constants/AppRoutes'
import LogOutAccountModal from '../../../components/Modals/LogOutAccountModal'
import Helper from '../../../utilis/Helper'

const Onboarding = ({ route }: any) => {
    const { step } = route?.params ?? 0;
    const navigation: any = useNavigation();
    const UserData = useSelector((state: any) => state.userData.userData);
    const UserDetails = useSelector((state: any) => state.userData.userDetails);
    const [selectedOption, setSelectedOption] = React.useState(step && step == 4 ? 4 : UserData?.userProfileCreated === false ? 0 : UserDetails?.calibration === false ? 4 : 0);
    const [progress, setProgress] = React.useState(step && step == 4 ? 4 : UserData?.userProfileCreated === false ? 0 : UserDetails?.calibration === false ? 4 : 0);
    const [totalPages, setTotalPages] = React.useState(6);
    const dispatch: any = useDispatch();
    const Device = useSelector((state: any) => state.bleDevice.bleData);
    const [islogoutVisible, setLogoutVisible] = React.useState<boolean>(false);

    React.useEffect(() => {
        dispatch(fetchPreConditions())
    }, [dispatch])
    React.useEffect(() => {
        console.log("Calibration status", UserDetails?.calibration)
        // if (UserDetails?.calibration === true) {
        //     setSelectedOption(4);
        //     setProgress(4);
        // } else {
        //     setProgress(0);
        //     setSelectedOption(0);
        // }

    }, [UserDetails?.calibration])
    const createProfile = async (issues: any) => {
        const token = await AsyncStorage.getItem(appKeys.sessionToken);
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const formdata = new FormData();
        formdata.append("gender", UserDetails?.gender);
        formdata.append("sms_notifications", true);
        formdata.append("height_cm", UserDetails?.height_cm);
        formdata.append("weight_kg", UserDetails?.weight_kg);
        formdata.append("height_ft", UserDetails?.height_ft);
        formdata.append("weight_lb", UserDetails?.weight_lb);
        formdata.append("city", UserDetails?.city);
        formdata.append("preExistingCondition", JSON.stringify(issues));
        formdata.append("zipcode", UserDetails?.zipcode);
        formdata.append("weight_in_kg", true);
        formdata.append("height_in_ft", true);
        formdata.append("race", UserDetails?.race);
        formdata.append("country", UserDetails?.country);
        formdata.append("countryIsoCode", UserDetails?.countryIsoCode);
        formdata.append("dob", moment(UserDetails?.dob?.toLocaleString()).format('YYYY-MM-DD'));
        formdata.append("language", "English");
        formdata.append("email_newsletter", true);
        formdata.append("userTimeZone", Intl.DateTimeFormat().resolvedOptions().timeZone);

        const requestOptions: any = {
            method: "PUT",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };
        await fetch(BASE_URL + endPoints.createProfile, requestOptions)
            .then((response) => {
                goToNextPage(), dispatch(userDataSave({ userProfileCreated: true }))
            })
            // .then((result) => { console.log(result);  })
            .catch((error) => console.log("Error On profile Creation", error));
    }


    const goToNextPage = () => {
        if (selectedOption < totalPages - 1) {
            const nextOption = selectedOption + 1;
            setSelectedOption(nextOption);
            setProgress((prev) => prev + (6 / totalPages));
        } else if (selectedOption === totalPages - 1) {
            dispatch(accessToken('verahealth.com/fgfgfgdg'))
        }

    };
    const goToPreviousPage = () => {
        if (selectedOption === 0) {
            navigation.navigate(AppRoutes.SignupOptions);
        } else if (selectedOption > 0) {
            const previousOption = selectedOption - 1;
            if (Math.round(progress) <= 0) {
                setProgress(Math.round(progress));
            } else {
                setProgress((prev) => prev - (6 / totalPages));
            }
            setSelectedOption(previousOption);
        } else {
            navigation.goBack();
        }
    };

    // React.useEffect(() => {
    //     if (!Device?.connected) {
    //         setSelectedOption(3);
    //         setProgress(3);
    //     } else {
    //     }
    // }, [Device?.connected])
    const setAccInfo = (country: string, city: string, zipcode: string, avatar: any, isoCode: string) => {
        dispatch(userDetailsSave({ country: country, city: city, zipcode: zipcode, avatar: avatar, countryIsoCode: isoCode }));
        goToNextPage();
    };
    const setIssues = (issues: any[]) => {
        dispatch(userDetailsSave({
            preExistingCondition: issues,
            calibration: false
        }))
        createProfile(issues);
    };
    const setPersonalInfo = (gender: string, dob: string, height: string, weight: string, raceOptional: string, heightMeter: string, weightMeter: string) => {
        dispatch(userDetailsSave({
            gender: gender,
            dob: dob,
            height: height,
            weight: weight,
            height_cm: heightMeter === "cm" ? height : (+height * 30.48),
            weight_kg: weightMeter === "kg" ? weight : (+weight * 0.4535),
            height_ft: heightMeter === "ft" ? height : (+height * 0.0328084),
            weight_lb: weightMeter === "lb" ? weight : (+weight / 0.4535).toFixed(),
            race: raceOptional,
        }))
        goToNextPage();
    };

    const handleLogout = () => {
        setLogoutVisible(false);
        setTimeout(() => {
            dispatch(userDetailsReset());
            dispatch(userDataReset());
            Helper.resetAndGo(navigation, AppRoutes.SignupOptions);
        }, 1000);
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            {islogoutVisible && <LogOutAccountModal visible={islogoutVisible} onClose={() => setLogoutVisible(false)} onLogOut={() => { handleLogout() }} />}
            <AppHeader title={en.Headings.profileCreation} onBackPress={() => { selectedOption === 4 ? setLogoutVisible(true) : goToPreviousPage() }} onBlePress={() => { navigation.navigate(AppRoutes.MyDevice, { cali: true }) }} bleConnected={Device?.connected} selectedOpt={selectedOption} />
            <Progress currentProgress={progress} />
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : undefined}
                style={{ flexGrow: 1 }}
            >
                {selectedOption === 0 && <AccountInfo onContinue={(country: string, city: string, zipcode: string, avatar: any, isoCode: string) => { setAccInfo(country, city, zipcode, avatar, isoCode) }} />}
                {selectedOption === 1 && <PersonalInfo onContinue={(gender: string, dob: string, height: string, weight: string, raceOptional: string, heightMeter: string, weightMeter: string) => { console.log("USER SELECTED DOB::\n", dob, "\n"); setPersonalInfo(gender, dob, height, weight, raceOptional, heightMeter, weightMeter) }} />}
                {selectedOption === 2 && <PreExistingConditions onContinue={(issues: object[]) => { setIssues(issues) }} />}
                {selectedOption === 3 && <DeviceConnect onContinue={() => { goToNextPage(); }} />}
                {selectedOption === 4 && <PutRing onContinue={() => { goToNextPage() }} />}
                {selectedOption === 5 && <Compeletion onContinue={() => { dispatch(accessToken(UserDetails?.token)); dispatch(userDetailsSave({ calibration: true })) }} />}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Onboarding