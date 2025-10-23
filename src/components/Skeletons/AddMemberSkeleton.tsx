import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { AppColors } from '../../assets/colors/AppColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const IssuesArray = [
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
const AddMemberSkeleton = () => {
    return (
        <SkeletonPlaceholder shimmerWidth={250} speed={1400}>
            <SkeletonPlaceholder.Item marginTop={hp(2)}>
                <SkeletonPlaceholder.Item marginLeft={25}>
                    <SkeletonPlaceholder.Item width={150} height={18} borderRadius={100} marginVertical={hp(2)} />
                    <SkeletonPlaceholder.Item width={wp(85)}>
                        {IssuesArray.map((item) => (<>
                            <SkeletonPlaceholder.Item key={item.id} width={wp(70)} height={22} borderRadius={50} marginHorizontal={3} marginVertical={6} />
                            <SkeletonPlaceholder.Item key={item.id} width={wp(50)} height={22} borderRadius={50} marginHorizontal={3} marginVertical={6} />
                        </>
                        ))}
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    )
}

export default AddMemberSkeleton