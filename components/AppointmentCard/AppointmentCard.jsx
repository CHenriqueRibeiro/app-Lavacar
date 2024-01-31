import {
  Box,
  Button,
  ButtonText,
  HStack,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
export default function AppointmentCard() {
  return (
    <View
      height={180}
      backgroundColor="#FFFFFF"
      width={"95%"}
      alignItems="center"
      borderRadius={15}
      marginTop={15}
      style={{
        shadowRadius: 30,
        elevation: 6,
        shadowColor: "black",
      }}
    >
      <HStack width={"90%"} alignItems="center" height={"100%"} gap={15}>
        <Box
          width={120}
          height={150}
          backgroundColor="#4D0288"
          justifyContent="center"
          alignItems="center"
          borderRadius={15}
        >
          <MaterialCommunityIcons
            name="calendar-clock"
            size={48}
            color="white"
          />
        </Box>
        <VStack height={150} justifyContent="space-between">
          <HStack alignItems="center">
            <MaterialIcons name="local-car-wash" size={24} color="black" />
            <Text fontSize={18}>Limpinho LavaJato</Text>
          </HStack>
          <HStack alignItems="center">
            <MaterialIcons name="cleaning-services" size={24} color="black" />
            <Text fontSize={18}>Lavagem Simples</Text>
          </HStack>
          <HStack alignItems="center">
            <AntDesign name="calendar" size={24} color="black" />
            <Text fontSize={18}>18/01/2024 - 14:00</Text>
          </HStack>
          <Button alignItems="center" backgroundColor="$error700" gap={15}>
            <MaterialIcons name="cancel" size={20} color="white" />
            <ButtonText>Cancelar</ButtonText>
          </Button>
        </VStack>
      </HStack>
    </View>
  );
}
