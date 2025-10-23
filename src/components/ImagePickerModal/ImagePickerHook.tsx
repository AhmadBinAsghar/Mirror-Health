import ImageCropPicker from "react-native-image-crop-picker";
import { AppColors } from "../../assets/colors/AppColors";
interface ImagePickerControllerInterface {
    pickerType: string,
    onSuccess: any,
    onError: any,
    multiple?: boolean
}

export const imagePickerController = async ({ pickerType, onSuccess, onError, multiple = false }: ImagePickerControllerInterface) => {
    try {
        if (pickerType == "camera") {
            ImageCropPicker.openCamera({
                width: 300,
                height: 300,
                cropping: true,
                mediaType: 'photo',
                cropperCircleOverlay: true,
                showCropFrame: false,
                showCropGuidelines: false,
                hideBottomControls: true,
                cropperToolbarTitle: "Profile picture",
                cropperStatusBarColor: AppColors.black,
                cropperToolbarWidgetColor: AppColors.white,
                cropperToolbarColor: AppColors.black
            }).then(async (results) => {
                onSuccess(results);
            }).catch((e) => {
                onError(e);
            });
        } else if (pickerType == 'gallery') {
            ImageCropPicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
                mediaType: 'photo',
                cropperCircleOverlay: true,
                showCropFrame: false,
                showCropGuidelines: false,
                hideBottomControls: true,
                cropperToolbarTitle: "Profile picture",
                cropperStatusBarColor: AppColors.black,
                cropperToolbarWidgetColor: AppColors.white,
                cropperToolbarColor: AppColors.black
            }).then(async (results) => {
                onSuccess(results);
            }).catch((e) => {
                onError(e);
            });
        }
    } catch (error) {
        onError(error);
    }
};