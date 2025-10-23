import { Image, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { AppColors } from '../../../../assets/colors/AppColors'
import NormalText from '../../../../components/AppText/NormalText'
import AppSearchInput from '../../../../components/TextInput/AppSearchInput'
import { AppImages } from '../../../../assets/images/AppImages'
import SmallText from '../../../../components/AppText/SmallText'
import AppButton from '../../../../components/Button/AppButton'
import { AppFonts } from '../../../../constants/AppFonts'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import en from '../../../../../translation/en.json';
import AppHeader from '../../../../components/Header/AppHeader'
import { useNavigation } from '@react-navigation/native'
import PreconditionsSkeleton from '../../../../components/Skeletons/PreconditionsSkeleton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { appKeys } from '../../../../network/AppKeys'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../../../../network/NetworkRequest'
import { endPoints } from '../../../../network/endPoints'
import { userDetailsSave } from '../../../../redux/Slices/userDataSlice'
import AppLoader from '../../../../components/AppLoader/AppLoader'

const ColorsArray = [
    AppColors.blue,
    AppColors.darkGrey,
    AppColors.purple,
    AppColors.pink
]
interface ItemArray {
    id: number;
    name: string;
    color: any;
}

const MyPreconditions = () => {
    const { preConditions, loadingConditions } = useSelector((state: any) => state.userData);
    const navigation: any = useNavigation();
    const UserDetails = useSelector((state: any) => state.userData.userDetails);
    const [issues, setIssues] = React.useState<any[]>(UserDetails?.preExistingCondition ?? []);
    const [disabled, setDisabled] = React.useState<boolean>(true);
    const [initialArray, setInitialArray] = React.useState<ItemArray[]>(preConditions);
    const [search, setSearch] = React.useState<string>('');
    const [isloading, setIsLoading] = React.useState<boolean>(false);
    const dispatch = useDispatch();

    const createProfile = async () => {
        setIsLoading(true);
        const token = await AsyncStorage.getItem(appKeys.sessionToken);
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const formdata = new FormData();
        formdata.append("preExistingCondition", JSON.stringify(issues));

        const requestOptions: any = {
            method: "PUT",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };
        fetch(BASE_URL + endPoints.createProfile, requestOptions)
            .then((response) => response.json())
            .then((result) => { setIsLoading(false); dispatch(userDetailsSave(result?.data)); navigation.goBack() })
            .catch((error) => { setIsLoading(false); console.error(error) });
    }

    const filterArray = () => {
        return initialArray?.filter((issue) =>
            issue?.name?.toLowerCase().includes(search?.toLowerCase())
        );
    }

    const setPrevData = () => {
        const updatedArray = initialArray.map((issue: any) => {
            const issueExists = issues?.includes(issue?.name); // Check if issue exists in issues
            if (issueExists) {
                const randomColor = Math.floor(Math.random() * ColorsArray.length); // Get a random color
                return { ...issue, color: randomColor }; // Update the issue with the color
            }
            return issue; // If issue doesn't exist, return it as is
        });

        setInitialArray(updatedArray); // Only update the state once
    };
    const handleSplice = (item: any) => {
        const FilteredArray = issues?.filter((issue: any) => issue !== item?.name);
        if (FilteredArray) {
            setInitialArray(initialArray?.map((issue: any) =>
                issue?.id === item?.id ? { ...issue, color: null } : issue
            ));
            setIssues(FilteredArray)
        }
    }

    const handleSelect = (item: any) => {
        const randomColor = Math.floor(Math.random() * ColorsArray.length)
        try {
            setIssues([...issues, item?.name]);
            setInitialArray(initialArray?.map((issue: any) =>
                issue?.id === item?.id ? { ...issue, color: randomColor } : issue
            ));
        } catch (err) { }
    }
    React.useEffect(() => {
        setPrevData();
    }, [])
    React.useEffect(() => {
        if (issues.length > 0) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [issues])

    return (
        <SafeAreaView style={styles.wrapper}>
            <AppHeader title={en.Headings.MyPrecondition} onCrossPress={() => { navigation.goBack() }} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
            {loadingConditions ? (
                <PreconditionsSkeleton />
            ) : (
                <KeyboardAvoidingView
                    style={{ flex: 1, }}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardDismissMode='interactive'
                        keyboardShouldPersistTaps='handled'>
                        <View style={styles.searchBar}>
                            <AppSearchInput value={search} crossPress={() => { setSearch('') }} onChangeText={setSearch} placeholder={en.Inputs.search} />
                        </View>
                        <View style={{ width: wp(85), alignSelf: "center" }}>
                            {filterArray()?.length != 0 ? (
                                <>
                                    <NormalText text={en.ProfileBuilder.HealthProblems} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, marginTop: 15, marginLeft: 5 }} />
                                    <View style={styles.issuesView}>
                                        {filterArray()?.map((item, index) => {
                                            return (
                                                <TouchableOpacity onPress={() => { initialArray[index]?.color != null ? handleSplice(item) : handleSelect(item); }} key={index} style={[styles.issue, { backgroundColor: initialArray[index]?.color != null ? ColorsArray[initialArray[index]?.color] : AppColors.lighGrey }]}>
                                                    <View style={[styles.heart, { backgroundColor: initialArray[index]?.color != null ? AppColors.white : AppColors.placeholderColor }]}>
                                                        <Image source={AppImages.heart} resizeMode='contain' tintColor={initialArray[index]?.color != null ? ColorsArray[initialArray[index]?.color] : AppColors.white} style={styles.icon} />
                                                    </View>
                                                    <SmallText text={item?.name} customStyle={{ color: initialArray[index]?.color != null ? AppColors.white : AppColors.placeholderColor, fontFamily: AppFonts.GeneralSans.semiBold }} />
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                </>
                            ) : (
                                <View style={{ flex: 1, alignItems: "center", paddingVertical: 38 }}>
                                    <SmallText text={en.Profile.NothingFound} customStyle={{ color: AppColors.placeholderColor }} />
                                </View>
                            )}
                        </View>
                    </ScrollView>
                    <View style={styles.btnView}>
                        <AppButton text={en.Buttons.Save} onPress={() => { createProfile() }} disabled={disabled} colors={disabled ? [AppColors.disabled, AppColors.disabled] : [AppColors.lightBlue, AppColors.darkBlue]} customStyle={{ borderWidth: 0 }} txtStyle={{ color: AppColors.white }} />
                    </View>
                </KeyboardAvoidingView>
            )}
            {isloading && <AppLoader />}
        </SafeAreaView>
    )
}

export default React.memo(MyPreconditions)