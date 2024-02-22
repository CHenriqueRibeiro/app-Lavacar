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
import ContentLoader, { Rect } from "react-content-loader/native";
import { useWindowDimensions } from "react-native";

const SkeletonLoader = () => {
  const { width } = useWindowDimensions();

  return (
    <ContentLoader
      speed={1}
      width={width}
      height={120}
      viewBox={`0 0 ${width} 120`}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <Rect x="42.84" y="9.93" rx="5" ry="5" width="100" height="95" />
      <Rect x="330" y="40" rx="5" ry="5" width="40" height="40" />
      <Rect x="170" y="9.67" rx="0" ry="0" width="70" height="18" />
      <Rect x="170" y="50" rx="0" ry="0" width="120" height="10" />
      <Rect x="170" y="85" rx="0" ry="0" width="120" height="10" />
    </ContentLoader>
  );
};

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
          {userData ? (
            <>
              <Box
                width={"25%"}
                height={"80%"}
                backgroundColor="#4D0288"
                alignItems="center"
                justifyContent="center"
                borderRadius={15}
              >
                <Ionicons
                  name="person-circle-outline"
                  size={60}
                  color="#FFFFFF"
                />
              </Box>
              <VStack height={104} justifyContent="space-around">
                <Heading color="#000000">Dados Pessoais</Heading>
                <Text fontWeight="700" color="#000000">
                  Nome:
                  <Text>{userData.name}</Text>
                </Text>
                <Text fontWeight="700" color="#000000">
                  Telefone:
                  <Text>{userData.phoneNumber}</Text>
                </Text>
              </VStack>
              <FontAwesome6 name="edit" size={30} color="black" />
            </>
          ) : (
            <SkeletonLoader />
          )}
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
          {userData ? (
            <>
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
            </>
          ) : (
            <SkeletonLoader />
          )}
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
