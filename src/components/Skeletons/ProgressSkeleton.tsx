import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { AppColors } from '../../assets/colors/AppColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppImages } from '../../assets/images/AppImages';

interface Shimmer {
    color: string
}
const ProgressSkeleton = ({ color }: Shimmer) => {
    return (
        <SkeletonPlaceholder highlightColor={color} shimmerWidth={250} speed={1400} >
            <SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item height={hp(26)}>
                    <SkeletonPlaceholder.Item width={180} height={180} borderRadius={100} borderWidth={10} alignSelf='center' alignItems='center' justifyContent='center' >
                        <SkeletonPlaceholder.Item width={100} height={30} marginBottom={20} />
                        <SkeletonPlaceholder.Item width={100} height={20} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
                {/* <SkeletonPlaceholder.Item marginVertical={15} width={wp(85)} height={40} borderRadius={100} alignSelf='center' /> */}
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder >
    )
}
export default ProgressSkeleton