import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { AppColors } from '../../assets/colors/AppColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppImages } from '../../assets/images/AppImages';

const MainProfileSkeleton = () => {
    return (
        <SkeletonPlaceholder shimmerWidth={250} speed={1400}>
            <SkeletonPlaceholder.Item alignItems='center'>
                <SkeletonPlaceholder.Item width={80} height={80} borderRadius={100} />
                <SkeletonPlaceholder.Item width={wp(60)} height={20} marginTop={10} borderRadius={100} />
                <SkeletonPlaceholder.Item width={wp(45)} height={20} marginTop={10} borderRadius={100} />
                <SkeletonPlaceholder.Item flexDirection='row' justifyContent='space-between' alignSelf='center' marginTop={10} >
                    <SkeletonPlaceholder.Item width={wp(25)} height={20} marginRight={10} borderRadius={100} />
                    <SkeletonPlaceholder.Item width={wp(25)} height={20} borderRadius={100} />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item width={wp(80)} height={hp(10)} borderRadius={16} marginTop={10} />
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder >
    )
}

export default MainProfileSkeleton