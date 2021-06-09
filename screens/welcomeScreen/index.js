import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Text
} from "@ui-kitten/components";
import { globalConstants } from "../../constants";
import { globalStyles } from "../../shared/globalStyles";
import About from "../aboutScreen";
import BookmarkScreen from "../bookmarkScreen";
import HomeScreen from "../homeScreen";

const { Navigator, Screen } = createBottomTabNavigator();

const HomeIcon = (props) => (
  <Icon {...props} fill={globalConstants.PRIMARY_COLOR} name="home-outline" />
);
const BookmarkIcon = (props) => (
  <Icon {...props} fill={globalConstants.PRIMARY_COLOR} name="bookmark" />
);

const AboutIcon = (props) => (
  <Icon
    {...props}
    fill={globalConstants.PRIMARY_COLOR}
    name="smiling-face-outline"
  />
);
const tabTitle = (title) => {
  return (
    <Text
      style={[
        globalStyles.textPrimary,
        globalStyles.textSmall,
        globalStyles.fontRegular
      ]}
    >
      {title}
    </Text>
  );
};
const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    indicatorStyle={{
      backgroundColor: globalConstants.SECONDARY_COLOR,
      color: globalConstants.PRIMARY_COLOR,
      height: 4
    }}
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title={() => tabTitle("Home")} icon={HomeIcon} />
    <BottomNavigationTab
      title={() => tabTitle("Bookmark")}
      icon={BookmarkIcon}
    />
    <BottomNavigationTab title={() => tabTitle("About")} icon={AboutIcon} />
  </BottomNavigation>
);

const WelcomeScreen = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Bookmark" component={BookmarkScreen} />
    <Screen name="About" component={About} />
  </Navigator>
);

export default WelcomeScreen;
