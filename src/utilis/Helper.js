import { CommonActions } from "@react-navigation/native";
import { Alert, Linking, Platform } from "react-native";
import Toast from "react-native-root-toast";

class Helpers {
  isEmptyString(str) {
    return str == "" || !str;
  }

  isEmptyArray(arr) {
    return !arr || arr.length == 0;
  }

  isValidEmail(email) {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePhoneNumber = (phoneNumber) => {
    const ukPhoneRegex = /^(?:0|\+?44)(?:\d\s?){9,10}$/; ///^((\+44)|(0044)|(0))\s{0,1}[1-9]{1}[0-9]{3}\s{0,1}[0-9]{3}$/;
    return ukPhoneRegex.test(phoneNumber);
  };

  isValidPassword(password) {
    let re =
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$_&-+-()/="':;?,.<>%^&*])[a-zA-Z0-9!@#$_&-+-()/="':;?,.<>%^&*]{8,100}$/;
    return password.match(re);
  }
  convertTo12HourFormat = (hour) => {
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${adjustedHour}${suffix}`;
  };
  showToast(message, background, color) {
    try {
      let toast = Toast.show(message, {
        duration: Toast.durations.SHORT,
        position:
          Platform.OS == "ios" ? Toast.positions.TOP : Toast.positions.BOTTOM,
        backgroundColor: "white",
        textColor: color ? color : "black",
        // shadow: true,
        opacity: 1.0,
        animation: true,
        hideOnPress: true,
        containerStyle: {
          width: "90%",
          borderRadius: 10,
          marginTop: Platform.OS == "ios" ? 64 : 0,
        },
        delay: 0,

        onShow: () => {
          // calls on toast\`s appear animation start
        },
        onShown: () => {
          // calls on toast\`s appear animation end.
        },
        onHide: () => {
          // calls on toast\`s hide animation start.
        },
        onHidden: () => {
          // calls on toast\`s hide animation end.
        },
      });
    } catch (error) {
      console.log("showToast ==> ", error);
    }
  }

  resetAndGo(navigation, routeName) {
    try {
      if (navigation && !this.isEmptyString(routeName)) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: routeName }],
          })
        );
      }
    } catch (error) {
      console.log("resetAndGo ==> ", error);
    }
  }
  resetAndGoWithParams(navigation, routeName, params) {
    try {
      if (navigation && !this.isEmptyString(routeName)) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: routeName, params: params }],
          })
        );
      }
    } catch (error) {
      console.log("resetAndGo ==> ", error);
    }
  }

  hexToRgbA(hex, alpha) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return (
        "rgba(" +
        [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
        "," +
        alpha +
        ")"
      );
    }
    return "";
  }

  showAlert(title, msg) {
    Alert.alert(title, msg, [{ text: "Okay", style: "cancel" }]);
  }

  openWebLink(urlLink) {
    Linking.canOpenURL(urlLink).then((supported) => {
      if (supported) {
        Linking.openURL(urlLink);
      } else {
        console.log("Don't know how to open URI: " + urlLink);
      }
    });
  }

  getDaysInfo() {
    return {
      SUN: { index: 0, name: "Sunday" },
      MON: { index: 1, name: "Monday" },
      TUE: { index: 2, name: "Tuesday" },
      WED: { index: 3, name: "Wednesday" },
      THU: { index: 4, name: "Thursday" },
      FRI: { index: 5, name: "Friday" },
      SAT: { index: 6, name: "Saturday" },
    };
  }

  getWithZero(num) {
    return ("0" + num).slice(-2);
  }
}

/// ===============  Logger =============== ///
logger = (screenName, functionaName, log, isError) => {
  const isDebugging = true;
  if (isDebugging) {
    if (isError) {
      console.log("\x1B[31m \n", screenName, "\t", functionaName, "\t", log, "\n");
    } else {
      console.log("\x1B[34m \n", screenName, "\t", functionaName, "\t", log, "\n");
    }

  }
}
const Helper = new Helpers();

export default Helper;
