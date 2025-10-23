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
const LanguagesSkeleton = () => {
    return (
        <SkeletonPlaceholder shimmerWidth={250} speed={1400}>
            <SkeletonPlaceholder.Item marginTop={10}>
                {membersArray.map((item) => (
                    <SkeletonPlaceholder.Item key={item.id} flexDirection='row' justifyContent='space-around' width={wp(85)} borderRadius={16} borderWidth={2} padding={15} alignSelf='center' marginVertical={4} alignItems='center' >
                        <SkeletonPlaceholder.Item width={25} height={25} />
                        <SkeletonPlaceholder.Item width={wp(65)} height={25} />
                    </SkeletonPlaceholder.Item>
                ))}
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder >
    )
}

export default LanguagesSkeleton