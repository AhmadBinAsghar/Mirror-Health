import { Image, Platform, StyleSheet, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from '../views/Home/Profile/Profile';
import { AppRoutes } from '../constants/AppRoutes';
import TeleHealth from '../views/Home/TeleHealth/TeleHealth';
import Scores from '../views/Home/Scores/Scores';
import { AppImages } from '../assets/images/AppImages';
import { AppColors } from '../assets/colors/AppColors';
import SmallText from '../components/AppText/SmallText';
import { AppFonts } from '../constants/AppFonts';
import { getToken, notificationListener } from '../services/FCM/FcmUtilis';

const TabNavigator = createBottomTabNavigator();
const HomeStack = () => {

    React.useEffect(() => {
        notificationListener();
        getToken();
    }, []);
    return (
        <TabNavigator.Navigator
            initialRouteName={AppRoutes.Scores} screenOptions={({ route }) => (
                {
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false,
                    tabBarStyle: styles.tabBar,
                    tabBarIcon: ({ focused }) => {
                        let Icon;
                        let Label;
                        if (route.name === AppRoutes.Scores) {
                            Icon = AppImages.heart;
                            Label = AppRoutes.Scores;
                        } else if (route.name === AppRoutes.TeleHealth) {
                            Icon = AppImages.forum;
                            Label = AppRoutes.TeleHealth;
                        } else if (route.name === AppRoutes.Profile) {
                            Icon = AppImages.profileBlue;
                            Label = AppRoutes.Profile;
                        }
                        return (
                            <View style={styles.tabItem}>
                                <Image source={Icon} tintColor={focused ? AppColors.blue : AppColors.placeholderColor} resizeMode='contain' style={{ width: 25, height: 25, marginVertical: 5 }} />
                                <SmallText text={Label} customStyle={{ fontSize: 12, fontFamily: AppFonts.GeneralSans.medium, color: focused ? AppColors.blue : AppColors.placeholderColor }} />
                            </View>
                        )
                    }
                }
            )}>
            <TabNavigator.Screen name={AppRoutes.Scores} component={Scores} />
            <TabNavigator.Screen name={AppRoutes.TeleHealth} component={TeleHealth} />
            <TabNavigator.Screen name={AppRoutes.Profile} component={Profile} />
        </TabNavigator.Navigator>
    )
}

export default HomeStack

const styles = StyleSheet.create({
    tabBar: {
        height: Platform.OS == "ios" ? 85 : 70,
        borderTopWidth: 1,
        borderColor: AppColors.borderColor
    },
    tabItem: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    }
})