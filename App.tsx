import React from "react";
import { Image, StatusBar, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppStack from "./src/navigations/AppStack";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastProvider } from "react-native-toast-notifications";
import { AppColors } from "./src/assets/colors/AppColors";
import { AppFonts } from "./src/constants/AppFonts";
import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import SmallText from "./src/components/AppText/SmallText";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SocketProviderContext } from "./src/socketContext/socketContextProviders";

function App() {
  let persistor = persistStore(store);

  GoogleSignin.configure({
    webClientId: '847757642270-mtntsseftd8b1qmlonsbk3n9603h49jr.apps.googleusercontent.com',
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SocketProviderContext>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ToastProvider
              renderToast={(toastOptions) => (
                <LinearGradient
                  colors={[AppColors.lightBlue, AppColors.darkBlue]}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={{
                    flexDirection: 'row',
                    width: wp(85),
                    height: 55,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: AppColors.borderColor,
                    padding: 15,
                    alignItems: "center",
                  }}>
                  <Image source={toastOptions?.icon} resizeMode='contain' style={{ width: 25, height: 25 }} />
                  <SmallText text={toastOptions?.message} customStyle={{ fontFamily: AppFonts.GeneralSans.medium, color: AppColors.white, marginLeft: 10 }} />
                </LinearGradient>
              )}
            >
              <SafeAreaProvider style={{ flex: 1 }}>
                <StatusBar
                  barStyle={"dark-content"}
                  backgroundColor={'transparent'}
                  translucent
                />
                <AppStack />
              </SafeAreaProvider>
            </ToastProvider>
          </PersistGate>
        </Provider>
      </SocketProviderContext>
    </GestureHandlerRootView>
  );
}

export default App;
