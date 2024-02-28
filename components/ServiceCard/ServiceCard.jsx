import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Box,
  Button,
  ButtonText,
  CircleIcon,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  ScrollView,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import Calendar from "../Calendar/Calendar";
import { formatCurrency } from "../../Services/FormatCurrency";
import { useFirebase } from "../../context/FirebaseContext";
import ActionSheet from "react-native-actions-sheet";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../Config/Firebase";
import { doc, getDoc } from "firebase/firestore";

const ServiceCard = ({ servicos }) => {
  const actionSheetRef = useRef(null);
  const { lerAgendamento, sendAgendamentoToFirestore } = useFirebase();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [car, setCar] = useState("");
  const [moto, setMoto] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [isDataSaved, setIsDataSaved] = useState(false);
  useEffect(() => {
    const loadUserVehicles = async () => {
      try {
        const userId = user.uid;
        const userDocRef = doc(db, "Usuarios", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const userVehicles = [userData.carModel, userData.motoModel].filter(
            Boolean
          );
          setCar(userData.carModel);
          setMoto(userData.motoModel);
        } else {
          console.warn("Usuário não encontrado no Firestore");
        }
      } catch (error) {
        console.error("Erro ao buscar veículos do usuário:", error.message);
      }
    };
    loadUserVehicles();
  }, []);

  const handleAgendamento = (nomeServico) => {
    setSelectedService(nomeServico);
    actionSheetRef.current?.show();
    lerAgendamento();
  };

  const fecharActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    saveDataToAsyncStorage({ data: date, servico: selectedService });
  };

  const saveDataToAsyncStorage = async (data) => {
    try {
      const agendamentoData = await AsyncStorage.getItem("agendamento");

      let agendamento = {};
      if (agendamentoData) {
        agendamento = JSON.parse(agendamentoData);
      }
      agendamento = { ...agendamento, ...data };

      await AsyncStorage.setItem("agendamento", JSON.stringify(agendamento));

      setIsDataSaved(true);
    } catch (error) {
      console.error(
        "Erro ao salvar dados do agendamento no AsyncStorage:",
        error.message
      );
    }
  };

  const handleMarcarHorario = async () => {
    try {
      const agendamentoData = {
        veiculo: selectedVehicle,
      };

      await saveDataToAsyncStorage(agendamentoData);

      if (isDataSaved) {
        await sendAgendamentoToFirestore();
        await AsyncStorage.removeItem("agendamento");
        setIsDataSaved(false);
        fecharActionSheet();
      }
    } catch (error) {
      console.error("Erro ao marcar horário:", error.message);
    }
  };
  return (
    <ScrollView vertical width={"100%"}>
      {Object.entries(servicos).map(([nomeServico, valorServico]) => {
        const isSelected = nomeServico === selectedService;

        return (
          <View
            key={nomeServico}
            height={140}
            width={"100%"}
            marginBottom={12}
            backgroundColor={isSelected ? "#F5F5F5" : "#FFFFFF"}
            borderRadius={15}
          >
            <HStack
              alignItems="center"
              alignContent="center"
              height={"100%"}
              justifyContent="space-around"
            >
              <Box
                backgroundColor={isSelected ? "#6754A4" : "#4D0288"}
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
                <Button gap={5} onPress={() => handleAgendamento(nomeServico)}>
                  <ButtonText>Agendar Serviço</ButtonText>
                  <MaterialIcons name="schedule-send" size={24} color="white" />
                </Button>
              </VStack>
            </HStack>
            <ActionSheet ref={actionSheetRef}>
              <View alignItems="center">
                <Calendar
                  onSelectDate={(date) => handleDateSelection(date)}
                  selected={selectedDate}
                />
                <View>
                  <Heading>Escolha seu veículo</Heading>
                  <RadioGroup onChange={(value) => setSelectedVehicle(value)}>
                    <Radio
                      value={car}
                      size="md"
                      isInvalid={false}
                      isDisabled={false}
                    >
                      <RadioIndicator mr="$2">
                        <RadioIcon as={CircleIcon} strokeWidth={1} />
                      </RadioIndicator>
                      <RadioLabel>{car}</RadioLabel>
                    </Radio>
                    <Radio
                      value={moto}
                      size="md"
                      isInvalid={false}
                      isDisabled={false}
                    >
                      <RadioIndicator mr="$2">
                        <RadioIcon as={CircleIcon} strokeWidth={1} />
                      </RadioIndicator>
                      <RadioLabel>{moto}</RadioLabel>
                    </Radio>
                  </RadioGroup>
                </View>
                <Button
                  onPress={handleMarcarHorario}
                  marginBottom={15}
                  width={"75%"}
                >
                  <ButtonText>Marcar Horario</ButtonText>
                </Button>
              </View>
            </ActionSheet>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ServiceCard;
