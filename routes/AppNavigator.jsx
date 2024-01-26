// AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LocationScreen from "../pages/LocationScreen";
import Establishment from "../pages/Establishment";
import CustomTabs from "../components/CustomTabs";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Location">
        <Stack.Screen
          name="Location"
          component={LocationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomTabs"
          component={CustomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Establishment"
          component={Establishment}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
