import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppRoutes } from '../../../constants/AppRoutes';
import MainProfile from './MainProfile/MainProfile';
import MyMembers from './MyMembers/MyMembers';
import AddMember from './MyMembers/AddMember';

const ProfileStack = createNativeStackNavigator();
const Profile = () => {
    return (
        <ProfileStack.Navigator
            initialRouteName={AppRoutes.MainProfile}
            screenOptions={{
                headerShown: false
            }}>
            <ProfileStack.Screen name={AppRoutes.MainProfile} component={MainProfile} />
            <ProfileStack.Screen name={AppRoutes.MyMembers} component={MyMembers} />
            <ProfileStack.Screen name={AppRoutes.AddMember} component={AddMember} />
        </ProfileStack.Navigator>
    )
}

export default Profile