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
  ScrollView,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import Calendar from "../Calendar/Calendar";
import { formatCurrency } from "../../Services/FormatCurrency";
import { useFirebase } from "../../context/FirebaseContext";

export default function ServiceCard({ servicos }) {
  const {
    horarioReservado,
    servicoEscolhido,
    agendamento,
    lerAgendamento,
    showActionsheet,
    handleClose,
  } = useFirebase();

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <ScrollView vertical width={"100%"}>
      {Object.entries(servicos).map(([nomeServico, valorServico]) => (
        <View
          key={nomeServico}
          height={140}
          width={"100%"}
          marginBottom={12}
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
              backgroundColor="#4D0288"
              height={"75%"}
              width={"25%"}
              alignItems="center"
              justifyContent="center"
              borderRadius={15}
              style={{
                shadowRadius: 30,
                elevation: 8,
                shadowColor: "black",
              }}
            >
              <MaterialIcons name="local-car-wash" size={24} color="white" />
            </Box>
            <VStack
              alignItems="start"
              height={"75%"}
              justifyContent="space-between"
            >
              <Heading>{nomeServico}</Heading>
              <Heading>{formatCurrency(valorServico)}</Heading>
              <Button gap={5} onPress={lerAgendamento}>
                <ButtonText>Agendar Serviço</ButtonText>
                <MaterialIcons name="schedule-send" size={24} color="white" />
              </Button>
            </VStack>
          </HStack>
          <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
            <ActionsheetBackdrop />
            <ActionsheetContent>
              <ActionsheetDragIndicatorWrapper>
                <ActionsheetDragIndicator />
              </ActionsheetDragIndicatorWrapper>
              <Calendar
                onSelectDate={setSelectedDate}
                selected={selectedDate}
              />
              <Button onPress={handleClose} marginBottom={15} width={"75%"}>
                <ButtonText>Marcar Horario</ButtonText>
              </Button>
            </ActionsheetContent>
          </Actionsheet>
        </View>
      ))}
    </ScrollView>
  );
}
