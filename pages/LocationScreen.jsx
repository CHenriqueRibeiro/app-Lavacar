import React, { useState } from "react";
import {
  Button,
  ButtonSpinner,
  ButtonText,
  Heading,
  Image,
  Input,
  InputField,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { useLocation } from "../context/LocationContext";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, TouchableOpacity } from "react-native";

export default function LocationScreen() {
  const {
    userLocation,
    setUserLocation,
    loadingLocation,
    handleUseMyLocation,
  } = useLocation();
  const [suggestions, setSuggestions] = useState([]);

  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate("CustomTabs");
  };
  const getAutocompleteSuggestions = async (query) => {
    try {
      const apiKey = "fbb87def325a48768cbc78cc3708bc9f";
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${query}&countrycode=BR&key=${apiKey}&pretty=1`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      const suggestions = data.results
        .filter((result) => result.components.suburb && result.components.city)
        .map((result) => ({
          suburb: result.components.suburb,
          city: result.components.city,
        }));

      const uniqueSuggestions = suggestions.filter(
        (suggestion, index, self) =>
          index ===
          self.findIndex(
            (s) => s.suburb === suggestion.suburb && s.city === suggestion.city
          )
      );

      setSuggestions(uniqueSuggestions);
    } catch (error) {
      console.error("Erro ao obter sugestões:", error);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
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
            <View style={{ position: "relative", width: "85%" }}>
              {suggestions.length > 0 && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 50,
                    width: "100%",
                    zIndex: 1,
                    borderColor: "#FFFFFF",
                    borderWidth: 1,
                    backgroundColor: "#4D0288",
                  }}
                >
                  {suggestions.map((suggestion, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        const suburb = suggestion.suburb || "";
                        const city = suggestion.city || "";

                        setUserLocation(`${suburb}, ${city}`);
                        setSuggestions([]);
                      }}
                    >
                      <Text
                        textAlignVertical="center"
                        color="#FFFFFF"
                        borderColor="#FFFFFF"
                        borderTopWidth={1}
                        height={40}
                      >{`${suggestion.suburb || ""}, ${
                        suggestion.city || ""
                      }`}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <Input
                variant="outline"
                size="md"
                width={"100%"}
                style={{ zIndex: 2 }}
              >
                <InputField
                  autoCorrect={false}
                  color="#FFFFFF"
                  placeholderTextColor={"#FFFFFF"}
                  placeholder="Digite seu bairro"
                  value={userLocation}
                  onChangeText={(text) => {
                    setUserLocation(text);
                    getAutocompleteSuggestions(text);
                  }}
                />
              </Input>
            </View>

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
              justifyContent: "center",
            }}
            onPress={handleContinue}
            gap={5}
          >
            <ButtonText fontSize={"$xl"} color="#4D0288">
              Continuar
            </ButtonText>
          </Button>
        </VStack>
      </View>
    </>
  );
}
