import { Button, HStack, Heading, Text, VStack } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "../../context/LocationContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome6 } from "@expo/vector-icons";
export default function Header() {
  const [location, setLocation] = useState(null);
  const { user } = useAuth();
  const { handleUseMyLocation, userLocation } = useLocation();

  useEffect(() => {
    const checkAsyncStorage = async () => {
      try {
        const savedDataString = await AsyncStorage.getItem("userLocation");

        if (savedDataString) {
          const savedData = JSON.parse(savedDataString);
          const { location } = savedData;
          setLocation(location);
        }
      } catch (error) {
        console.error("Erro ao recuperar dados do AsyncStorage:", error);
      }
    };

    checkAsyncStorage();
  }, []);

  useEffect(() => {
    setLocation(userLocation);
  }, [userLocation]);

  const handleLocationButtonPress = async () => {
    console.log("Botão de Localização Pressionado!");
    const savedDataString = await AsyncStorage.getItem("userLocation");
    console.log("0", savedDataString);

    await handleUseMyLocation();

    setLocation(userLocation);
  };

  return (
    <VStack
      bg="#4D0288"
      width={"100%"}
      height={120}
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        width={"95%"}
        height={"60%"}
        alignItems="start"
        justifyContent="space-between"
        paddingLeft={8}
        paddingTop={8}
      >
        <Heading color="white" fontWeight="400">
          Olá,
        </Heading>
        <Heading
          fontWeight="700"
          fontSize={32}
          height={"50%"}
          color="white"
          paddingTop={4}
        >
          {user === null ? "Faça seu login" : user.email}
        </Heading>
      </VStack>
      <VStack
        alignItems="start"
        justifyContent="center"
        width={"95%"}
        height={"40%"}
        paddingLeft={4}
      >
        <HStack
          alignItems="center"
          width={"100%"}
          justifyContent="space-between"
        >
          <HStack width={"75%"} alignItems="center">
            <Entypo name="location-pin" size={20} color="white" />
            <Text fontSize={20} color="#FFFFFF">
              {location}
            </Text>
          </HStack>
          <HStack width={"25%"}>
            <Button alignItems="center" width={"100%"} backgroundColor="white">
              <FontAwesome6
                name="location-crosshairs"
                size={24}
                color="black"
                onPress={handleLocationButtonPress}
              />
            </Button>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
}
