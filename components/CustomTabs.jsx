import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import Home from "../pages/Home";
import Scheduling from "../pages/Scheduling";
import { View } from "@gluestack-ui/themed";
import Account from "../pages/Account";

const Tab = createBottomTabNavigator();

export default function CustomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#4338CA",
          borderTopWidth: 0,
          position: "absolute",
          left: 14,
          right: 14,
          bottom: 10,
          borderRadius: 10,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ size, color }) => {
          let iconName;

          if (route.name === "Home") {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 60,
                  height: 60,
                  backgroundColor: "#4338CA",
                  borderRadius: 30, 
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons name="home" size={size} color={"#4338CA"} />
                </View>
              </View>
            );
          }

          if (route.name === "Scheduling") {
            iconName = "schedule";
          }

          if (route.name === "Account") {
            iconName = "account-circle";
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Scheduling" component={Scheduling} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
