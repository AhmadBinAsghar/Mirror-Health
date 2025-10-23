import { FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AppColors } from '../../../assets/colors/AppColors'
import AppButton from '../../../components/Button/AppButton'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import LargeText from '../../../components/AppText/LargeText'
import NormalText from '../../../components/AppText/NormalText'
import { AppImages } from '../../../assets/images/AppImages'
import { Dropdown } from 'react-native-element-dropdown'
import AppDropDown from '../../../components/DropDown/AppDropDown'
import AppInput from '../../../components/TextInput/AppInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import ImagePickerModal from '../../../components/ImagePickerModal/ImagePickerModal'
import { imagePickerController } from '../../../components/ImagePickerModal/ImagePickerHook'
import en from '../../../../translation/en.json';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { appKeys } from '../../../network/AppKeys'
import { BASE_URL } from '../../../network/NetworkRequest'
import { endPoints } from '../../../network/endPoints'
import Helper from '../../../utilis/Helper'
import { Country, City } from 'country-state-city';
import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';
import { fetchPreConditions } from '../../../redux/Slices/userDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import SmallText from '../../../components/AppText/SmallText'

const AccountInfo = ({ onContinue }: any) => {
    const UserDetails = useSelector((state: any) => state.userData.userDetails);
    const [avatar, setAvatar] = React.useState<any>(UserDetails?.avatar ?? null);
    const [country, setCountry] = React.useState<string>(UserDetails?.country ?? '');
    const [city, setCity] = React.useState<string>(UserDetails?.city ?? '');
    const [disabled, setDisabled] = React.useState<boolean>(true);
    const [zipcode, setZipCode] = React.useState<string>(UserDetails?.zipcode ?? '');
    const [validZipCode, setValidZipCode] = React.useState<boolean>(true);
    const [showPicker, setShowPicker] = React.useState<boolean>(false)
    const [image, setImage] = React.useState<any>(null);
    const [showCountry, setShowCountry] = React.useState<boolean>(false);
    const [showCity, setShowCity] = React.useState<boolean>(false);
    const [countryData, setCountryData] = React.useState<any[]>([]);
    const [cityData, setCityData] = React.useState<any[]>([]);
    const [isoCode, setIsoCode] = React.useState<string>('')
    const [imageError, setImageError] = React.useState<boolean>(false)
    const [countryError, setCountryError] = React.useState<boolean>(false)
    const [cityError, setCityError] = React.useState<boolean>(false)
    const [zipError, setZipError] = React.useState<boolean>(false)
    const dispatch: any = useDispatch();

    React.useEffect(() => {
        dispatch(fetchPreConditions())
    }, [dispatch])
    const HandleContinue = () => {
        if (!avatar) {
            setImageError(true);
        }
        if (!country) {
            setCountryError(true)
        }
        if (!city) {
            setCityError(true)
        }
        if (!zipcode) {
            setZipError(true)
        }
        if (country && city && zipcode && avatar) {
            onContinue && onContinue(country, city, zipcode, avatar, isoCode)
        }
    }

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
    const handlePicker = async (type: string) => {
        await imagePickerController({
            pickerType: type,
            onSuccess: (results: any) => {
                setImage(results);
            },
            onError: (error: any) => {
            }
        });
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
                Helper.showToast("Error in Update Profile")
            }
            return
        }
        if (!image) {
            // showToast("error", "Image cancelled.", "bottom");
            return
        }
    }

    React.useEffect(() => {
        if (avatar) {
            setImageError(false)
        }
    }, [avatar])

    const handleChangeCountry = (text: string) => {
        setCountry(text);
        setShowCountry(true);
        if (text.length != 0) {
            setCountryError(false)
        } else {
            setCountryError(true)
        }
    }
    const handleChangeCity = (text: string) => {
        setCity(text);
        if (text.length != 0) {
            setCityError(false)
        } else {
            setCityError(true)
        }
        setShowCity(true);
    }
    const handleChangeZip = (text: string) => {
        setZipCode(text);
        if (text.length != 0) {
            setZipError(false)
        } else {
            setZipError(true)
        }
    }
    const filterCountry = () => {
        const data = countryData?.filter((item) => item?.name?.toLowerCase()?.includes(country?.toLowerCase()));
        return data;
    }
    const filterCity = () => {
        const data = cityData?.filter((item) => item?.name?.toLowerCase()?.includes(city?.toLowerCase()));
        return data;
    }
    return (
        <View style={styles.wrapper}>

            <KeyboardAvoidingView
                style={{ flex: 1, }}
                // behavior={Platform.OS === "ios" ? "padding" : 'padding'}
                behavior={'padding'}
            >
                <ScrollView
                    keyboardDismissMode='interactive'
                    keyboardShouldPersistTaps='handled'
                    nestedScrollEnabled
                    overScrollMode='never'
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
                >
                    <View>
                        <View style={styles.header}>
                            <LargeText text={en.SignUp.AccInfo} />
                            <NormalText customStyle={{ textAlign: "center", marginTop: 5 }} text={en.ProfileBuilder.almostThere} />
                        </View>
                        <View style={styles.AvatrView}>
                            <TouchableOpacity onPress={() => { setShowPicker(!showPicker) }} activeOpacity={0.8} style={[styles.AvatarBorder, { borderColor: imageError ? AppColors.red : AppColors.borderColor }]}>
                                <Image source={avatar ? { uri: avatar } : AppImages.nullAvatar} resizeMode='cover' style={styles.Avatar} />
                                <View style={styles.iconView}>
                                    <View >
                                        <Image source={AppImages.edit} resizeMode='contain' style={styles.icon} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {imageError && <SmallText text='Required*' customStyle={{ color: AppColors.red, alignSelf: 'center', marginVertical: 8, fontSize: 12 }} />}
                        </View>
                        <View style={styles.dropdowns}>
                            <View style={styles.clnderView}>
                                <AppInput editable={true} error={countryError} placeholder={en.Inputs.country} value={country} onChangeText={(text: any) => { handleChangeCountry(text) }} />
                                {countryError && <SmallText text='Required*' customStyle={{ color: AppColors.red, alignSelf: "flex-start", marginBottom: 8, fontSize: 12, marginLeft: 12 }} />}
                                <TouchableOpacity hitSlop={20} onPress={() => { setShowCountry(!showCountry) }} activeOpacity={1} style={[styles.dropIcon, { right: countryError ? 25 : 0 }]}>
                                    <Image source={AppImages.dropBlack} tintColor={AppColors.placeholderColor} resizeMode='contain' style={{ width: 30, height: 30, transform: [{ rotate: showCountry ? "180deg" : "0deg" }] }} />
                                </TouchableOpacity>
                                {showCountry && <View style={[styles.RaceList, { marginTop: countryError ? -40 : -16, }]}>
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
                                                    <TouchableOpacity hitSlop={10} onPress={() => { setCountry(race?.item?.name), setShowCountry(!showCountry), CityWithCountry(race?.item?.isoCode), setIsoCode(race?.item?.isoCode), setCountryError(false), Keyboard.dismiss() }} activeOpacity={1} style={styles.listItem}>
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
                                <AppInput editable={true} error={cityError} placeholder={en.Inputs.city} value={city} onChangeText={(text: any) => { handleChangeCity(text) }} />
                                {cityError && <SmallText text='Required*' customStyle={{ color: AppColors.red, alignSelf: "flex-start", marginBottom: 8, fontSize: 12, marginLeft: 12 }} />}
                                <TouchableOpacity hitSlop={20} onPress={() => { setShowCity(!showCity) }} activeOpacity={1} style={[styles.dropIcon, { right: cityError ? 25 : 0 }]}>
                                    <Image source={AppImages.dropBlack} tintColor={AppColors.placeholderColor} resizeMode='contain' style={{ width: 30, height: 30, transform: [{ rotate: showCity ? "180deg" : "0deg" }] }} />
                                </TouchableOpacity>
                                {showCity && <View style={[styles.RaceList, { marginTop: cityError ? -40 : -16, }]}>
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
                                                    <TouchableOpacity hitSlop={10} onPress={() => { setCity(race?.item?.name), setShowCity(!showCity), setCityError(false), Keyboard.dismiss() }} activeOpacity={0.8} style={styles.listItem}>
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
                            <AppInput keyboardType='number-pad' value={zipcode} onChangeText={handleChangeZip} placeholder={en.Inputs.zipcode} error={zipError} />
                            {zipError && <SmallText text='Required*' customStyle={{ color: AppColors.red, alignSelf: "flex-start", marginBottom: 8, fontSize: 12, marginLeft: 12 }} />}
                        </View>
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
                    <ImagePickerModal visible={showPicker} onselect={(image: any) => setImage(image)} image={image} onAdd={(image: any) => { uploadImage(image) }} onClose={() => { setShowPicker(!showPicker), setImage(null) }} fromCamera={() => { handlePicker('camera') }} fromGallery={() => { handlePicker('gallery') }} />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'space-between'
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
    AvatrView: {
        width: wp(85),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    AvatarBorder: {
        borderRadius: 1000,
        borderWidth: 3,
        borderColor: AppColors.borderColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Avatar: {
        width: 140,
        height: 140,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: wp(3)
    },
    iconView: {
        position: "absolute",
        top: 0,
        right: 0,
    },
    icon: {
        width: 40,
        height: 40,
    },
    dropdowns: {
        width: wp(85),
        alignSelf: 'center',
        marginVertical: 15
        // backgroundColor: 'red'
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
    dropIcon: {
        width: 40,
        position: 'absolute',
        top: 15,
        alignSelf: 'flex-end'
    },
    listItem: {
        height: 40,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    clnderView: {
        width: wp(85),
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconTick: {
        width: 25,
        height: 25,
    }
})

export default AccountInfo
