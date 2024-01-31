import React, { useState } from "react";
import {
  Button,
  ButtonText,
  Heading,
  Image,
  Input,
  InputField,
  StatusBar,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocation } from "../context/LocationContext";
import { useNavigation } from "@react-navigation/native";

export default function LocationScreen() {
  const { userLocation, loadingLocation, handleUseMyLocation } = useLocation();
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate("CustomTabs");
  };
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4D0288" />
      <View
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          justifyContent: "space-between",
        }}
      >
        <Image
          source={require("../assets/logosemfundo.png")}
          alt="logomarca"
          style={{ width: "100%", height: "50%", resizeMode: "contain" }}
        />
        <VStack
          borderTopLeftRadius={"$3xl"}
          borderTopRightRadius={"$3xl"}
          style={{
            height: 400,
            width: "100%",
            backgroundColor: "#4D0288",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <VStack
            style={{
              width: "100%",
              height: 200,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Heading color="#FFFFFF">Procure seu endereço</Heading>
            <Input variant="outline" size="md" width={"85%"} >
              <InputField
              color="#FFFFFF"
                placeholderTextColor={"#FFFFFF"}
                placeholder="Digite seu bairro"
                value={userLocation}
                onChangeText={(text) => setUserLocation(text)}
              />
            </Input>
            <Text color="#FFFFFF">OU</Text>
            <Button
              bg="#FFFFFF"
              borderRadius={"$xl"}
              style={{
                width: "85%",
                justifyContent: "space-around",
              }}
              onPress={handleUseMyLocation}
              disabled={loadingLocation}
            >
              <Ionicons name="locate-sharp" size={24} color="#4D0288" />
              <ButtonText color="#4D0288">
                {loadingLocation
                  ? "Obtendo Localização..."
                  : "Usar minha localização"}
              </ButtonText>
            </Button>
          </VStack>
          <Button
            bg="#FFFFFF"
            borderRadius={"$2xl"}
            style={{
              width: "85%",
              height: 60,
              justifyContent: "space-around",
            }}
            onPress={handleContinue}
          >
            <ButtonText fontSize={"$xl"} color="#4D0288">
              Continuar
            </ButtonText>
            <MaterialIcons name="navigate-next" size={24} color="#4D0288" />
          </Button>
        </VStack>
      </View>
    </>
  );
}
