import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppButton from '../../../components/Button/AppButton'
import { AppColors } from '../../../assets/colors/AppColors'
import LargeText from '../../../components/AppText/LargeText'
import NormalText from '../../../components/AppText/NormalText'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AppSearchInput from '../../../components/TextInput/AppSearchInput'
import { AppImages } from '../../../assets/images/AppImages'
import SmallText from '../../../components/AppText/SmallText'
import { AppFonts } from '../../../constants/AppFonts'
import en from '../../../../translation/en.json';
import PreconditionsSkeleton from '../../../components/Skeletons/PreconditionsSkeleton'
import { useSelector } from 'react-redux'
import Helper from '../../../utilis/Helper'

const ColorsArray = [
    AppColors.blue,
    AppColors.purple,
    AppColors.pink,
    AppColors.darkGrey,
]
interface ItemArray {
    id: number;
    name: string;
    color: string;
}
const PreExistingConditions = ({ onContinue }: any) => {
    const { preConditions, loadingConditions, errorConditions } = useSelector((state: any) => state.userData)
    const [disabled, setDisabled] = React.useState<boolean>(true);
    const UserDetails = useSelector((state: any) => state.userData.userDetails);
    const [issues, setIssues] = React.useState<any[]>(UserDetails?.preExistingCondition ?? []);
    const [initialArray, setInitialArray] = React.useState<ItemArray[]>(preConditions ?? []);
    const [search, setSearch] = React.useState<string>('');
    const [onLoad, setOnLoad] = React.useState<boolean>(true);

    const HandleContinue = () => {
        if (issues?.length === 0) {
            Helper.showToast("Please select Health Problems")
        } else {
            onContinue && onContinue(issues.map((item) => item))
        }
    }

    const filterArray = () => {
        return initialArray?.filter((issue) =>
            issue?.name?.toLowerCase().includes(search?.toLowerCase())
        );
    }
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
    const setPrevData = () => {
        const updatedArray = initialArray.map((issue: any) => {
            const randomColor = Math.floor(Math.random() * ColorsArray.length); // Get a random color
            const issueExists = issues?.includes(issue?.name); // Check if issue exists in issues
            if (issueExists) {
                return { ...issue, color: randomColor }; // Update the issue with the color
            }
            return issue; // If issue doesn't exist, return it as is
        });

        setInitialArray(updatedArray); // Only update the state once
    };
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
        <View style={styles.wrapper}>
            <KeyboardAvoidingView
                style={{ flex: 1, }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    overScrollMode='never'
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
                    keyboardDismissMode='interactive'
                    keyboardShouldPersistTaps='handled'
                >
                    <View>
                        <View style={styles.header}>
                            <LargeText text={en.ProfileBuilder.preExisting} />
                            <NormalText text={"Please select any pre-existing health conditions"} customStyle={{ textAlign: 'center', marginTop: 5 }} />
                        </View>
                        {loadingConditions ? (
                            <PreconditionsSkeleton />
                        ) : (
                            <>
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
                                                            <SmallText text={item.name} customStyle={{ color: initialArray[index]?.color != null ? AppColors.white : AppColors.placeholderColor, fontFamily: AppFonts.GeneralSans.semiBold }} />
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
                            </>
                        )}
                    </View>
                    <View style={styles.btnView}>
                        <AppButton
                            text='Next'
                            onPress={() => HandleContinue()}
                            // disabled={disabled} 
                            colors={[AppColors.lightBlue, AppColors.darkBlue]}
                            customStyle={{ borderWidth: 0 }}
                            txtStyle={{ color: AppColors.white }} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default PreExistingConditions

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
    searchBar: {
        width: wp(85),
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    issuesView: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
        marginTop: 10
    },
    issue: {
        flexDirection: 'row',
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "space-evenly",
        margin: 3,
        padding: 8,
        backgroundColor: 'red'
    },
    heart: {
        width: 20,
        height: 20,
        borderRadius: 40,
        backgroundColor: AppColors.white,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 5
    },
    icon: {
        width: 12,
        height: 12
    }
})