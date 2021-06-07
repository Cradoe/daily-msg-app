import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "@ui-kitten/components";
import { globalStyles } from "../../../shared/globalStyles";

const ShareWidget = ({ action }) => {
  return (
    <TouchableOpacity onPress={action} style={globalStyles.widgetHMargin}>
      <Icon fill="#8F9BB3" name="share" style={[globalStyles.widgetIcon]} />
    </TouchableOpacity>
  );
};

export default ShareWidget;
