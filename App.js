import React, { useEffect, useState } from "react";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { LocationProvider } from "./context/LocationContext";
import { FirebaseProvider } from "./context/FirebaseContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
import LocationScreen from "./pages/LocationScreen";
import CustomTabs from "./components/CustomTabs";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Establishment from "./pages/Establishment";
const Stack = createStackNavigator();

export default function App() {
  const { user } = useAuth() || {};
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
          console.log("Dados do usuário recuperados:", parsedUserData);
        }
      } catch (error) {
        console.error(
          "Erro ao recuperar dados do AsyncStorage:",
          error.message
        );
      }
    };

    retrieveUserData();
  }, []);

  return (
    <GluestackUIProvider config={config}>
      <AuthProvider>
        <FirebaseProvider>
          <LocationProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={userData ? "CustomTabs" : "Location"}
              >
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
          </LocationProvider>
        </FirebaseProvider>
      </AuthProvider>
    </GluestackUIProvider>
  );
}
