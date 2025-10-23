import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { AppColors } from '../../assets/colors/AppColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppImages } from '../../assets/images/AppImages';

const membersArray = [
    {
        id: 0,
    },
    {
        id: 1,
    },
]
const MyDevicesSkeleton = () => {
    return (
        <SkeletonPlaceholder shimmerWidth={250} speed={1400}>
            <SkeletonPlaceholder.Item>
                {membersArray.map((item) => (
                    <SkeletonPlaceholder.Item key={item.id} width={wp(85)} borderRadius={16} borderWidth={2} padding={15} alignSelf='center' marginVertical={15} >
                        <SkeletonPlaceholder.Item width={wp(70)} height={30} />
                        <SkeletonPlaceholder.Item marginTop={10} width={wp(60)} height={15} />
                        <SkeletonPlaceholder.Item width={wp(40)} height={hp(16)} borderRadius={16} marginTop={10} />
                    </SkeletonPlaceholder.Item>
                ))}
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder >
    )
}

export default MyDevicesSkeleton