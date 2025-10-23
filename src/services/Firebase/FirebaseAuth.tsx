import auth from '@react-native-firebase/auth';

export const Logout = async () => {
    await auth()
        .signOut()
        .then(() => console.log('User signed out!'));
}