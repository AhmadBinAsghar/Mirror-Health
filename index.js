/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Text, TextInput } from "react-native";
import messaging from '@react-native-firebase/messaging';
import "./backgroundNotificationHandler";

// Override Text scaling
if (Text.defaultProps) {
    Text.defaultProps.allowFontScaling = false;
} else {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
}

// Override Text scaling in input fields
if (TextInput.defaultProps) {
    TextInput.defaultProps.allowFontScaling = false;
} else {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
})
AppRegistry.registerComponent(appName, () => App);
