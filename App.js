import React, { useEffect, useState } from "react";
import { GluestackUIProvider, Spinner, View } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { LocationProvider } from "./context/LocationContext";
import { FirebaseProvider } from "./context/FirebaseContext";
import { AuthProvider } from "./context/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
import LocationScreen from "./pages/LocationScreen";
import CustomTabs from "./components/CustomTabs";
import { NavigationContainer } from "@react-navigation/native";
import Establishment from "./pages/Establishment";
import { firebaseAuth } from "./Config/Firebase";
import { Image } from "@gluestack-ui/themed";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((authUser) => {
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View
        flex={1}
        alignItems="center"
        justifyContent="center"
        bgColor="#FFFFFF"
      >
        <Image
          source={require("./assets/logocomfundo.png")}
          alt="logomarca"
          style={{ width: "100%", height: "50%", resizeMode: "contain" }}
        />
      </View>
    );
  }

  return (
    <GluestackUIProvider config={config}>
      <AuthProvider>
        <FirebaseProvider>
          <LocationProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={
                  firebaseAuth.currentUser === null ? "Location" : "CustomTabs"
                }
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
