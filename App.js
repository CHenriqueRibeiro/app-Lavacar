import React, { useState } from "react";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { LocationProvider } from "./context/LocationContext";
import AppNavigator from "./routes/AppNavigator";
import { FirebaseProvider } from "./context/FirebaseContext";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <AuthProvider>
        <FirebaseProvider>
          <LocationProvider>
            <AppNavigator />
          </LocationProvider>
        </FirebaseProvider>
      </AuthProvider>
    </GluestackUIProvider>
  );
}
