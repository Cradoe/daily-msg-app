import React from "react";
import { View } from "react-native";
import { globalStyles } from "../../shared/globalStyles";
import ShareWidget from "./Share";
import DownloadWidget from "./Download";
import BookmarkWidget from "./Bookmark";
import CopyWidget from "./Copy";

const ActionWidgets = ({ action }) => {
  return (
    <View
      style={[
        { justifyContent: "flex-end" },
        globalStyles.m40,
        globalStyles.flexRow
      ]}
    >
      <BookmarkWidget action={action.bookmark} />
      <DownloadWidget action={action.downloadAsImage} />
      <CopyWidget action={action.copyToClipboard} />
      <ShareWidget action={action.shareAsImage} />
    </View>
  );
};

export default ActionWidgets;
