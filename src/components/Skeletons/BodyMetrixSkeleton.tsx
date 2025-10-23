import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { AppColors } from '../../assets/colors/AppColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppImages } from '../../assets/images/AppImages';

interface Shimmer {
    color: string
}
const Array = [
    {
        id: 1,
    },
    {
        id: 2,
    },
]
const Array2 = [
    {
        id: 1,
    },
    {
        id: 2,
    },
    {
        id: 3,
    },
    {
        id: 4,
    },
]
const BodyMetrixSkeleton = ({ color }: Shimmer) => {
    return (
        <SkeletonPlaceholder highlightColor={color} shimmerWidth={250} speed={1400} >
            <SkeletonPlaceholder.Item borderRadius={100}>
                <SkeletonPlaceholder.Item width={wp(60)} height={20} marginLeft={25} />
                <SkeletonPlaceholder.Item flexDirection='row' marginVertical={20}>
                    <SkeletonPlaceholder.Item width={wp(70)} height={hp(18)} borderRadius={20} marginLeft={25} marginRight={10} />
                    <SkeletonPlaceholder.Item width={wp(70)} height={hp(18)} borderRadius={20} />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item width={wp(60)} height={20} marginLeft={25} />
                <SkeletonPlaceholder.Item flexDirection='row' flexWrap='wrap' marginVertical={20} marginLeft={25}>
                    {Array2.map((item) => (
                        <SkeletonPlaceholder.Item key={item.id} width={wp(41)} height={hp(18)} borderRadius={20} marginRight={10} marginVertical={5} />
                    ))}
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item width={wp(60)} height={20} marginLeft={25} marginTop={20} />
                <SkeletonPlaceholder.Item marginVertical={15} width={wp(85)} height={50} borderRadius={16} alignSelf='center' />
                {Array.map((item) => (
                    <SkeletonPlaceholder.Item key={item.id} marginTop={10} width={wp(85)} height={hp(30)} borderRadius={16} alignSelf='center' />
                ))}
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder >
    )
}
export default BodyMetrixSkeleton