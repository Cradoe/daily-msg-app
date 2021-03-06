import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { globalStyles } from "../../shared/globalStyles";
import ViewShot from "react-native-view-shot";
import ItemCard from "../ItemCard";
import ActionWidgets from "../BookmarkActionWidgets";
import {
  captureAndSaveScreenshot,
  captureAndShareScreenshot,
  copyToClipboard,
  removeBookmarkedQuote
} from "../../helpers";

const BookmarkItem = ( { quote } ) => {
  const [ showAtrribute, setShowAtrribute ] = useState( false ),
    viewShotRef = useRef( null ),
    dispatch = useDispatch(),
    ActionWidgetActions = {
      shareAsImage: () => {
        captureAndShareScreenshot( viewShotRef, setShowAtrribute );
      },
      downloadAsImage: () => {
        captureAndSaveScreenshot( viewShotRef, setShowAtrribute );
      },
      copyToClipboard: () => {
        copyToClipboard(
          `${quote.quote} ${quote.citation ? " - " + quote.citation : ""}`
        );
      },
      removeBookmark: () => {
        dispatch( removeBookmarkedQuote( quote ) );
      }
    };
  return (
    <>
      <ActionWidgets action={ActionWidgetActions} />
      <ViewShot
        style={[ globalStyles.containerPadding, { paddingBottom: 10 } ]}
        ref={viewShotRef}
        options={{ format: "png", quality: 1 }}
      >
        <ItemCard quote={quote} showAtrribute={showAtrribute} />
      </ViewShot>
    </>
  );
};

export default BookmarkItem;
