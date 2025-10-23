import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { AppColors } from '../../assets/colors/AppColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppImages } from '../../assets/images/AppImages';

const MemberDetailSkeleton = () => {
    return (
        <SkeletonPlaceholder shimmerWidth={250} speed={1400}>
            <SkeletonPlaceholder.Item width={wp(85)} marginTop={10} borderRadius={16} borderWidth={2} padding={15} alignSelf='center' alignContent='center' >
                <SkeletonPlaceholder.Item flexDirection='row' alignContent='center'  >
                    <SkeletonPlaceholder.Item width={50} height={50} borderRadius={100} marginRight={10} />
                    <SkeletonPlaceholder.Item justifyContent='space-around'>
                        <SkeletonPlaceholder.Item width={wp(58)} height={15} />
                        <SkeletonPlaceholder.Item width={wp(58)} height={15} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item width={wp(75)} height={hp(12)} borderRadius={16} marginTop={10} />
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder >
    )
}

export default MemberDetailSkeleton