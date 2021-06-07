import React, { useState, useEffect } from "react";
import { Button, Text } from "@ui-kitten/components";
import { StyleSheet, View, Image } from "react-native";
import { globalStyles } from "../../shared/globalStyles";
import { noInternet } from "../../shared/generalAssets";
import SpinningButton from "../SpinningButton";

const NoInternet = ({ retryAction }) => {
  return (
    <View style={[globalStyles.centerCenter, { height: "80%" }]}>
      <Image source={noInternet} style={styles.noInternet} />
      <Text style={[globalStyles.textWhite]}>No internet connection</Text>
      <Text style={[globalStyles.textWhite, styles.caption]}>
        Please check your mobile network and try again.
      </Text>
      <SpinningButton
        size="tiny"
        text="Retry"
        loadingText="Connecting..."
        onPress={retryAction}
        style={[globalStyles.mt20]}
        textStyle={[globalStyles.textWhite, { fontSize: 11 }]}
      >
        Retry
      </SpinningButton>
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  noInternet: {
    width: 50,
    height: 45
  },
  caption: {
    fontSize: 10
  }
});
