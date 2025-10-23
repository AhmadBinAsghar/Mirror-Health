
import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth, { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

// import { googleWebClientId } from '../../utilis/AppKeys';


interface SignInInterface {
    onSuccess: any,
    onError: any,
}



const onGoogleLogin = async ({ onSuccess, onError }: SignInInterface) => {
    try {

        GoogleSignin.configure({
            webClientId:
                Platform?.OS == 'ios' ? '847757642270-jmrs2vkst1l8mtar1i5gj093s00mo0cg.apps.googleusercontent.com' :
                    '847757642270-mtntsseftd8b1qmlonsbk3n9603h49jr.apps.googleusercontent.com',
            scopes: ["profile", "email"]
        });

        await GoogleSignin.signOut();
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken, user } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential

        const googleSignIn = await auth().signInWithCredential(googleCredential);

        if (googleSignIn.user) {
            onSuccess(googleSignIn.user, user);
        }

    } catch (error) {
        onError(error);
    }
}

const onFaceBookLogin = async ({ onSuccess, onError }: SignInInterface) => {
    // LoginManager.logOut()
    try {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        if (result.isCancelled) {
            onError(result.isCancelled);
        } else {
            await AccessToken.getCurrentAccessToken().then(async (data: any) => {
                const token = data?.accessToken;
                let url = `https://graph.facebook.com/me?fields=id,first_name,last_name,email,picture.type(large)&access_token=${token}`;
                const response = await fetch(url);
                let res = await response.json();
                const { id, first_name, last_name, email, picture } = res
                if (!response.status) {
                    onError(response.status);
                    // Helper.showToast(response.status.toString());
                    // throw 'Something went wrong obtaining access token';
                }
                const facebookCredential = auth.FacebookAuthProvider.credential(data?.accessToken);
                var fbRes = await auth().signInWithCredential(facebookCredential);
                onSuccess({
                    uid: id,
                    firstName: first_name,
                    lastName: last_name,
                    email: email,
                    profilePic: picture?.data?.url,
                    fullName: first_name + " " + last_name,
                    token: token
                });
            })
        }

    } catch (error) {
        onError(error);
    }
}

const appleAuthLogin = async ({ onSuccess, onError }: SignInInterface) => {
    try {

        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        const { identityToken, nonce, email, fullName } = appleAuthRequestResponse;

        if (identityToken) {
            const appleCredential = firebase.auth.AppleAuthProvider.credential(identityToken, nonce);

            const userCredential = await firebase.auth().signInWithCredential(appleCredential);


            const givenName = fullName?.givenName ? (fullName?.givenName + " ") : ""
            const middleName = fullName?.middleName ? (fullName?.middleName + " ") : ""
            const familyName = fullName?.familyName ? (fullName?.familyName) : ""
            const userData = {
                email: email,
                first_name: givenName,
                last_name: familyName,
                displayName: givenName + middleName + familyName,
                uid: userCredential?.user?.uid
            }

            onSuccess(userData)

        }
    } catch (error) {
        onError(error);
    }
}

export { appleAuthLogin, onFaceBookLogin, onGoogleLogin };

