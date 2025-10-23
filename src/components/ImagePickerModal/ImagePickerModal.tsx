import { View, StyleSheet, Platform, TouchableOpacity, ScrollView, Image, PermissionsAndroid } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import NormalText from '../AppText/NormalText'
import { AppColors } from '../../assets/colors/AppColors'
import LargeText from '../AppText/LargeText'
import { AppImages } from '../../assets/images/AppImages'
import SmallText from '../AppText/SmallText'
import AppButton from '../Button/AppButton'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

interface ImagePicker {
    visible: boolean,
    onClose: CallableFunction,
    fromCamera: CallableFunction,
    fromGallery: CallableFunction,
    image: any,
    onAdd: CallableFunction,
    onselect: CallableFunction,
}

async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
        if (Platform.Version >= 33) {
            return Promise.all([
                PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
                // PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
            ]).then(
                ([hasReadMediaImagesPermission]) =>
                    hasReadMediaImagesPermission
                // && hasReadMediaVideoPermission,
            );
        } else {
            return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
        return true;
    }
    const getRequestPermissionPromise = () => {
        if (Platform.Version >= 33) {
            return PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                // PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            ]).then(
                (statuses) =>
                    statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
                    PermissionsAndroid.RESULTS.GRANTED
                // statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
                // PermissionsAndroid.RESULTS.GRANTED,
            );
        } else {
            return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
        }
    };

    return await getRequestPermissionPromise();
}


const ImagePickerModal = ({
    visible,
    onClose,
    fromCamera,
    fromGallery,
    image,
    onAdd,
    onselect,
}: ImagePicker) => {
    const [prevImages, setPrevImages] = React.useState<any[]>([]);
    React.useEffect(() => {
        hasAndroidPermission().then(async result => {
            if (result) {
                const images = await CameraRoll.getPhotos({
                    first: 5,
                    assetType: 'Photos',
                })
                setPrevImages(images?.edges);
                // do nothing
            }
        }).catch(err => {
        })
    }, [])
    return (
        <Modal
            isVisible={visible}
            onBackButtonPress={() => onClose && onClose()}
            onBackdropPress={() => onClose && onClose()}
            hasBackdrop={true}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            backdropTransitionInTiming={0}
            backdropTransitionOutTiming={0}
            style={{ zIndex: 999, margin: 0, justifyContent: 'flex-end' }}
        >
            <View style={[styles.container, styles.boxShadow]}>
                <LargeText text='Upload media' customStyle={{ paddingLeft: 20 }} />
                <ScrollView horizontal overScrollMode='never' contentContainerStyle={{ paddingHorizontal: 15, alignItems: "center" }} >
                    <View style={[styles.iconView, { width: image?.path ? 110 : 100, height: image?.path ? 110 : 100, backgroundColor: image?.path ? AppColors.transparent : AppColors.background, padding: image?.path ? 3 : 0, borderWidth: image?.path ? 2 : 0, borderColor: image?.path ? AppColors.lightBlue : AppColors.transparent }]}>
                        {image === null || image?.uri ? (
                            <TouchableOpacity onPress={() => { fromCamera && fromCamera() }} hitSlop={30} activeOpacity={0.8}>
                                <Image source={AppImages.camera} tintColor={AppColors.placeholderColor} resizeMode='contain' style={styles.icon} />
                            </TouchableOpacity>
                        ) : (
                            <>
                                <Image source={{ uri: image?.path }} resizeMode='cover' style={[styles.avatr, { borderRadius: 13 }]} />
                                <View style={[styles.avatr, { backgroundColor: "rgba(3, 3, 3,0.5)", flex: 1, position: "absolute", alignItems: "center", justifyContent: "center", borderRadius: 13 }]}>
                                    <Image style={{ width: 35, height: 35 }} tintColor={AppColors.white} source={AppImages.true} />
                                </View>
                            </>
                        )}
                    </View>
                    {prevImages.map((item) => (
                        <TouchableOpacity onPress={() => onselect(item?.node?.image)} key={item?.node?.id} style={[styles.iconView, { width: item?.node?.image?.uri === image?.uri ? 110 : 100, height: item?.node?.image?.uri === image?.uri ? 110 : 100, backgroundColor: item?.node?.image?.uri === image?.uri ? AppColors.transparent : AppColors.background, padding: item?.node?.image?.uri === image?.uri ? 3 : 0, borderWidth: item?.node?.image?.uri === image?.uri ? 2 : 0, borderColor: item?.node?.image?.uri === image?.uri ? AppColors.lightBlue : AppColors.transparent }]}>
                            <Image source={{ uri: item?.node?.image?.uri }} resizeMode='cover' style={styles.avatr} />
                            {item?.node?.image?.uri === image?.uri && <View style={[styles.avatr, { backgroundColor: "rgba(3, 3, 3,0.5)", flex: 1, position: "absolute", alignItems: "center", justifyContent: "center", borderRadius: 13 }]}>
                                <Image style={{ width: 35, height: 35 }} tintColor={AppColors.white} source={AppImages.true} />
                            </View>}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={{ width: widthPercentageToDP(90), alignSelf: "center" }}>
                    {/* from camera text */}
                    <TouchableOpacity onPress={() => { fromGallery && fromGallery() }}
                        activeOpacity={0.7}
                        style={styles.btnContainer}
                    >
                        <Image source={AppImages.gallery} resizeMode='contain' style={styles.icon} />
                        <SmallText text={'Upload photo'} customStyle={styles.txtStyle} />
                    </TouchableOpacity>

                    {/* from gallery text */}
                    <TouchableOpacity onPress={() => { fromCamera && fromCamera() }}
                        activeOpacity={0.7}
                        style={styles.btnContainer}
                    >
                        <Image source={AppImages.camera} resizeMode='contain' style={styles.icon} />
                        <SmallText text={'Take a photo'} customStyle={styles.txtStyle} />
                    </TouchableOpacity>

                    {/* cancel text */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => { onClose && onClose() }}
                            activeOpacity={0.7}
                            style={styles.CancelbtnContainer}
                        >
                            <NormalText text={'Cancel'} />
                        </TouchableOpacity>
                        <AppButton text='Add' onPress={() => { onAdd && onAdd(image); onClose() }} colors={[AppColors.lightBlue, AppColors.darkBlue]} txtStyle={{ color: AppColors.white }} customStyle={{ borderWidth: 0, width: 155 }} containerStyle={{ width: 155 }} />
                    </View>
                </View>
            </View>
        </Modal >
    )
}
export default React.memo(ImagePickerModal)
const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 30,
        // paddingHorizontal: 20,
        paddingBottom: Platform.OS == 'ios' ? 40 : 20
    },
    iconView: {
        width: 100,
        height: 100,
        borderRadius: 16,
        backgroundColor: AppColors.borderColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 10
    },
    avatr: {
        width: "100%",
        height: "100%",
        borderRadius: 16,
        borderWidth: 0.7, borderColor: AppColors.borderColor,
    },
    icon: {
        width: 20,
        height: 20,
    },
    swipeSheetHandler: {
        height: 3,
        width: 40,
        marginBottom: 20,
        backgroundColor: '#6E7CAF',
        borderRadius: 50,
        alignSelf: 'center',
    },
    boxShadow: {
        shadowOffset: { width: -2, height: 0 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    btnContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: AppColors.borderColor,
        paddingVertical: 18,
        paddingHorizontal: 15,
        marginVertical: 4,
        borderRadius: 16,
    },
    CancelbtnContainer: {
        width: 155,
        alignItems: "center",
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: AppColors.borderColor,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginVertical: 4,
        borderRadius: 16,
    },
    txtStyle: {
        marginLeft: 10,
        alignSelf: "center"
    },
})