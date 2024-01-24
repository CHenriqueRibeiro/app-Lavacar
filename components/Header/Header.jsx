import {
  Avatar,
  AvatarFallbackText,
  HStack,
  Heading,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
export default function Header() {
  return (
    <HStack
      bg="$indigo700"
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
          <AvatarFallbackText color="$indigo700">
            Henrique Ribeiro
          </AvatarFallbackText>
        </Avatar>
        <VStack alignItems="center" gap={5}>
          <Text fontSize={14} color="#FFFFFF">
            Localização
          </Text>
          <HStack gap={5}>
            <AntDesign name="down" size={20} color="#FFFFFF" />
            <Text fontSize={20} color="#FFFFFF">
              Nova Metropole, Caucaia
            </Text>
          </HStack>
        </VStack>
        <Entypo name="location" size={24} color="#FFFFFF" />
      </HStack>
    </HStack>
  );
}
