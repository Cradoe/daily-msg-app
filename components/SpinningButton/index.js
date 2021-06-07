import React, { useState, useEffect } from "react";
import { Button, Spinner, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { globalStyles } from "../../shared/globalStyles";

const SpinningButton = (props) => {
  const loadingText = props.loadingText ? props.loadingText : "Loading...",
    [hasBeenPressed, setHasBeenPressed] = useState(false),
    handlePress = () => {
      setHasBeenPressed(true);
      if (props.onPress) props.onPress();
      setTimeout(() => {
        setHasBeenPressed(false);
      }, 800);
    };

  return (
    <Button
      style={props.style ? props.style : null}
      size={props.size ? props.size : "medium"}
      onPress={handlePress}
    >
      <View
        style={[
          globalStyles.flexRow,
          globalStyles.alignCenter,
          globalStyles.justifySpaceBetween
        ]}
      >
        {hasBeenPressed ? (
          <Spinner status="basic" size={props.size ? props.size : "medium"} />
        ) : null}
        <Text
          style={props.textStyle ? props.textStyle : [globalStyles.textWhite]}
        >
          {hasBeenPressed ? loadingText : props.text ? props.text : "Submit"}
        </Text>
      </View>
    </Button>
  );
};

export default SpinningButton;
