import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Heading,
  Input,
  InputField,
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
import MaskInput, { Masks } from "react-native-mask-input";
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
    updateVehicleDataInFirestore,
    signOut,
    updatePhoneNumber,
  } = useAuth();
  const [userData, setUserData] = useState(null);
  const [carModel, setCarModel] = useState("");
  const [motoModel, setMotoModel] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editModePerson, setEditModePerson] = useState(false);
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

  const handleRemoveInput = (inputType) => {
    if (
      (inputType === "carModel" && motoModel !== "") ||
      (inputType === "motoModel" && carModel !== "")
    ) {
      if (inputType === "carModel") {
        setCarModel("");
      } else {
        setMotoModel("");
      }
    }
  };
  const handleRemoveInputPerson = (inputType) => {
    if (
      (inputType === "name" && userData.name !== "") ||
      (inputType === "phoneNumber" && userData.phoneNumber !== "")
    ) {
      if (inputType === "name") {
        return userData.name;
      } else {
        return userData.phoneNumber;
      }
    }
  };

  const updateUserData = async () => {
    try {
      if (user) {
        await updateVehicleDataInFirestore(user.uid, carModel, motoModel);

        const updatedData = await readUserDataFromFirestore(user.uid);
        setUserData(updatedData);

        setEditMode(false);
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error.message);
    }
  };
  const updateUserDataPhoneAndNumber = async () => {
    try {
      if (user) {
        await updatePhoneNumber(user.uid, name, phoneNumber);

        const updatedData = await readUserDataFromFirestore(user.uid);
        setUserData(updatedData);

        setEditModePerson(false);
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
              <VStack height={104} width={"50%"} justifyContent="space-around">
                <Heading color="#000000">Dados Pessoais</Heading>
                {editModePerson ? (
                  <VStack alignItems="center">
                    <HStack
                      width={"100%"}
                      alignItems="center"
                      gap={15}
                      marginBottom={10}
                    >
                      <Input placeholder="Nome" width={"80%"}>
                        <InputField
                          value={name}
                          onChangeText={(text) => setName(text)}
                          placeholder={
                            userData.name === "" ? "name" : userData.name
                          }
                        />
                      </Input>
                      <FontAwesome6
                        name="trash"
                        size={20}
                        color="red"
                        onPress={() => handleRemoveInputPerson("name")}
                      />
                    </HStack>
                    <HStack
                      width={"100%"}
                      alignItems="center"
                      gap={15}
                      mb={10}
                      ç
                    >
                      <Input placeholder="Telefone" width={"80%"}>
                        <MaskInput
                          value={phoneNumber}
                          onChangeText={(text) => setPhoneNumber(text)}
                          placeholder={
                            userData.phoneNumber === ""
                              ? "moto"
                              : userData.phoneNumber
                          }
                          mask={Masks.BRL_PHONE}
                        />
                      </Input>
                      <FontAwesome6
                        name="trash"
                        size={20}
                        color="red"
                        onPress={() => handleRemoveInputPerson("phoneNumber")}
                      />
                    </HStack>
                  </VStack>
                ) : (
                  <>
                    <Text fontWeight="700" color="#000000">
                      Nome:
                      <Text> {userData.name}</Text>
                    </Text>
                    <Text fontWeight="700" color="#000000">
                      Telefone:
                      <Text> {userData.phoneNumber}</Text>
                    </Text>
                  </>
                )}
              </VStack>
              <FontAwesome6
                name="edit"
                size={30}
                color="black"
                onPress={() => setEditModePerson(true)}
              />
              {editModePerson && (
                <>
                  <Button
                    onPress={updateUserDataPhoneAndNumber}
                    justifyContent="space-around"
                    height={35}
                    width={"80%"}
                  >
                    <ButtonText>Atualizar dados</ButtonText>
                    <FontAwesome6 name="check" size={28} color="white" />
                  </Button>
                </>
              )}
            </>
          ) : (
            <SkeletonLoader />
          )}
        </HStack>

        <HStack
          marginTop={15}
          width={"100%"}
          height={editMode ? 200 : 120}
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
              <VStack
                height={editMode ? "80%" : 104}
                width={editMode ? "62%" : "50%"}
                justifyContent={editMode ? "space-between" : "space-around"}
              >
                <Heading color="#000000">Veículo(s)</Heading>
                {editMode ? (
                  <>
                    <VStack alignItems="center">
                      <HStack
                        width={"100%"}
                        alignItems="center"
                        gap={15}
                        marginBottom={10}
                      >
                        <Input placeholder="Modelo do Carro" width={"80%"}>
                          <InputField
                            value={carModel}
                            onChangeText={(text) => setCarModel(text)}
                            placeholder={
                              userData.carModel === ""
                                ? "carro"
                                : userData.carModel
                            }
                          />
                        </Input>
                        <FontAwesome6
                          name="trash"
                          size={20}
                          color="red"
                          onPress={() => handleRemoveInput("carModel")}
                        />
                      </HStack>
                      <HStack
                        width={"100%"}
                        alignItems="center"
                        gap={15}
                        mb={10}
                        ç
                      >
                        <Input placeholder="Modelo da Moto" width={"80%"}>
                          <InputField
                            value={motoModel}
                            onChangeText={(text) => setMotoModel(text)}
                            placeholder={
                              userData.motoModel === ""
                                ? "moto"
                                : userData.motoModel
                            }
                          />
                        </Input>
                        <FontAwesome6
                          name="trash"
                          size={20}
                          color="red"
                          onPress={() => handleRemoveInput("motoModel")}
                        />
                      </HStack>
                    </VStack>
                    {editMode && (
                      <>
                        <Button
                          onPress={updateUserData}
                          justifyContent="space-around"
                          height={35}
                          width={"80%"}
                        >
                          <ButtonText>Atualizar dados</ButtonText>
                          <FontAwesome6 name="check" size={28} color="white" />
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {userData.carModel === "" || null ? (
                      <Box display="none"></Box>
                    ) : (
                      <Text fontWeight="700" color="#000000">
                        Carro:
                        <Text> {userData.carModel}</Text>
                      </Text>
                    )}
                    {userData.motoModel === "" || null ? (
                      <Box display="none"></Box>
                    ) : (
                      <Text fontWeight="700" color="#000000">
                        Moto:
                        <Text> {userData.motoModel}</Text>
                      </Text>
                    )}
                  </>
                )}
              </VStack>
              {!editMode && (
                <FontAwesome6
                  name="edit"
                  size={30}
                  color="black"
                  onPress={() => setEditMode(true)}
                />
              )}
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
