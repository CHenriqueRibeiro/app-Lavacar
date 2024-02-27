import React, { useEffect, useState } from "react";
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
    reverseGeocode,
  } = useLocation();
  const [suggestions, setSuggestions] = useState([]);
  const [isContinueButtonDisabled, setContinueButtonDisabled] = useState(true);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const navigation = useNavigation();

  const handleContinue = async () => {
    if (selectedSuggestion) {
      await reverseGeocode(
        selectedSuggestion.geometry.lat,
        selectedSuggestion.geometry.lng
      );
      navigation.navigate("CustomTabs");
    } else {
      alert("Por favor, escolha uma sugestão válida.");
    }
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
          geometry: result.geometry,
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

  const handleInputChange = (text) => {
    setUserLocation(text);
    setContinueButtonDisabled(true);
    getAutocompleteSuggestions(text);
  };

  const handleSuggestionPress = (suggestion) => {
    setUserLocation(`${suggestion.suburb || ""}, ${suggestion.city || ""}`);
    setSelectedSuggestion(suggestion);
    setContinueButtonDisabled(false);
    setSuggestions([]);
  };

  useEffect(() => {
    const trimmedUserLocation = userLocation ? userLocation.trim() : "";
    setContinueButtonDisabled(
      !trimmedUserLocation && suggestions.length === 0 && !selectedSuggestion
    );
  }, [userLocation, suggestions, selectedSuggestion]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View
        style={{
          flex: 1,
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
          }}
        >
          <VStack
            style={{
              width: "100%",
              height: "65%",
              alignItems: "center",
              gap: 25,
              marginTop: 15,
            }}
          >
            <Heading color="#FFFFFF" fontSize={24}>
              Procure seu Bairro
            </Heading>
            <View style={{ position: "relative", width: "85%" }}>
              {suggestions.length > 0 && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 60,
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
                      onPress={() => handleSuggestionPress(suggestion)}
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
                height={55}
                style={{ zIndex: 2 }}
              >
                <InputField
                  autoCorrect={false}
                  color="#FFFFFF"
                  placeholderTextColor={"#FFFFFF"}
                  placeholder="Digite seu bairro, cidade"
                  value={userLocation}
                  onChangeText={handleInputChange}
                />
              </Input>
            </View>

            <Text color="#FFFFFF" fontWeight="300">
              OU
            </Text>
            <Button
              bg="#FFFFFF"
              borderRadius={"$xl"}
              style={{
                width: "85%",
                justifyContent: "space-around",
                elevation: 6,
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
          <VStack
            alignItems="center"
            justifyContent="center"
            width={"90%"}
            height={"25%"}
          >
            <Button
              bg={isContinueButtonDisabled ? "#919396" : "#FFFFFF"}
              borderRadius={"$2xl"}
              style={{
                width: "100%",
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                elevation: 6,
              }}
              onPress={handleContinue}
              disabled={isContinueButtonDisabled}
            >
              <ButtonText
                fontSize={"$xl"}
                color="#4D0288"
                justifyContent="center"
                alignItems="center"
              >
                Continuar
              </ButtonText>
            </Button>
          </VStack>
        </VStack>
      </View>
    </>
  );
}
