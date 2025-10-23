import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appKeys } from '../../network/AppKeys';
import { BASE_URL } from '../../network/NetworkRequest';

export const notificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        
    });

    messaging().getInitialNotification().then(remoteMessage => {
        if (remoteMessage) {
            console.log(
                'Notification caused app to open from quit state:',
                remoteMessage.notification,
            );
        }
    });
}


export const getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    const bearerToekn = await AsyncStorage.getItem(appKeys.sessionToken);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${bearerToekn}`);

    const raw = JSON.stringify({
        deviceToken: token,
        deviceType: Platform.OS === 'ios' ? 'iOS' : 'Android',
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    fetch(BASE_URL + "user/storeDevice-token", requestOptions)
        .then((response) => response.json())
        .then((result) => {
        })
        .catch((error) => {
            console.log("Error=========>>>>>>>>>>>>>>>>>>>", error)
        });

}
