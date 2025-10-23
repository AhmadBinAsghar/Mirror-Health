import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import AppHeader from '../../../../components/Header/AppHeader'
import en from '../../../../../translation/en.json';
import { useNavigation } from '@react-navigation/native'
import { AppFonts } from '../../../../constants/AppFonts'
import { AppImages } from '../../../../assets/images/AppImages'
import SmallText from '../../../../components/AppText/SmallText'
import { AppColors } from '../../../../assets/colors/AppColors'
import AppButton from '../../../../components/Button/AppButton'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import MembersOptionModal from '../../../../components/Modals/MembersOptionModal'
import RemoveMemberModal from '../../../../components/Modals/RemoveMemberModal'
import DeclineInviteModal from '../../../../components/Modals/DeclineInviteModal'
import ReInviteOptionsModal from '../../../../components/Modals/ReInviteOptionsModal'
import { AppRoutes } from '../../../../constants/AppRoutes'
import MyMembersSkeleton from '../../../../components/Skeletons/MyMembersSkeleton'
import { API_REQUEST } from '../../../../network/NetworkRequest'
import { endPoints } from '../../../../network/endPoints'
import { useDispatch, useSelector } from 'react-redux'
import Helper from '../../../../utilis/Helper'
import { fetchMembers } from '../../../../redux/Slices/userDataSlice'
import ImageComponent from '../../../../components/ImageComponent/ImageComponent'

const MyMembers = () => {
    const { Members, loadingMem, errorMem } = useSelector((state: any) => state.userData);
    const navigation: any = useNavigation();
    const [showOptions, setShowOptions] = React.useState<boolean>(false);
    const [showRemoveModal, setShowRemoveModal] = React.useState<boolean>(false);
    const [showInviteModal, setShowInviteModal] = React.useState<boolean>(false);
    const [showReinviteModal, setShowReinviteModal] = React.useState<boolean>(false);
    const [members, setMembers] = React.useState<any[]>([]);
    const [selectedObject, setSelectedObj] = React.useState<any>();
    const dispatch: any = useDispatch();

    React.useEffect(() => {
        if (Members?.length > 0) {
            setMembers(Members)
        }
    }, [Members])
    const cancelInvite = async () => {
        const raw = {
            invitationId: selectedObject?.invitationId,
            senderId: selectedObject?.senderId,
            receiverId: selectedObject?.receiverId,
        }
        try {
            API_REQUEST("POST", endPoints.cancelInvite, raw,
                ((sucess: any) => {
                    Helper.showToast(sucess?.message);
                    dispatch(fetchMembers());
                }),
                ((error: any) => {
                    console.log(error);
                    Helper.showToast(error);
                }),
            )
        } catch (e) {
            console.log(e)
        }
    }

    const AcceptRequest = async (member: any) => {
        const raw = {
            invitationId: member?.invitationId,
            receiverId: member?.receiverId,
            senderId: member?.senderId,
            senderName: member?.senderFirst_name
        }
        try {
            API_REQUEST('POST', endPoints.acceptFriend, raw,
                ((sucess: any) => {
                    Helper.showToast(sucess?.message);
                    dispatch(fetchMembers());
                }),
                ((error: any) => {
                    console.log(error);
                    Helper.showToast(error)
                }),
            )
        } catch (e) {
            console.log(e);
        }
    }

    const RejectRequest = async () => {
        const raw = {
            invitationId: selectedObject?.invitationId,
            receiverId: selectedObject?.receiverId,
            senderId: selectedObject?.senderId,
        }
        try {
            API_REQUEST('POST', endPoints.rejectFriend, raw,
                ((sucess: any) => {
                    Helper.showToast(sucess?.message);
                    dispatch(fetchMembers());
                }),
                ((error: any) => {
                    console.log(error);
                    Helper.showToast(error)
                }),
            )
        } catch (e) {
            console.log(e);
        }
    }

    const DeleteMember = async () => {
        const raw = {
            relationId: selectedObject?.relationId,
        };
        try {
            API_REQUEST('POST', endPoints.deleteUser, raw,
                ((sucess: any) => {
                    Helper.showToast(sucess?.message);
                    dispatch(fetchMembers());
                }),
                ((error: any) => {
                    console.log(error);
                    Helper.showToast(error)
                }),
            )
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <ReInviteOptionsModal visible={showReinviteModal} onResend={() => { }} onCancel={() => { cancelInvite() }} onClose={() => { setShowReinviteModal(!showReinviteModal) }} />
            <DeclineInviteModal visible={showInviteModal} onClose={() => { setShowInviteModal(!showInviteModal) }} onDecline={() => { RejectRequest() }} />
            <RemoveMemberModal visible={showRemoveModal} onClose={() => { setShowRemoveModal(!showRemoveModal) }} onRemove={() => { DeleteMember() }} />
            <MembersOptionModal visible={showOptions} onClose={() => { setShowOptions(!showOptions) }} onRemove={() => { setShowRemoveModal(!showRemoveModal) }} />
            <AppHeader title={en.Headings.MyMembers} onBackPress={() => { navigation.goBack() }} onPlusPress={() => { navigation.navigate(AppRoutes.AddMember) }} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
            {loadingMem ? (
                <MyMembersSkeleton />
            ) : members?.length > 0 ?
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    {members?.map(member => (
                        member?.type === "rejected" ? null :
                            <View key={member?.invitationId} style={styles.memberView}>
                                <ImageComponent uri={member?.type === "request" ? member?.senderProfileImage : member?.type === "member" ? member?.senderProfileImage ? member?.senderProfileImage : member?.receiverProfileImage : member?.receiverProfileImage} customStyle={styles.avatar} />
                                <View style={styles.detailView}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <SmallText text={member?.type === "request" ? member?.senderFirst_name + " " + member?.senderLast_name : member?.type === "member" ? member?.senderFirst_name ? member?.senderFirst_name + " " + member?.senderLast_name : member?.receiverFirst_name + " " + member?.receiverLast_name : member?.receiverFirst_name + " " + member?.receiverLast_name} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
                                        {member?.type === "invited" && <SmallText text='Invited' customStyle={styles.inviteBadge} />}
                                    </View>
                                    <SmallText text={member?.type === "request" ? member?.senderEmail : member?.type === "member" ? member?.senderEmail ? member?.senderEmail : member?.receiverEmail : member?.receiverEmail} customStyle={{ color: AppColors.placeholderColor, marginVertical: 3, fontSize: 12 }} />
                                    <SmallText text={member?.type === "request" ? member?.senderPhone : member?.type === "member" ? member?.senderPhone ? member?.senderPhone : member?.receiverPhone : member?.receiverPhone} customStyle={{ color: AppColors.placeholderColor, fontSize: 12 }} />
                                </View>
                                {member?.type === "request" ? (
                                    <View style={styles.btnView}>
                                        <AppButton text='Add' onPress={() => { AcceptRequest(member) }} colors={[AppColors.lightBlue, AppColors.darkBlue]} containerStyle={{ width: wp(15), height: 30, borderRadius: 8 }} customStyle={{ width: wp(15), height: 30, borderRadius: 8, borderWidth: 0 }} txtStyle={{ fontFamily: AppFonts.GeneralSans.medium, fontSize: 12, color: AppColors.white }} />
                                        <TouchableOpacity onPress={() => { setShowInviteModal(!showInviteModal), setSelectedObj(member) }} activeOpacity={0.8}>
                                            <Image source={AppImages.crossLarge} resizeMode='center' tintColor={AppColors.grey} style={{ width: 15, height: 15, marginLeft: 15 }} />
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <TouchableOpacity hitSlop={10} onPress={() => { member?.type === "invited" ? (setShowReinviteModal(!showReinviteModal), setSelectedObj(member)) : (setShowOptions(!showOptions), setSelectedObj(member)) }} activeOpacity={0.8} style={styles.iconView}>
                                        <Image source={AppImages.more} resizeMode='contain' style={styles.icon} />
                                    </TouchableOpacity>
                                )}
                            </View>
                    ))}
                </ScrollView>
                : <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                    <SmallText text={"No members yet..."} customStyle={{ color: AppColors.placeholderColor }} />
                </View>
            }
        </SafeAreaView>
    )
}

export default React.memo(MyMembers)