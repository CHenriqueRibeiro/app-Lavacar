import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import LocationScreen from "./pages/LocationScreen";
import { LocationProvider } from "./context/LocationContext";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <LocationProvider>
      <Box width="100%" justifyContent="center" alignItems="center">
        <LocationScreen />
      </Box>
      </LocationProvider>
    </GluestackUIProvider>
  );
}
