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
import * as Location from "expo-location";

export default function LocationScreen() {
  const [userLocation, setUserLocation] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleUseMyLocation = async () => {
    setLoadingLocation(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permissão para acessar a localização negada");
        setLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      reverseGeocode(latitude, longitude);
    } catch (error) {
      console.error("Erro ao obter localização:", error);
      setErrorMsg("Erro ao obter a localização");
      setLoadingLocation(false);
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const apiKey = "fbb87def325a48768cbc78cc3708bc9f";
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      const formattedAddress = data.results[0].formatted;
      setUserLocation(formattedAddress);
      setLoadingLocation(false);
      setErrorMsg(null);
    } catch (error) {
      console.error("Erro na geocodificação reversa:", error);
      setErrorMsg("Erro na geocodificação reversa");
      setLoadingLocation(false);
    }
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
                placeholder="Digite sua localização"
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
          >
            <ButtonText fontSize={"$xl"}>Continuar</ButtonText>
            <MaterialIcons name="navigate-next" size={24} color="white" />
          </Button>
        </VStack>
      </View>
    </>
  );
}
