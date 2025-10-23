import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import LargeText from "../AppText/LargeText";
import SmallText from "../AppText/SmallText";
import AppButton from "../Button/AppButton";
import { AppFonts } from "../../constants/AppFonts";
import NormalText from "../AppText/NormalText";

const AlertMessageModal = ({
  isVisible,
  setVisible,
  onOkayPress,
  onCancelPress,
  errorTitle,
  errorBody,
  okayButtonText,
  cancelButtonText,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={{ margin: 0 }}
      onBackButtonPress={() => setVisible && setVisible()}
      onBackdropPress={() => setVisible && setVisible()}
      animationInTiming={0}
      animationOutTiming={0}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
    >
      <View style={customStyles.mainContainer}>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <LargeText
            text={errorTitle}
            customStyle={customStyles.inviteTextStyle}
          />
          <View style={customStyles.bodyTextContainer}>
            <SmallText
              text={errorBody}
              customStyle={customStyles.bodyTextStyle}
            />
          </View>
          <View style={customStyles.buttonContainer}>
            <AppButton
              text={okayButtonText || 'oK'}
              customStyle={{ paddingVertical: 10 }}
              onPress={onOkayPress}
            />
            {onCancelPress && (
              <View style={customStyles.cancelButtonContainer}>
                <TouchableOpacity onPress={onCancelPress}>
                  <NormalText
                    text={cancelButtonText || 'cancel'}
                    customStyle={customStyles.cancelButtonTextStyle}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertMessageModal;

const customStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
  inviteTextStyle: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: AppFonts.Avenir.medium,
    lineHeight: 27.31,
  },
  bodyTextContainer: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyTextStyle: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "400",
    fontFamily: AppFonts.Avenir.light,
    // color: THEME.text.primary,
    lineHeight: 23.25,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  cancelButtonContainer: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonTextStyle: {
    // color: THEME.text.tetra,
    fontSize: 18,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
