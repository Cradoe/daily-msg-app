import React from "react";
import { View } from "react-native";
import { globalStyles } from "../../shared/globalStyles";
import DownloadWidget from "../ActionWidgets/Download";
import CopyWidget from "../ActionWidgets/Copy";
import ShareWidget from "../ActionWidgets/Share";
import RemoveBookmarkWidget from "../ActionWidgets/RemoveBookmark";

const ActionWidgets = ({ action }) => {
  return (
    <View
      style={[
        { justifyContent: "flex-end" },
        globalStyles.m40,
        globalStyles.flexRow
      ]}
    >
      <RemoveBookmarkWidget action={action.removeBookmark} />
      <DownloadWidget action={action.downloadAsImage} />
      <CopyWidget action={action.copyToClipboard} />
      <ShareWidget action={action.shareAsImage} />
    </View>
  );
};

export default ActionWidgets;
