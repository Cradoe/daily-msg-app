import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { MenuItem, OverflowMenu, Icon, Text } from "@ui-kitten/components";
import { globalStyles } from "../../shared/globalStyles";
import { globalConstants } from "../../constants";
import { fetchAllCategories } from "../../actions";

const QuoteViewTitle = (props) => {
  const { onSelect, onSwipe, categories } = props,
    [visible, setVisible] = useState(false),
    [cat, setLoadedCat] = useState([]),
    [selectedCategory, setSelectedCategory] = useState(
      globalConstants.INITIAL_CATEGORY
    ),
    handleIndexChange = ({ index }) => {
      setVisible(false);
      setSelectedCategory(cat[index.row]);
    },
    successCallback = (data) => {
      setLoadedCat(data);
    },
    errorCallback = (error) => {
      console.log(error);
    },
    callback = {
      success: successCallback,
      error: errorCallback
    },
    fetchCategoriesFromServer = async () => {
      await fetchAllCategories(callback);
    };

  const categoryMenuItems =
    categories.length > 0
      ? categories.map((category, index) => (
          <MenuItem
            title={category.category}
            key={index}
            onPress={handleIndexChange}
          />
        ))
      : [];

  useEffect(() => {
    // console.log("categories", categories);
    if (cat.length === 0) fetchCategoriesFromServer();
  }, []);

  useEffect(() => {
    if (selectedCategory) onSelect(selectedCategory.slug);
  }, [selectedCategory]);

  useEffect(() => {
    const swipedCategory = categories[onSwipe];
    if (swipedCategory && swipedCategory.id !== selectedCategory.id)
      setSelectedCategory(categories[onSwipe]);
  }, [onSwipe]);

  const renderToggleButton = () => (
    <TouchableOpacity onPress={() => setVisible(true)}>
      <View
        style={[
          globalStyles.flexRow,
          globalStyles.centerCenter,
          globalStyles.mt40
        ]}
      >
        <Text
          style={[
            globalStyles.textWhite,
            globalStyles.textCenter,
            { fontSize: 20 }
          ]}
        >
          {selectedCategory.category}
        </Text>
        <Icon
          fill="#8F9BB3"
          name="arrow-down-outline"
          style={[globalStyles.widgetIcon]}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {categories.length > 0 && selectedCategory ? (
        <OverflowMenu
          style={styles.overflowMenu}
          visible={visible}
          anchor={renderToggleButton}
          fullWidth={true}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
        >
          {categoryMenuItems}
        </OverflowMenu>
      ) : null}
    </>
  );
};

export default QuoteViewTitle;
const styles = StyleSheet.create({
  overflowMenu: {
    width: (80 / 100) * globalConstants.SCREEN_WIDTH,
    maxHeight: (70 / 100) * globalConstants.SCREEN_HEIGHT
  },
  backdrop: {
    backgroundColor: "transparent"
  }
});
