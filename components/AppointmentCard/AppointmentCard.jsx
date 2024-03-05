import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../Config/Firebase";
//import ContentLoader, { Rect } from "react-content-loader/native";
import { Linking, useWindowDimensions } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";

export default function AppointmentCard() {
  const { user } = useAuth();
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const loadUserScheduling = async () => {
      const userId = user.uid;
      const userDocRef = doc(db, "Usuarios", userId);

      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();

          if (
            userData.Agendamentos &&
            Array.isArray(userData.Agendamentos) &&
            userData.Agendamentos.length > 0
          ) {
            setAgendamentos(userData.Agendamentos);
          } else {
            console.warn(
              "Propriedade Agendamentos está vazia, indefinida ou não é um array em userData"
            );
          }
        } else {
          console.warn("Usuário não encontrado no Firestore");
        }
      });

      return () => unsubscribe();
    };

    loadUserScheduling();
  }, [user]);

  const handleWhatsApp = () => {
    const phoneNumber = "85985847007";
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

  /*if (loading) {
    const { width } = useWindowDimensions();
    const skeletonCount = 3;
    return (
      <>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <VStack
            key={index}
            speed={1}
            overflow="hidden"
            width="95%"
            backgroundColor="transparent"
            height={300}
            borderRadius={10}
          >
            <ContentLoader viewBox={`0 0 ${width} 300`}>
              <Rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
              <Rect x="20" y="15" rx="10" ry="10" width="35%" height="80%" />
              <Rect x="190" y="20" rx="0" ry="0" width="50%" height="7%" />
              <Rect x="190" y="60" rx="0" ry="0" width="50%" height="7%" />
              <Rect x="190" y="105" rx="0" ry="0" width="50%" height="7%" />
              <Rect x="190" y="145" rx="0" ry="0" width="50%" height="7%" />
              <Rect x="190" y="200" rx="0" ry="0" width="50%" height="15%" />
              <Rect x="190" y="215" rx="0" ry="0" width="50%" height="15%" />
              <Rect x="0" y="277" rx="10" ry="10" width="100%" height="10%" />
            </ContentLoader>
          </VStack>
        ))}
      </>
    );
  }*/

  if (agendamentos === undefined || agendamentos.length === 0) {
    return (
      <Text textAlign="center" marginTop={20}>
        Não há agendamentos disponíveis.
      </Text>
    );
  }

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
            justifyContent="space-between"
          >
            <HStack
              marginTop={10}
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
                width={"55%"}
                justifyContent="space-between"
              >
                <HStack alignItems="center" gap={6}>
                  <FontAwesome5 name="warehouse" size={18} color="black" />
                  <Text fontSize={18}>{agendamento.empresaName}</Text>
                </HStack>
                <HStack alignItems="center" gap={6}>
                  <MaterialIcons
                    name="local-car-wash"
                    size={24}
                    color="black"
                  />
                  <Text fontSize={18}>{agendamento.veiculo}</Text>
                </HStack>
                <HStack alignItems="center" gap={6}>
                  <MaterialIcons
                    name="cleaning-services"
                    size={24}
                    color="black"
                  />
                  <Text fontSize={18}>{agendamento.servico}</Text>
                </HStack>
                <HStack alignItems="center" gap={6}>
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
                width={"100%"}
                justifyContent="space-around"
                height={"12%"}
                backgroundColor="#4D0288"
                borderBottomLeftRadius={15}
                borderBottomRightRadius={15}
              >
                <FontAwesome name="check-circle-o" size={24} color="green" />
                <Text>Serviço Realizado</Text>
              </HStack>
            ) : agendamento.servicoCancelado === true ? (
              <HStack
                alignItems="center"
                width={"100%"}
                justifyContent="space-around"
                height={"12%"}
                backgroundColor="#4D0288"
                borderBottomLeftRadius={15}
                borderBottomRightRadius={15}
              >
                <MaterialIcons name="cancel" size={24} color="red" />
                <Text>Serviço Cancelado</Text>
              </HStack>
            ) : (
              <HStack
                alignItems="center"
                width={"100%"}
                justifyContent="space-around"
                height={"12%"}
                backgroundColor="#4D0288"
                borderBottomLeftRadius={15}
                borderBottomRightRadius={15}
              >
                <AntDesign name="clockcircle" size={24} color="#FFFFFF" />
                <Text color="#FFFFFF">Serviço Agendado</Text>
              </HStack>
            )}
          </VStack>
        </View>
      ))}
    </>
  );
}
