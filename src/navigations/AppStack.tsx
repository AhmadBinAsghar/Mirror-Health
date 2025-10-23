import React from 'react'
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack';
import { useDispatch, useSelector } from 'react-redux';
import BleProvider from './BleProvider';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { AppRoutes } from '../constants/AppRoutes';
import * as RootNavigation from '../../RootNavigation';
import { navigationRef } from '../../RootNavigation';
import BleManager from 'react-native-ble-manager'
import SplashScreen from '../views/Splash/SplashScreen';
import { bleDataSave } from '../redux/Slices/BleSlice';
import { userDetailsSave } from '../redux/Slices/userDataSlice';

interface notify {
    collapseKey?: string
    data?: object
    from?: string
    messageId?: string
    notification?: {
        android?: {}
        body?: string
        title?: string
    }
    sentTime?: number
    ttl?: number
}

const AppStack = () => {
    const userData = useSelector((state: any) => state.userData)
    const [user, setUser] = React.useState<boolean>(false);
    const [initializing, setInitializing] = React.useState<boolean>(true)
    const Ble = BleProvider();
    const dispatch = useDispatch();

    const checkBleState = async () => {
        const state = await BleManager.checkState();
        if (state === "off") {
            dispatch(bleDataSave({ connected: false }))
            dispatch(userDetailsSave({ notify: false }));
        }
    }

    React.useEffect(() => {
        BleManager.start({ showAlert: true, }).then(() => {
            checkBleState()
            Ble.requestPermisions();
        })
    }, [])

    // React.useEffect(() => {
    //     if (Ble.connected === true) {
    //         toast.show('Device connected successfully', {
    //             type: 'custom',
    //             icon: AppImages.verified,
    //             placement: "bottom",
    //             duration: 1500,
    //             animationType: "slide-in",
    //         })
    //     }
    // }, [Ble.connected])
    React.useEffect(() => {
        if (userData?.accessToken) {
            setUser(true)
            setInitializing(false)
        } else {
            setInitializing(false)
            setUser(false)
        }
    }, [userData?.accessToken])

    function handleNotificationOpen(notification: any) {
        const { data }: any = notification;
        data?.type === 'request' ? RootNavigation.navigate(AppRoutes.HomeStack, { screen: AppRoutes.Profile, params: { screen: AppRoutes.MyMembers } }) : RootNavigation.navigate(AppRoutes.Notifications);
    }
    async function onDisplayNotification(message: notify) {
        await notifee.requestPermission()
        const channelId = await notifee.createChannel({
            id: message?.messageId ?? '',
            name: message?.from ?? '',
        });
        const notificationId = await notifee.displayNotification({
            title: message?.notification?.title,
            body: message?.notification?.body,
            android: {
                channelId,
            },
        });
        await notifee.displayNotification({
            title: message?.notification?.title,
            body: message?.notification?.body,
            android: {
                channelId,
            },
        });
        notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.DISMISSED:
                    break;
                case EventType.PRESS:
                    handleNotificationOpen(message);
                    break;
            }
        });
        notifee.onBackgroundEvent(async ({ type, detail }) => {
            const { notification, pressAction } = detail;
            if (type === EventType.ACTION_PRESS && pressAction?.id === 'mark-as-read') {
                handleNotificationOpen(message);
                await notifee.cancelNotification(notificationId);
            }
        });
    }

    React.useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            onDisplayNotification(remoteMessage);
        });
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            onDisplayNotification(remoteMessage);
        });
        messaging().onNotificationOpenedApp(remoteMessage => {
            onDisplayNotification(remoteMessage);
        });
        return unsubscribe;
    }, []);
    if (initializing) {
        return <SplashScreen />
    }

    return (
        <NavigationContainer ref={navigationRef}>
            {user ?
                <MainStack />
                :
                <AuthStack />
            }
        </NavigationContainer>
    )
}

export default AppStack