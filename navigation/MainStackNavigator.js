import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { screenOptionStyle } from "./screenOptionStyle";
import SplashScreen from "../screens/spashScreen/";
import HomeScreen from "../screens/homeScreen";
import Test from "../screens/test";

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Test"
          component={Test}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
