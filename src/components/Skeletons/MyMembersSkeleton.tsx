import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { AppColors } from '../../assets/colors/AppColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppImages } from '../../assets/images/AppImages';

const membersArray = [
    {
        id: 0,
        type: 'member',
        name: "Katty Robinson",
        email: "kattyrobin@gmail.com",
        number: "+1 877 727-62-23",
        avatar: AppImages.avatar,
    },
    {
        id: 1,
        type: 'invited',
        name: "Katty Robinson",
        email: "kattyrobin@gmail.com",
        number: "+1 877 727-62-23",
        avatar: AppImages.avatar,
    },
    {
        id: 2,
        type: 'request',
        name: "Katty Robinson",
        email: "kattyrobin@gmail.com",
        number: "+1 877 727-62-23",
        avatar: AppImages.avatar,
    },
    {
        id: 3,
        type: 'member',
        name: "Katty Robinson",
        email: "kattyrobin@gmail.com",
        number: "+1 877 727-62-23",
        avatar: AppImages.avatar,
    },
    {
        id: 4,
        type: 'invited',
        name: "Katty Robinson",
        email: "kattyrobin@gmail.com",
        number: "+1 877 727-62-23",
        avatar: AppImages.avatar,
    },
    {
        id: 5,
        type: 'member',
        name: "Katty Robinson",
        email: "kattyrobin@gmail.com",
        number: "+1 877 727-62-23",
        avatar: AppImages.avatar,
    },
]
const MyMembersSkeleton = () => {
    return (
        <SkeletonPlaceholder shimmerWidth={250} speed={1400}>
            <SkeletonPlaceholder.Item marginTop={hp(1)}>
                {membersArray.map((item) => (
                    <SkeletonPlaceholder.Item key={item.id} flexDirection='row' width={wp(85)} alignSelf='center' marginVertical={20} >
                        <SkeletonPlaceholder.Item width={45} height={45} borderRadius={16} />
                        <SkeletonPlaceholder.Item marginLeft={20}>
                            <SkeletonPlaceholder.Item width={wp(60)} height={15} />
                            <SkeletonPlaceholder.Item marginTop={4} width={wp(60)} height={15} />
                            <SkeletonPlaceholder.Item marginTop={4} width={wp(60)} height={15} />
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                ))}
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    )
}

export default MyMembersSkeleton