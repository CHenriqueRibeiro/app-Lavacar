import React from 'react';
import { GluestackUIProvider, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

import { LocationProvider } from "./context/LocationContext";
import AppNavigator from './routes/AppNavigator';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <LocationProvider>
        <AppNavigator />
      </LocationProvider>
    </GluestackUIProvider>
  );
}
