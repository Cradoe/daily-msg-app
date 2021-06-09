import React from "react";
import { Text } from "@ui-kitten/components";
import { globalConstants } from "../../constants";
import { globalStyles } from "../../shared/globalStyles";
import { StyleSheet } from "react-native";

const Attribution = () => {
  return (
    <Text
      style={[
        globalStyles.textWhite,
        globalStyles.textCenter,
        globalStyles.bgBlack,
        styles.container
      ]}
    >
      {globalConstants.ATTRIBUTION}
    </Text>
  );
};
export default Attribution;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -10,
    left: "26%",
    borderColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 20
  }
});
