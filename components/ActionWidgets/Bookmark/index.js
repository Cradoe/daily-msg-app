import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Icon, Tooltip } from "@ui-kitten/components";
import { globalStyles } from "../../../shared/globalStyles";

const BookmarkWidget = ( { action } ) => {
  const [ visible, setVisible ] = useState( false ),
    handlePress = () => {
      setVisible( true );
      action();
      setTimeout( () => {
        setVisible( false );
      }, 1500 );
    },
    renderCopyAnchor = () => (
      <TouchableOpacity
        onPress={handlePress}
        style={globalStyles.widgetHMargin}
      >
        <Icon
          fill="#8F9BB3"
          name="bookmark"
          style={[ globalStyles.widgetIcon ]}
        />
      </TouchableOpacity>
    );

  return (
    <Tooltip
      anchor={renderCopyAnchor}
      visible={visible}
      onBackdropPress={() => setVisible( false )}
    >
      Added to bookmark
    </Tooltip>
  );
};

export default BookmarkWidget;
