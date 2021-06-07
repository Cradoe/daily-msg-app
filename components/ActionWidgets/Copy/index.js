import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon, Tooltip } from "@ui-kitten/components";
import { globalStyles } from "../../../shared/globalStyles";

const CopyWidget = ({ action }) => {
  const [visible, setVisible] = React.useState(false);
  const handlePress = () => {
    setVisible(true);
    action();

    setTimeout(() => {
      setVisible(false);
    }, 800);
  };
  const renderCopyAnchor = () => (
    <TouchableOpacity onPress={handlePress} style={globalStyles.widgetHMargin}>
      <Icon fill="#8F9BB3" name="copy" style={[globalStyles.widgetIcon]} />
    </TouchableOpacity>
  );

  return (
    <Tooltip
      anchor={renderCopyAnchor}
      visible={visible}
      onBackdropPress={() => setVisible(false)}
    >
      Text copied to clipboard
    </Tooltip>
  );
};

export default CopyWidget;
