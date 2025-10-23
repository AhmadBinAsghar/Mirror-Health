import { Image, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View, BackHandler, Keyboard, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import AppHeader from '../../../../components/Header/AppHeader'
import { useNavigation } from '@react-navigation/native'
import en from '../../../../../translation/en.json';
import { AppImages } from '../../../../assets/images/AppImages'
import ImagePickerModal from '../../../../components/ImagePickerModal/ImagePickerModal'
import { imagePickerController } from '../../../../components/ImagePickerModal/ImagePickerHook'
import { AppFonts } from '../../../../constants/AppFonts'
import NormalText from '../../../../components/AppText/NormalText'
import AppInput from '../../../../components/TextInput/AppInput'
import { AppColors } from '../../../../assets/colors/AppColors'
import AppButton from '../../../../components/Button/AppButton'
import DiscardChangesModal from '../../../../components/Modals/DiscardChangesModal'
import { BASE_URL } from '../../../../network/NetworkRequest'
import { endPoints } from '../../../../network/endPoints'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { appKeys } from '../../../../network/AppKeys'
import { userDetailsSave } from '../../../../redux/Slices/userDataSlice'
import AppLoader from '../../../../components/AppLoader/AppLoader'
import { City, Country } from 'country-state-city'
import Helper from '../../../../utilis/Helper'
import ImageComponent from '../../../../components/ImageComponent/ImageComponent'

const EditProfile = () => {
    const navigation: any = useNavigation();
    const UserData = useSelector((state: any) => state.userData.userData);
    const UserDetails = useSelector((state: any) => state.userData.userDetails);
    const [avatar, setAvatar] = React.useState<any>(UserDetails?.profileImage);
    const [country, setCountry] = React.useState<string>(UserDetails?.country);
    const [city, setCity] = React.useState<string>(UserDetails?.city);
    const [showPicker, setShowPicker] = React.useState<boolean>(false)
    const [image, setImage] = React.useState<any>(null);
    const [showCountry, setShowCountry] = React.useState<boolean>(false);
    const [showCity, setShowCity] = React.useState<boolean>(false);
    const [fullName, setFullName] = React.useState<string>(UserData?.firstName + " " + UserData?.lastName);
    const [showDiscard, setShowDiscard] = React.useState<boolean>(false);
    const dispatch = useDispatch();
    const [isloading, setIsLoading] = React.useState<boolean>(false);
    const [countryData, setCountryData] = React.useState<any[]>([]);
    const [cityData, setCityData] = React.useState<any[]>([]);
    const [isoCode, setIsoCode] = React.useState<string>(UserDetails?.countryIsoCode ?? '');

    const CityWithCountry = (code: any) => {
        const city = City.getCitiesOfCountry(code);
        if (city) {
            setCityData(city);
        }
    }
    React.useEffect(() => {
        const country = Country.getAllCountries();
        const city = City.getAllCities();
        if (country) {
            setCountryData(country)
        };
        if (city) {
            setCityData(city)
        };
    }, [])
    const createProfile = async () => {
        Keyboard.dismiss();
        setIsLoading(true);
        const token = await AsyncStorage.getItem(appKeys.sessionToken);
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const formdata = new FormData();
        formdata.append("first_name", fullName?.split(" ")[0] ?? '');
        formdata.append("last_name", fullName?.split(" ")[1] ?? '');
        formdata.append("city", city);
        formdata.append("countryIsoCode", isoCode);
        formdata.append("country", country);
        formdata.append("userTimeZone", Intl.DateTimeFormat().resolvedOptions().timeZone);

        const requestOptions: any = {
            method: "PUT",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };

        fetch(BASE_URL + endPoints.createProfile, requestOptions)
            .then((response) => response.json())
            .then((result) => { setIsLoading(false); dispatch(userDetailsSave(result?.data)); Helper.showToast(result?.message); navigation.goBack() })
            .catch((error) => { setIsLoading(false); console.log(error) });
    }
    const uploadImage = async (image: any) => {
        if (image) {
            setAvatar(image?.path ? image?.path : image?.uri)
            const localUri = image?.path ? image?.path : image?.uri;
            const filename = localUri.split("/").pop();

            const token = await AsyncStorage.getItem(appKeys.sessionToken);

            const tempFormdata = new FormData();
            tempFormdata.append('avatar', {
                uri: localUri,
                type: "image/png",
                name: filename,
            });
            const response = await fetch(BASE_URL + endPoints.createProfile, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
                body: tempFormdata,
            });
            if (response.status === 200 || response.status === 201) {
                // showToast("success", "Profile Image Updated Successfully", "bottom");
            }
            else {
                console.log(response.status)
                Helper.showToast("Error in Update Profile")
            }
            return
        }
        if (!image) {
            // showToast("error", "Image cancelled.", "bottom");
            return
        }
    }
    const handlePicker = async (type: string) => {
        await imagePickerController({
            pickerType: type,
            onSuccess: (results: any) => {
                setImage(results);
            },
            onError: (error: any) => {
                console.log("Error while selecting image from camera:\n", error, "\n");
            }
        });
    }
    const handleBackButtonClick = () => {
        navigation.goBack();
        return true;
    }
    const handleDiscard = () => {
        setShowDiscard(true)
        return true;
    }
    const filterCountry = () => {
        const data = countryData?.filter((item) => item?.name?.toLowerCase()?.includes(country?.toLowerCase()));
        return data;
    }
    const filterCity = () => {
        const data = cityData?.filter((item) => item?.name?.toLowerCase()?.includes(city?.toLowerCase()));
        return data;
    }
    const handleChangeCountry = (text: string) => {
        setCountry(text);
        setShowCountry(true);
    }
    const handleChangeCity = (text: string) => {
        setCity(text);
        setShowCity(true);
    }

    React.useEffect(() => {
        if (UserData?.firstName + " " + UserData?.lastName != fullName || UserDetails?.city != city || UserDetails?.country != country || UserDetails?.profileImage != avatar) {
            BackHandler.addEventListener("hardwareBackPress", handleDiscard)
            return () => {
                BackHandler.removeEventListener("hardwareBackPress", handleDiscard);
            };
        } else {
            BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
            return () => {
                BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
            };
        }
    }, [fullName, city, country, avatar])
    return (
        <SafeAreaView style={styles.wrapper}>
            <DiscardChangesModal visible={showDiscard} onClose={() => { setShowDiscard(!showDiscard) }} onDiscard={() => { navigation.goBack() }} />
            <ImagePickerModal visible={showPicker} onselect={(image: any) => setImage(image)} image={image} onAdd={(image: any) => { uploadImage(image) }} onClose={() => { setShowPicker(!showPicker), setImage(null) }} fromCamera={() => { handlePicker('camera') }} fromGallery={() => { handlePicker('gallery') }} />
            <AppHeader onCrossPress={() => { UserData?.firstName + " " + UserData?.lastName != fullName || UserDetails?.city != city || UserDetails?.country != country || UserDetails?.profileImage != avatar ? setShowDiscard(!showDiscard) : navigation.goBack() }} title={en.Headings.EditProfile} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />

            <KeyboardAvoidingView
                style={{ flex: 1, }}
                behavior={Platform.OS === "ios" ? "padding" : 'padding'}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
                    keyboardDismissMode='interactive'
                    keyboardShouldPersistTaps='handled'
                    overScrollMode='never'
                    nestedScrollEnabled>
                    <View>
                        <View style={styles.AvatrView}>
                            <TouchableOpacity onPress={() => { setShowPicker(!showPicker) }} activeOpacity={0.8} style={styles.AvatarBorder}>
                                <ImageComponent uri={avatar} customStyle={styles.Avatar} />
                                <View style={styles.iconView}>
                                    <View>
                                        <Image source={AppImages.edit} resizeMode='contain' style={styles.icon} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputs}>
                            <NormalText text={en.ProfileBuilder.personalInfo} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, marginVertical: 10, }} />
                            <AppInput value={fullName} onChangeText={setFullName} placeholder={en.Inputs.FullName} />

                            <View style={styles.clnderView}>
                                <AppInput editable={true} placeholder={en.Inputs.country} value={country} onChangeText={(text: any) => { handleChangeCountry(text) }} />
                                <TouchableOpacity hitSlop={20} onPress={() => { setShowCountry(!showCountry) }} activeOpacity={1} style={styles.dropIcon}>
                                    <Image source={AppImages.dropBlack} tintColor={AppColors.placeholderColor} resizeMode='contain' style={{ width: 30, height: 30, transform: [{ rotate: showCountry ? "180deg" : "0deg" }] }} />
                                </TouchableOpacity>
                                {showCountry && <View style={styles.RaceList}>
                                    {filterCountry().length > 0 ?
                                        <FlatList
                                            data={filterCountry()}
                                            nestedScrollEnabled
                                            keyboardDismissMode='interactive'
                                            keyboardShouldPersistTaps='always'
                                            keyExtractor={(item: any) => item?.isoCode?.toString()}
                                            contentContainerStyle={{ flexGrow: 1 }}
                                            renderItem={(race: any) => {
                                                return (
                                                    <TouchableOpacity hitSlop={10} onPress={() => { setCountry(race?.item?.name), setShowCountry(!showCountry), CityWithCountry(race?.item?.isoCode), setIsoCode(race?.item?.isoCode) }} activeOpacity={1} style={styles.listItem}>
                                                        <View style={{ flex: 1 }} >
                                                            <NormalText text={race?.item?.name} />
                                                        </View>
                                                        {race?.item?.name === country && <Image source={AppImages.true} resizeMode='contain' style={styles.iconTick} />}
                                                    </TouchableOpacity>
                                                )
                                            }} /> :
                                        <View style={[styles.listItem, { alignSelf: "center" }]}>
                                            <NormalText text={'Not found'} />
                                        </View>}
                                </View>}
                            </View>
                            <View style={styles.clnderView}>
                                <AppInput editable={true} placeholder={en.Inputs.city} value={city} onChangeText={(text: any) => { handleChangeCity(text) }} />
                                <TouchableOpacity hitSlop={20} onPress={() => { setShowCity(!showCity) }} activeOpacity={1} style={styles.dropIcon}>
                                    <Image source={AppImages.dropBlack} tintColor={AppColors.placeholderColor} resizeMode='contain' style={{ width: 30, height: 30, transform: [{ rotate: showCity ? "180deg" : "0deg" }] }} />
                                </TouchableOpacity>
                                {showCity && <View style={styles.RaceList}>
                                    {filterCity().length > 0 ?
                                        <FlatList
                                            data={filterCity()}
                                            nestedScrollEnabled
                                            keyboardDismissMode='interactive'
                                            keyboardShouldPersistTaps='always'
                                            keyExtractor={(item: any, index: any) => index.toString()}
                                            contentContainerStyle={{ flexGrow: 1 }}
                                            renderItem={(race: any) => {
                                                return (
                                                    <TouchableOpacity hitSlop={10} onPress={() => { setCity(race?.item?.name), setShowCity(!showCity) }} activeOpacity={0.8} style={styles.listItem}>
                                                        <View style={{ flex: 1 }}>
                                                            <NormalText text={race?.item?.name} />
                                                        </View>
                                                        {race?.item?.name === city && <Image source={AppImages.true} resizeMode='contain' style={styles.iconTick} />}
                                                    </TouchableOpacity>
                                                )
                                            }} /> :
                                        <View style={[styles.listItem, { alignSelf: "center" }]}>
                                            <NormalText text={'Not found'} />
                                        </View>}
                                </View>}
                            </View>
                        </View>
                    </View>
                    <View style={styles.btnView}>
                        <AppButton text={en.Buttons.Save} onPress={() => { createProfile() }} colors={[AppColors.lightBlue, AppColors.darkBlue]} customStyle={{ borderWidth: 0 }} txtStyle={{ color: AppColors.white }} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {isloading && <AppLoader />}
        </SafeAreaView>
    )
}
export default React.memo(EditProfile)

