import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Heading,
  StatusBar,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { Fontisto } from "@expo/vector-icons";

const PersonalInformation = () => {
  const {
    user,
    readUserDataFromFirestore,
    updateUserDataInFirestore,
    signOut,
  } = useAuth();
  const [userData, setUserData] = useState(null);
  const [carModel, setCarModel] = useState("");
  const [motoModel, setMotoModel] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const data = await readUserDataFromFirestore(user.uid);
          setUserData(data);

          if (data && data.veiculos && data.veiculos.carro) {
            setCarModel(data.veiculos.carro.modelo);
          }
          if (data && data.veiculos && data.veiculos.moto) {
            setMotoModel(data.veiculos.moto.modelo);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error.message);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, readUserDataFromFirestore]);

  const updateUserData = async () => {
    try {
      if (user) {
        const userDataToUpdate = {
          veiculos: {
            carro: {
              modelo: carModel,
            },
            moto: {
              modelo: motoModel,
            },
          },
        };
        await updateUserDataInFirestore(user.uid, userDataToUpdate);
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error.message);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Erro ao realizar logout:", error.message);
    }
  };
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4D0288" />
      <View flex={1} alignItems="center" width={"100%"}>
        <HStack
          marginTop={15}
          width={"100%"}
          height={120}
          backgroundColor="#FFFFFF"
          borderRadius={15}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Box
            width={"25%"}
            height={"80%"}
            backgroundColor="#4D0288"
            alignItems="center"
            justifyContent="center"
            borderRadius={15}
          >
            <Ionicons name="person-circle-outline" size={60} color="#FFFFFF" />
          </Box>
          <VStack height={104} justifyContent="space-around">
            <Heading color="#000000">Dados Pessoais</Heading>
            {userData && (
              <>
                <Text fontWeight="700" color="#000000">
                  Nome:
                  <Text>{userData.name}</Text>
                </Text>
                <Text fontWeight="700" color="#000000">
                  Telefone:
                  <Text>{userData.phoneNumber}</Text>
                </Text>
              </>
            )}
          </VStack>
          <FontAwesome6 name="edit" size={30} color="black" />
        </HStack>

        <HStack
          marginTop={15}
          width={"100%"}
          height={120}
          backgroundColor="#FFFFFF"
          borderRadius={15}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Box
            width={"25%"}
            height={"80%"}
            backgroundColor="#4D0288"
            alignItems="center"
            justifyContent="center"
            borderRadius={15}
          >
            <Fontisto name="car" size={60} color="white" />
          </Box>
          <VStack height={104} justifyContent="space-around">
            <Heading color="#000000">Veículo</Heading>
            {userData && (
              <>
                {userData.carModel === "" || null ? (
                  <Box display="none"></Box>
                ) : (
                  <Text fontWeight="700" color="#000000">
                    Modelo do Carro:
                    <Text>{userData.carModel}</Text>
                  </Text>
                )}
                {userData.motoModel === "" || null ? (
                  <Box display="none"></Box>
                ) : (
                  <Text fontWeight="700" color="#000000">
                    Modelo da Moto:
                    <Text>{userData.motoModel}</Text>
                  </Text>
                )}
              </>
            )}
          </VStack>
          <FontAwesome6
            name="edit"
            size={30}
            color="black"
            onPress={updateUserData}
          />
        </HStack>

        <Button
          alignItems="center"
          width={"50%"}
          marginTop={15}
          justifyContent="space-around"
          backgroundColor="#4D0288"
          borderRadius={8}
          onPress={handleLogout}
        >
          <ButtonText>Encerrar Seção</ButtonText>
          <Ionicons name="exit-outline" size={24} color="white" />
        </Button>
      </View>
    </>
  );
};

export default PersonalInformation;
