import AsyncStorage from '@react-native-async-storage/async-storage';
import { isDebugging } from '../../utilis/Debugging';
import { LocalKeys } from './LocalKeys';

class PrefHandler {

    async createSession(key, token, onCompleted) {
        try {
            await AsyncStorage.setItem(key, token)
            onCompleted(true)
        } catch (error) {
            if (isDebugging) {
                console.log('/n/ncreateSession', error.message, '/n/n')
            }
            onCompleted(false)
        }
    }

    async getSession(key) {
        try {
            const result = await AsyncStorage.getItem(key)
            console.log('/n/ncreateSession', result, '/n/n')
            return result

        } catch (error) {
            if (isDebugging) {
                console.log('/n/ncreateSession', error.message, '/n/n')
            }
            return null
        }
    }

    async deleteSession(key, onResult) {
        await AsyncStorage.removeItem(key)
        onResult()
    }

    async removeLocalUserSession() {
        const keys = [
            LocalKeys.CONFIMER_INFO_SESSION,
            LocalKeys.COMPLETE_PROFILE_SESSION,
            LocalKeys.NAME_KEY,
            LocalKeys.MAJOR_CLASS_KEY,
            LocalKeys.YOUR_MAJOR_KEY,
            LocalKeys.PRONOUN,
            LocalKeys.GRADUATION_CLASS,
            LocalKeys.YOUR_DARTMOUTH_TEAMS_AND_CLUBS,
            LocalKeys.INTERESTPICKER,
            LocalKeys.TIDBITLOCATION,
            LocalKeys.TIDBIT_LIST,
            LocalKeys.IMAGE
        ]
        await AsyncStorage.multiRemove(keys)
    }

}

export const prefHandler = new PrefHandler();