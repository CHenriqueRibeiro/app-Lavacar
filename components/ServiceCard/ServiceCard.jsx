import {
  Box,
  Button,
  ButtonText,
  HStack,
  Heading,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { MaterialIcons } from "@expo/vector-icons";
export default function ServiceCard() {
  return (
    <View
      height={120}
      width={"100%"}
      backgroundColor="#FFFFFF"
      borderRadius={15}
    >
      <HStack
        alignItems="center"
        alignContent="center"
        height={"100%"}
        justifyContent="space-around"
      >
        <Box
          backgroundColor="$indigo700"
          height={"75%"}
          width={"35%"}
          alignItems="center"
          justifyContent="center"
          borderRadius={15}
        >
          <MaterialIcons name="local-car-wash" size={24} color="white" />
        </Box>
        <VStack alignItems="center">
          <HStack>
            <Heading>Monte seu serviço</Heading>
          </HStack>
          <Button>
            <ButtonText>Personalizar Serviço</ButtonText>
          </Button>
        </VStack>
      </HStack>
    </View>
  );
}
