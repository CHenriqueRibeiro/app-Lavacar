import {
  Avatar,
  AvatarFallbackText,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "../../context/LocationContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
  const [location, setLocation] = useState(null);
  const { user } = useAuth();
  const { handleUseMyLocation, userLocation, setUserLocation } = useLocation();

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
  }, []); // Remova "location" das dependências para evitar loop infinito

  useEffect(() => {
    setLocation(userLocation); // Atualiza a localização quando userLocation muda
  }, [userLocation]);

  const handleLocationButtonPress = async () => {
    console.log("Botão de Localização Pressionado!");
    const savedDataString = await AsyncStorage.getItem("userLocation");
    console.log("0",savedDataString);

    await handleUseMyLocation(); // Aguarde a conclusão da atualização da localização

    // Agora, você pode acessar a localização atualizada
    setLocation(userLocation);
  };

  return (
    <HStack
      bg="#4D0288"
      width={"100%"}
      height={120}
      alignItems="center"
      justifyContent="center"
    >
      <HStack
        width={"95%"}
        height={"60%"}
        alignItems="center"
        justifyContent="space-between"
      >
        <Avatar bgColor="$white" size="md" borderRadius="$lg">
          <AvatarFallbackText color="#4D0288">
            {user === null ? "" : user.email}
          </AvatarFallbackText>
        </Avatar>
        <VStack alignItems="center" gap={5}>
          <Text fontSize={14} color="#FFFFFF">
            Localização
          </Text>
          <HStack gap={5}>
            <AntDesign name="down" size={20} color="#FFFFFF" />
            <Text fontSize={20} color="#FFFFFF">
              {location}
            </Text>
          </HStack>
        </VStack>
        <Entypo
          name="location"
          size={24}
          color="#FFFFFF"
          onPress={handleLocationButtonPress}
        />
      </HStack>
    </HStack>
  );
}
