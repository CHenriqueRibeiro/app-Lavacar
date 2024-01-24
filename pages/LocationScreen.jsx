import React, { useState } from "react";
import {
  Button,
  ButtonText,
  Heading,
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
      <StatusBar barStyle="light-content" backgroundColor="#2C2C96" />
      <View
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          backgroundColor: "#2C2C96",
          justifyContent: "space-between",
        }}
      >
        <Heading color="$white">Lavacar</Heading>
        <VStack
          borderTopLeftRadius={"$3xl"}
          borderTopRightRadius={"$3xl"}
          style={{
            height: 400,
            width: "100%",
            backgroundColor: "#E9EDF0",
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
            <Heading>Procure seu endereço</Heading>
            <Input variant="outline" size="md" width={"85%"}>
              <InputField
                placeholder="Digite seu bairro"
                value={userLocation}
                onChangeText={(text) => setUserLocation(text)}
              />
            </Input>
            <Text>OU</Text>
            <Button
              bg="$indigo700"
              borderRadius={"$xl"}
              style={{
                width: "85%",
                justifyContent: "space-around",
              }}
              onPress={handleUseMyLocation}
              disabled={loadingLocation}
            >
              <Ionicons name="locate-sharp" size={24} color="white" />
              <ButtonText>
                {loadingLocation
                  ? "Obtendo Localização..."
                  : "Usar minha localização"}
              </ButtonText>
            </Button>
          </VStack>
          <Button
            bg="$indigo700"
            borderRadius={"$2xl"}
            style={{
              width: "85%",
              height: 60,
              justifyContent: "space-around",
            }}
            onPress={handleContinue}
          >
            <ButtonText fontSize={"$xl"}>Continuar</ButtonText>
            <MaterialIcons name="navigate-next" size={24} color="white" />
          </Button>
        </VStack>
      </View>
    </>
  );
}
