import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { AppColors } from '../../assets/colors/AppColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppImages } from '../../assets/images/AppImages';

const Array = [
    {
        id: 1,
    },
]
const ViewMoreSkeleton = () => {
    return (
        <SkeletonPlaceholder shimmerWidth={250} speed={1400} >
            <SkeletonPlaceholder.Item borderRadius={100} marginTop={20}>
                <SkeletonPlaceholder.Item width={wp(70)} height={20} marginLeft={25} />
                <SkeletonPlaceholder.Item marginTop={20} width={wp(85)} height={50} borderRadius={16} alignSelf='center' />
                {Array.map((item) => (
                    <SkeletonPlaceholder.Item key={item.id} marginTop={10} width={wp(85)} height={hp(30)} borderRadius={16} alignSelf='center' />
                ))}
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder >
    )
}
export default ViewMoreSkeleton