import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from '../views/Auth/Login/Login';
import { AppRoutes } from '../constants/AppRoutes';
import GetStartedScreen from '../views/Auth/GetStartedModule/GetStartedScreen';
import SignUpOptions from '../views/Auth/SignUpOptions/SignUpOptions';
import SignupScreen from '../views/Auth/SignupScreen/SignupScreen';
import CodeVerification from '../views/Auth/CodeVerification/CodeVerification';
import PasswordCreation from '../views/Auth/PasswordCreation/PasswordCreation';
import CompleteRegisteration from '../views/Auth/CompleteRegisteration/CompleteRegisteration';
import ForgortPasswordScreen from '../views/Auth/ForgotPassword/ForgortPasswordScreen';
import NewPassword from '../views/Auth/NewPassword/NewPassword';
import Onboarding from '../views/Auth/OnboardingScreens/Onboarding';
import { useSelector } from 'react-redux';
import MyDevice from '../views/Home/Profile/MyDevice/MyDevice';

const AuthStacks = createNativeStackNavigator();
const AuthStack = () => {
    const UserDetails = useSelector((state: any) => state.userData.userDetails);
    return (
        <AuthStacks.Navigator
            // initialRouteName={AppRoutes.Onboarding}
            initialRouteName={UserDetails?.calibration === false ? AppRoutes.Onboarding : AppRoutes.GetStarted}
            screenOptions={{
                headerShown: false,
            }}>
            <AuthStacks.Screen name={AppRoutes.GetStarted} component={GetStartedScreen} />
            <AuthStacks.Screen name={AppRoutes.Login} component={Login} />
            <AuthStacks.Screen name={AppRoutes.SignupOptions} component={SignUpOptions} />
            <AuthStacks.Screen name={AppRoutes.SignUp} component={SignupScreen} />
            <AuthStacks.Screen name={AppRoutes.CodeVerification} component={CodeVerification} />
            <AuthStacks.Screen name={AppRoutes.PasswordCreation} component={PasswordCreation} />
            <AuthStacks.Screen name={AppRoutes.CompleteRegisteration} component={CompleteRegisteration} />
            <AuthStacks.Screen name={AppRoutes.ForgotPassword} component={ForgortPasswordScreen} />
            <AuthStacks.Screen name={AppRoutes.NewPassword} component={NewPassword} />
            <AuthStacks.Screen name={AppRoutes.Onboarding} component={Onboarding} />
            <AuthStacks.Screen name={AppRoutes.MyDevice} component={MyDevice} />
        </AuthStacks.Navigator>
    )
}

export default AuthStack