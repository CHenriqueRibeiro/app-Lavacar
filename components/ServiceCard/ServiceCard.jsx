import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
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
import { useState } from "react";
import Calendar from "../Calendar/Calendar"; // Certifique-se de importar corretamente o componente Calendar

export default function ServiceCard() {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const handleClose = () => setShowActionsheet(!showActionsheet);

  return (
    <View
      height={140}
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
          width={"30%"}
          alignItems="center"
          justifyContent="center"
          borderRadius={15}
        >
          <MaterialIcons name="local-car-wash" size={24} color="white" />
        </Box>
        <VStack
          alignItems="start"
          height={"75%"}
          justifyContent="space-between"
        >
          <Heading>Lavagem Simples</Heading>
          <Text fontWeight="700" color="black" fontSize={18}>
            R$ 30,00
          </Text>
          <Button gap={5} onPress={handleClose}>
            <ButtonText>Agendar Serviço</ButtonText>
            <MaterialIcons name="schedule-send" size={24} color="white" />
          </Button>
        </VStack>
      </HStack>

      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent >
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
          
        </ActionsheetContent>
      </Actionsheet>
    </View>
  );
}
