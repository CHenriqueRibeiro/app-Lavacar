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
export default function Header() {
  const { user } = useAuth();
  const { userLocation, handleUseMyLocation } = useLocation();
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
              {userLocation}
            </Text>
          </HStack>
        </VStack>
        <Entypo
          name="location"
          size={24}
          color="#FFFFFF"
          onPress={handleUseMyLocation}
        />
      </HStack>
    </HStack>
  );
}
