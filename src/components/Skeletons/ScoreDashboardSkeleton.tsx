import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { AppColors } from '../../assets/colors/AppColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppImages } from '../../assets/images/AppImages';

const Array = [
    {
        id: 0,
    },
    {
        id: 1,
    },
    {
        id: 2,
    },
]
const ScoreDashboardSkeleton = () => {
    return (
        <SkeletonPlaceholder shimmerWidth={250} speed={1400}>
            <SkeletonPlaceholder.Item>
                {Array.map((item) => (
                    <SkeletonPlaceholder.Item key={item.id} width={wp(85)} marginTop={10} borderRadius={16} borderWidth={2} padding={15} alignSelf='center' alignContent='center' >
                        <SkeletonPlaceholder.Item width={wp(75)} height={30} borderRadius={100} marginRight={10} />
                        <SkeletonPlaceholder.Item flexDirection='row' alignContent='center' justifyContent='space-between' >
                            <SkeletonPlaceholder.Item justifyContent='space-between' marginTop={20}>
                                <SkeletonPlaceholder.Item width={wp(35)} height={30} />
                                <SkeletonPlaceholder.Item width={wp(35)} height={20} />
                            </SkeletonPlaceholder.Item>
                            <SkeletonPlaceholder.Item width={wp(35)} height={hp(10)} borderRadius={16} marginTop={10} />
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                ))}
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder >
    )
}
export default ScoreDashboardSkeleton