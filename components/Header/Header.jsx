import { HStack, Heading, Text, VStack } from "@gluestack-ui/themed";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "../../context/LocationContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
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
          fontSize={26}
          height={"50%"}
          color="white"
          paddingTop={1}
        >
          {user === null ? "Faça seu login" : user.displayName}
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
          <HStack width={"65%"} alignItems="center">
            <Entypo name="location-pin" size={20} color="white" />
            <Text fontSize={18} color="#FFFFFF">
              {location}
            </Text>
          </HStack>
          <TouchableOpacity
            onPress={handleLocationButtonPress}
            style={{
              width: "35%",
            }}
          >
            <HStack width={"100%"} alignItems="center" gap={15}>
              <Ionicons name="reload-circle" size={24} color="#FFFFFF" />
              <Text color="#FFFFFF">Atualizar</Text>
            </HStack>
          </TouchableOpacity>
        </HStack>
      </VStack>
    </VStack>
  );
}
