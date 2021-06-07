import React, { useState, useEffect } from "react";
import { Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { globalStyles } from "../../shared/globalStyles";

const ErrorMessage = ({ message }) => {
  const [progressWidth, setProgressWidth] = useState(100),
    [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (progressWidth > 0) {
      const timer = setInterval(() => {
        setProgressWidth(progressWidth - 2);
      }, 100);
      return () => {
        clearInterval(timer);
      };
    } else {
      setIsVisible(false);

      setTimeout(() => {
        setProgressWidth(100);
        setIsVisible(true);
      }, 3200);
    }
  }, [progressWidth]);
  return isVisible ? (
    <View
      style={[
        globalStyles.widthBlock,
        { position: "absolute", bottom: 0, backgroundColor: "#F8D7DA" }
      ]}
    >
      <View style={[styles.progressBar, { width: `${progressWidth}%` }]}></View>
      <Text style={[styles.caption, globalStyles.textCenter]}>{message}</Text>
    </View>
  ) : null;
};

export default ErrorMessage;

const styles = StyleSheet.create({
  progressBar: {
    height: 4,
    backgroundColor: "#721C24"
  },
  caption: {
    fontSize: 10,
    paddingVertical: 10,
    color: "#721C24"
  }
});
