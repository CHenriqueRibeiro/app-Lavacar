import React, { useState } from "react";
import Header from "../components/Header/Header";
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Heading,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  ScrollView,
  SearchIcon,
  StatusBar,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { Feather } from "@expo/vector-icons";
import EstablishmentCard from "../components/EstablishmentCard/EstablishmentCard";
import { TouchableOpacity } from "react-native";
const stepsDistance = ["500mt", "1km", "2km", "4km", "8km"];
const stepsPrice = ["30", "45", "60", "80", "120"];
export default function Home() {
  const [show, setShow] = useState(false);
  const [selectedStep, setSelectedStep] = useState("");
  const [selectedStepPrice, setSelectedStepPrice] = useState("");

  const handleFilter = () => {
    setShow(true);
  };
  const handleFilterClean = () => {
    setSelectedStep("");
    setSelectedStepPrice("");
  };

  const handleStepClick = (step) => {
    setSelectedStep(step);
  };
  const handleStepClickPrice = (step) => {
    setSelectedStepPrice(step);
  };
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4D0288" />
      <View flex={1} alignItems="center " backgroundColor="#E9EDF0">
        <Header />
        <HStack
          marginTop={12}
          width={"100%"}
          justifyContent="space-evenly"
          alignItems="center"
          position="relative"
        >
          <Input width={"75%"} marginBottom={8}>
            <InputSlot pl={5}>
              <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField placeholder="Procure por serviço ou estabelecimento" />
          </Input>
          <TouchableOpacity
            onPress={handleFilter}
            width={"25%"}
            alignItems="center"
            justifyContent="center"
          >
            <Feather name="filter" size={28} color="black" />
          </TouchableOpacity>

          {show && (
            <>
              <VStack
                position="absolute"
                height={250}
                backgroundColor="#4D0288"
                zIndex={9}
                top={40}
                right={20}
                width={"80%"}
                alignItems="center"
                borderRadius={"$lg"}
                justifyContent="space-between"
                borderWidth={1}
                borderColor="#E9EDF0"
              >
                <Heading color="#FFFFFF">Filtro</Heading>
                <VStack width={"100%"} alignItems="center">
                  <Text color="#FFFFFF">Distância </Text>
                  <HStack
                    width={"95%"}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {stepsDistance.map((step) => (
                      <Button
                        height={"60%"}
                        width={"18%"}
                        key={step}
                        onPress={() => handleStepClick(step)}
                        backgroundColor={
                          selectedStep === step ? "#065FD4" : "#FFFFFF"
                        }
                        borderRadius={"$full"}
                      >
                        <ButtonText
                          color={selectedStep === step ? "#000000" : "#4D0288"}
                          fontSize={10}
                        >
                          {step}
                        </ButtonText>
                      </Button>
                    ))}
                  </HStack>
                </VStack>
                <VStack width={"100%"} alignItems="center">
                  <Text color="#FFFFFF" marginBottom={6}>
                    Preço
                  </Text>
                  <HStack
                    width={"95%"}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {stepsPrice.map((step) => (
                      <Button
                        height={"100%"}
                        width={"18%"}
                        key={step}
                        onPress={() => handleStepClickPrice(step)}
                        backgroundColor={
                          selectedStepPrice === step ? "#065FD4" : "#FFFFFF"
                        }
                        borderRadius={"$full"}
                      >
                        <ButtonText
                          color={
                            selectedStepPrice === step ? "#000000" : "#4D0288"
                          }
                          fontSize={10}
                        >
                          {step}
                        </ButtonText>
                      </Button>
                    ))}
                  </HStack>
                </VStack>
                <HStack
                  width={"95%"}
                  justifyContent="space-evenly"
                  alignItems="center"
                  paddingBottom={12}
                >
                  <Button borderRadius={"$lg"} borderColor="#FFFFFF">
                    <ButtonText onPress={() => setShow(false)} color="#FFFFFF">
                      Aplicar filtro
                    </ButtonText>
                  </Button>
                  <Button
                    onPress={() => handleFilterClean()}
                    variant="outline"
                    borderRadius={"$lg"}
                    borderColor="#FFFFFF"
                  >
                    <ButtonText color="#FFFFFF">Limpar filtro</ButtonText>
                  </Button>
                </HStack>
              </VStack>
            </>
          )}
        </HStack>
        <ScrollView width={"100%"}>
          <EstablishmentCard />
        </ScrollView>
      </View>
    </>
  );
}
