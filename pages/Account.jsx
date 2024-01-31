import {
  HStack,
  Heading,
  StatusBar,
  View,
  Box,
  VStack,
  Text,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
export default function Scheduling() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4D0288" />
      <View backgroundColor="#E9EDF0" flex={1} alignItems="center">
        <HStack
          height={70}
          backgroundColor="#4D0288"
          width={"100%"}
          alignItems="center"
        >
          <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
          <Heading color="#FFFFFF">Perfil</Heading>
        </HStack>
        <HStack
          marginTop={15}
          width={"90%"}
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
          <VStack height={104} justifyContent="space-between">
            <Heading color="#000000">Dados Pessoais</Heading>
            <Text fontWeight="700" color="#000000">
              Nome:<Text> Henrique</Text>
            </Text>
            <Text fontWeight="700" color="#000000">
              Telefone:<Text> 85 999999999</Text>
            </Text>
          </VStack>
          <FontAwesome6 name="edit" size={30} color="black" />
        </HStack>
        <HStack
          marginTop={15}
          width={"90%"}
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
            <Ionicons name="car-sport" size={60} color="#FFFFFF" />
          </Box>
          <VStack height={104} justifyContent="space-between">
            <Heading color="#000000">Veiculos</Heading>
            <Text fontWeight="700" color="#000000">
              Modelo:<Text> Polo</Text>
            </Text>
            <Text fontWeight="700" color="#000000">
              Modelo:<Text>Moto Honda Bros</Text>
            </Text>
          </VStack>
          <FontAwesome6 name="edit" size={30} color="black" />
        </HStack>
        <Button
          alignItems="center"
          width={"50%"}
          marginTop={15}
          justifyContent="space-around"
        >
          <ButtonText> Encerrar Seção</ButtonText>
          <Ionicons name="exit-outline" size={24} color="black" />
        </Button>
      </View>
    </>
  );
}
