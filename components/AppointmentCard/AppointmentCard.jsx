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
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Config/Firebase";
import { useAuth } from "../../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { useFirebase } from "../../context/FirebaseContext";
import { Linking } from "react-native";
export default function AppointmentCard() {
  const { user } = useAuth();
  const { telefone } = useFirebase();
  const [agendamentos, setAgendamentos] = useState([]);
  useEffect(() => {
    const loadUserScheduling = async () => {
      try {
        const userId = user.uid;
        const userDocRef = doc(db, "Usuarios", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();

          if (userData.Agendamentos) {
            setAgendamentos(userData.Agendamentos);
          } else {
            console.warn("Propriedade Agendamentos não encontrada em userData");
          }
        } else {
          console.warn("Usuário não encontrado no Firestore");
        }
      } catch (error) {
        console.error("Erro ao buscar veículos do usuário:", error.message);
      }
    };
    loadUserScheduling();
  }, [agendamentos]);
  const handleWhatsApp = () => {
    const phoneNumber = telefone;
    const whatsappUrl = `whatsapp://send?phone=+55${phoneNumber}`;

    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(whatsappUrl);
        } else {
          console.warn("WhatsApp não está instalado no dispositivo.");
        }
      })
      .catch((error) => console.error("Erro ao abrir o WhatsApp:", error));
  };

  return (
    <>
      {agendamentos.map((agendamento, index) => (
        <View
          key={index}
          height={300}
          backgroundColor={"#FFFFFF"}
          opacity={
            agendamento.servicoRealizado ||
            agendamento.servicoCancelado === true
              ? 0.7
              : 1
          }
          width={"95%"}
        
          borderRadius={15}
          marginTop={15}
          style={{
            shadowRadius: 30,
            elevation: 6,
            shadowColor: "black",
          }}
        >
          <VStack
            width={"100%"}
            alignItems="center"
            height={"100%"}
            justifyContent="space-around"
          >
            <HStack
              width={"90%"}
              alignItems="center"
              height={"80%"}
              justifyContent="space-between"
            >
              <Box
                width={"40%"}
                height={"100%"}
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
              <VStack
                height={"100%"}
                width={"50%"}
                justifyContent="space-between"
              >
                <HStack alignItems="center">
                  <MaterialIcons
                    name="local-car-wash"
                    size={24}
                    color="black"
                  />
                  <Text fontSize={18}>{agendamento.veiculo}</Text>
                </HStack>
                <HStack alignItems="center">
                  <MaterialIcons
                    name="cleaning-services"
                    size={24}
                    color="black"
                  />
                  <Text fontSize={18}>{agendamento.servico}</Text>
                </HStack>
                <HStack alignItems="center">
                  <AntDesign name="calendar" size={24} color="black" />
                  <Text fontSize={18}>
                    {agendamento.data} - {agendamento.hora}
                  </Text>
                </HStack>
                <Button
                  alignItems="center"
                  backgroundColor="$error700"
                  gap={15}
                  isDisabled={
                    agendamento.servicoRealizado ||
                    agendamento.servicoCancelado === false
                      ? false
                      : true
                  }
                >
                  <MaterialIcons name="cancel" size={20} color="white" />
                  <ButtonText>Cancelar</ButtonText>
                </Button>
                <Button
                  alignItems="center"
                  backgroundColor="#00A884"
                  gap={15}
                  onPress={handleWhatsApp}
                >
                  <FontAwesome name="whatsapp" size={20} color="white" />
                  <ButtonText> WhatsApp</ButtonText>
                </Button>
              </VStack>
            </HStack>
            {agendamento.servicoRealizado === true ? (
              <HStack
                alignItems="center"
                width={"80%"}
                justifyContent="space-around"
              >
                <FontAwesome name="check-circle-o" size={24} color="green" />
                <Text>Serviço Realizado</Text>
              </HStack>
            ) : agendamento.servicoCancelado === true ? (
              <HStack
                alignItems="center"
                width={"80%"}
                justifyContent="space-around"
              >
                <MaterialIcons name="cancel" size={24} color="red" />
                <Text>Serviço Cancelado</Text>
              </HStack>
            ) : (
              <HStack
                alignItems="center"
                width={"80%"}
                justifyContent="space-around"
              >
                <AntDesign name="clockcircle" size={24} color="black" />
                <Text>Serviço Agendado</Text>
              </HStack>
            )}
          </VStack>
        </View>
      ))}
    </>
  );
}
