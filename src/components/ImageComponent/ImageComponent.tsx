import { StyleSheet, Text, View, Image, StyleProp, ImageProps } from 'react-native'
import React from 'react'
import { AppImages } from '../../assets/images/AppImages';

interface ImageComponentProps {
    uri: string,
    customStyle?: StyleProp<ImageProps>,
}
const ImageComponent = ({ uri, customStyle }: ImageComponentProps) => {
    const [imageError, setImageError] = React.useState(false);
    return (
        <Image source={imageError || !uri ? AppImages.avatar : { uri: uri }} style={customStyle} onError={(err) => setImageError(true)} resizeMode='cover' />
    )
}

export default React.memo(ImageComponent)