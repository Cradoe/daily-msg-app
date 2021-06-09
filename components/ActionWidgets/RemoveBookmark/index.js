import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "@ui-kitten/components";
import { globalStyles } from "../../../shared/globalStyles";
import { globalConstants } from "../../../constants";

const RemoveBookmarkWidget = ({ action }) => {
  return (
    <TouchableOpacity onPress={action} style={globalStyles.widgetHMargin}>
      <Icon
        fill={globalConstants.SECONDARY_COLOR}
        name="bookmark"
        style={[globalStyles.widgetIcon]}
      />
    </TouchableOpacity>
  );
};

export default RemoveBookmarkWidget;
