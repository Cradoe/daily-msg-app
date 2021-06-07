import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon, Tooltip } from "@ui-kitten/components";
import { globalStyles } from "../../../shared/globalStyles";

const DownloadWidget = ({ action }) => {
  const [visible, setVisible] = React.useState(false),
    [text, setText] = React.useState("Downloading...");

  const handlePress = () => {
    action();
    setVisible(true);

    setTimeout(() => {
      setText("Image Downloaded");
    }, 800);

    setTimeout(() => {
      setVisible(false);
      setText("Downloading...");
    }, 1500);
  };
  const renderCopyAnchor = () => (
    <TouchableOpacity onPress={handlePress} style={globalStyles.widgetHMargin}>
      <Icon fill="#8F9BB3" name="download" style={[globalStyles.widgetIcon]} />
    </TouchableOpacity>
  );

  return (
    <Tooltip
      anchor={renderCopyAnchor}
      visible={visible}
      onBackdropPress={() => setVisible(false)}
    >
      {text}
    </Tooltip>
  );
};

export default DownloadWidget;
