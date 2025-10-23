import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import AppHeader from '../../../../components/Header/AppHeader'
import en from '../../../../../translation/en.json';
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppImages } from '../../../../assets/images/AppImages'
import { AppFonts } from '../../../../constants/AppFonts'
import NormalText from '../../../../components/AppText/NormalText'
import { AppColors } from '../../../../assets/colors/AppColors'
import SmallText from '../../../../components/AppText/SmallText'
import AppButton from '../../../../components/Button/AppButton'
import MemberDetailSkeleton from '../../../../components/Skeletons/MemberDetailSkeleton'
import { API_REQUEST } from '../../../../network/NetworkRequest'
import { endPoints } from '../../../../network/endPoints'
import SetContactNameModal from '../../../../components/Modals/SetContactNameModal'
import { useSelector } from 'react-redux'
import Helper from '../../../../utilis/Helper'
import ImageComponent from '../../../../components/ImageComponent/ImageComponent'
import AppLoader from '../../../../components/AppLoader/AppLoader'

const MemberDetailScreen = () => {
    const navigation: any = useNavigation();
    const UserData = useSelector((state: any) => state.userData.userData);
    const route: any = useRoute();
    const { data } = route?.params ?? {}
    const [onLoad, setOnLoad] = React.useState<boolean>(true);
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [isloading, setIsLoading] = React.useState<boolean>(false);
    // console.log(data);

    const sendInvite = (name: string) => {
        setIsLoading(true);
        const raw = {
            senderId: UserData?.userId,
            receiverId: data?._id,
            receiverName: name,
        }
        try {
            API_REQUEST("POST", endPoints.inviteFriend, raw,
                ((sucess: any) => {
                    setIsLoading(false);
                    console.log(sucess);
                    navigation.goBack();
                }),
                ((error: any) => {
                    setIsLoading(false);
                    console.log(error)
                    Helper.showToast(error)
                })
            )
        } catch (e) {
            setIsLoading(false);
            console.log(e)
        }
    }

    React.useEffect(() => {
        setInterval(() => {
            setOnLoad(false);
        }, 2000);
    }, [])
    return (
        <SafeAreaView style={styles.wrapper}>
            <AppHeader title={en.Headings.AddNewMember} onBackPress={() => { navigation.goBack() }} />
            <SetContactNameModal UserName={data?.first_name} visible={showModal} onClose={() => setShowModal(!showModal)} onSend={(name: string) => sendInvite(name)} />
            {onLoad ? (
                <MemberDetailSkeleton />
            ) : (
                <>
                    <ScrollView>
                        <View style={styles.conatiner}>
                            <View style={styles.memberInfo}>
                                <ImageComponent uri={data?.details?.profileImage} customStyle={[styles.avatar, { borderRadius: 100 }]} />
                                <View style={{ marginLeft: 10 }}>
                                    <SmallText text={data?.first_name + " " + data?.last_name} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, }} />
                                    <SmallText text='Already using the Vera Health App' customStyle={{ color: AppColors.placeholderColor, fontSize: 10, marginVertical: 2 }} />
                                </View>
                            </View>
                            <View style={styles.memberDetail}>
                                <SmallText text={en.Profile.Details} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold, marginVertical: 4 }} />
                                {data?.email && <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 6 }}>
                                    <Image source={AppImages.mail} resizeMode='contain' style={{ width: 20, height: 20 }} />
                                    <SmallText text={data?.email} customStyle={{ marginLeft: 6 }} />
                                </View>}
                                {data?.phone_number && <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 6 }}>
                                    <Image source={AppImages.call} resizeMode='contain' style={{ width: 20, height: 20 }} />
                                    <SmallText text={data?.phone_number} customStyle={{ marginLeft: 6 }} />
                                </View>}
                            </View>
                        </View>
                    </ScrollView>
                    <View style={{ alignSelf: "center", marginBottom: 10 }}>
                        <AppButton text={en.Buttons.AdMember} onPress={() => { setShowModal(!showModal) }} colors={[AppColors.lightBlue, AppColors.darkBlue]} txtStyle={{ color: AppColors.white }} customStyle={{ borderWidth: 0 }} />
                    </View>
                </>
            )}
            {isloading && <AppLoader/>}
        </SafeAreaView>
    )
}

export default MemberDetailScreen