import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import {  KeyboardAvoidingView, Platform } from "react-native";
import Home from "../pages/Home";
import Scheduling from "../pages/Scheduling";
import Account from "../pages/Account";
import { View } from "@gluestack-ui/themed";

const Tab = createBottomTabNavigator();

export default function CustomTabs() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: "#4D0288",
            borderTopWidth: 0,
            position: "absolute",
            left: 14,
            right: 14,
            bottom: 10,
            borderRadius: 10,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color, focused }) => {
            let iconName;
            let iconColor;

            if (route.name === "Home") {
              iconColor = focused ? "#FFFFFF" : "#4D0288";

              return (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 60,
                    height: 60,
                    backgroundColor: focused ? "#FFFFFF" : "#4D0288",
                    borderRadius: 30,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: focused ? "#4D0288" : "#FFFFFF",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="calendar-month"
                      size={size}
                      color={focused ? "#FFFFFF" : "#4D0288"}
                    />
                  </View>
                </View>
              );
            }

            if (route.name === "Scheduling") {
              iconName = "schedule";

              iconColor = focused ? "#FFFFFF" : color;
            }

            if (route.name === "Account") {
              iconName = "account-circle";

              iconColor = focused ? "#FFFFFF" : color;
            }

            return (
              <MaterialIcons name={iconName} size={size} color={iconColor} />
            );
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Scheduling" component={Scheduling} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
}
