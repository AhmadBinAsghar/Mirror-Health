import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const PrivacyPolicyShimmer = () => {
    return (
        <View style={{ marginTop: 30, flex: 1 }}>
            <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item width={'80%'} height={20} borderRadius={100} alignSelf='center' marginBottom={8} />
                    <SkeletonPlaceholder.Item width={'80%'} height={20} borderRadius={100} alignSelf='center' marginBottom={8} />
                    <SkeletonPlaceholder.Item width={'80%'} height={20} borderRadius={100} alignSelf='center' marginBottom={8} />
                    <SkeletonPlaceholder.Item width={'80%'} height={20} borderRadius={100} alignSelf='center' marginBottom={8} />
                    <SkeletonPlaceholder.Item width={'80%'} height={20} borderRadius={100} alignSelf='center' marginBottom={8} />
                    <SkeletonPlaceholder.Item width={'80%'} height={20} borderRadius={100} alignSelf='center' marginBottom={8} />
                    <SkeletonPlaceholder.Item width={'80%'} height={20} borderRadius={100} alignSelf='center' marginBottom={8} />
                    <SkeletonPlaceholder.Item width={'80%'} height={20} borderRadius={100} alignSelf='center' marginBottom={8} />
                    <SkeletonPlaceholder.Item width={'80%'} height={20} borderRadius={100} alignSelf='center' marginBottom={8} />
                    <SkeletonPlaceholder.Item width={'80%'} height={20} borderRadius={100} alignSelf='center' marginBottom={8} />
                    <SkeletonPlaceholder.Item width={'80%'} height={20} borderRadius={100} alignSelf='center' marginBottom={8} />
                    <SkeletonPlaceholder.Item width={'60%'} height={20} borderRadius={100} alignSelf='center' marginBottom={8} />
                    <SkeletonPlaceholder.Item width={'40%'} height={20} borderRadius={100} alignSelf='center' marginBottom={8} />
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    )
}

export default PrivacyPolicyShimmer

const styles = StyleSheet.create({})