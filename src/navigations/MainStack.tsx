import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppRoutes } from '../constants/AppRoutes';
import HomeStack from './HomeStack';
import ChangeLanguage from '../views/Home/Profile/Languages/ChangeLanguage';
import Notification from '../views/Home/Profile/Notification/Notification';
import AppInfo from '../views/Home/Profile/AppInfo/AppInfo';
import MyMetrics from '../views/Home/Profile/MyMetrics/MyMetrics';
import MyPreconditions from '../views/Home/Profile/MyPreconditions/MyPreconditions';
import ChangeEmail from '../views/Home/Profile/ChangeEmail/ChangeEmail';
import ResetPassword from '../views/Home/Profile/ResetPassword/ResetPassword';
import NotificationSettings from '../views/Home/Profile/Notification/NotificationSettings';
import EditInterests from '../views/Home/Profile/EditInterests/EditInterests';
import MemberDetailScreen from '../views/Home/Profile/MyMembers/MemberDetailScreen';
import AddNewContact from '../views/Home/Profile/MyMembers/AddNewContact';
import EditProfile from '../views/Home/Profile/EditProfile/EditProfile';
import FAQ from '../views/Home/Profile/FAQ/FAQ';
import Legal from '../views/Home/Profile/Legal/Legal';
import ContactUs from '../views/Home/Profile/ContactUs/ContactUs';
import HealthMetrics from '../views/Home/Scores/HealthMetrics/HealthMetrics';
import RespiratoryMetrics from '../views/Home/Scores/RespiratoryMetrics/RespiratoryMetrics';
import StressMetrics from '../views/Home/Scores/StressMetrics/StressMetrics';
import ConsumptionMetrics from '../views/Home/Scores/ImmuneMetrics/ConsumptionMetrics';
import ActivityMetrics from '../views/Home/Scores/ActivityMetrics/ActivityMetrics';
import ViewMore from '../views/Home/Scores/ViewMore/ViewMore';
import SleepMetrics from '../views/Home/Scores/SleepMetrics/SleepMetrics';
import CropScreen from '../components/CustomImageCroper/CustomImageCroper';
import TermAndService from '../views/Home/Profile/Legals/TermAndService';
import PrivacyPolicy from '../views/Home/Profile/Legals/PrivacyPolicy';
import License from '../views/Home/Profile/Legals/License';
import BleProvider from './BleProvider';
import BleManager from 'react-native-ble-manager'
import MyDevice from '../views/Home/Profile/MyDevice/MyDevice';

const MainNav = createNativeStackNavigator();
const MainStack = () => {
    // const Ble = BleProvider();

    return (
        <MainNav.Navigator initialRouteName={AppRoutes.HomeStack}
            screenOptions={{
                headerShown: false,
            }}>
            <MainNav.Screen name={AppRoutes.HomeStack} component={HomeStack} />
            <MainNav.Screen name={AppRoutes.Language} component={ChangeLanguage} />
            <MainNav.Screen name={AppRoutes.Notifications} component={Notification} />
            <MainNav.Screen name={AppRoutes.AppInfo} component={AppInfo} />
            <MainNav.Screen name={AppRoutes.MyMetrics} component={MyMetrics} />
            <MainNav.Screen name={AppRoutes.MyPreconditions} component={MyPreconditions} />
            <MainNav.Screen name={AppRoutes.ChangeEmail} component={ChangeEmail} />
            <MainNav.Screen name={AppRoutes.ResetPassword} component={ResetPassword} />
            <MainNav.Screen name={AppRoutes.NotificationSettings} component={NotificationSettings} />
            <MainNav.Screen name={AppRoutes.EditInterests} component={EditInterests} />
            <MainNav.Screen name={AppRoutes.MemberDetailScreen} component={MemberDetailScreen} />
            <MainNav.Screen name={AppRoutes.AddNewContact} component={AddNewContact} />
            <MainNav.Screen name={AppRoutes.EditProfile} component={EditProfile} />
            <MainNav.Screen name={AppRoutes.FAQ} component={FAQ} />
            <MainNav.Screen name={AppRoutes.Legal} component={Legal} />
            <MainNav.Screen name={AppRoutes.TermAndService} component={TermAndService} />
            <MainNav.Screen name={AppRoutes.PrivacyPolicy} component={PrivacyPolicy} />
            <MainNav.Screen name={AppRoutes.License} component={License} />
            <MainNav.Screen name={AppRoutes.ContactUs} component={ContactUs} />
            <MainNav.Screen name={AppRoutes.HealthMetrics} component={HealthMetrics} />
            <MainNav.Screen name={AppRoutes.RespiratoryMetrics} component={RespiratoryMetrics} />
            <MainNav.Screen name={AppRoutes.StressMetrics} component={StressMetrics} />
            <MainNav.Screen name={AppRoutes.ConsumptionMetrics} component={ConsumptionMetrics} />
            <MainNav.Screen name={AppRoutes.ActivityMetrics} component={ActivityMetrics} />
            <MainNav.Screen name={AppRoutes.SleepMetrics} component={SleepMetrics} />
            <MainNav.Screen name={AppRoutes.ViewMore} component={ViewMore} />
            <MainNav.Screen name={AppRoutes.Cropper} component={CropScreen} />
            <MainNav.Screen name={AppRoutes.MyDevice} component={MyDevice} />
        </MainNav.Navigator>
    )
}

export default MainStack