import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { AppColors } from '../../assets/colors/AppColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const IssuesArray = [
    {
        id: 0,
        name: 'Allergies'
    },
    {
        id: 1,
        name: 'Hearing problems'
    },
    {
        id: 2,
        name: 'Vision problems'
    },
    {
        id: 3,
        name: 'Diabetes'
    },
    {
        id: 4,
        name: 'Cancer'
    },
    {
        id: 5,
        name: 'Flu'
    },
    {
        id: 6,
        name: 'Concussion'
    },
    {
        id: 7,
        name: 'Kidney diseases'
    },
    {
        id: 8,
        name: 'Heart problems'
    },
    {
        id: 9,
        name: 'Blood pressure problems'
    },
]
const PreconditionsSkeleton = () => {
    return (
        <SkeletonPlaceholder shimmerWidth={250} speed={1400}>
            <SkeletonPlaceholder.Item marginTop={hp(1)}>
                <SkeletonPlaceholder.Item width={wp(85)} height={hp(6)} borderRadius={50} alignSelf={'center'} />
                <SkeletonPlaceholder.Item marginLeft={25} marginTop={hp(3)}>
                    <SkeletonPlaceholder.Item width={180} height={20} borderRadius={100} />
                    <SkeletonPlaceholder.Item width={wp(85)} flexDirection='row' flexWrap='wrap' marginTop={hp(1)}>
                        {IssuesArray.map((item) => (
                            <SkeletonPlaceholder.Item key={item.id} width={wp(11 + (2 * item.name.length))} height={hp(5)} borderRadius={50} marginHorizontal={3} marginVertical={3} />
                        ))}
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    )
}

export default PreconditionsSkeleton

const styles = StyleSheet.create({})