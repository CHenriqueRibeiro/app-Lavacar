import {
  Box,
  HStack,
  Heading,
  Image,
  ScrollView,
  StatusBar,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import ServiceCard from "../components/ServiceCard/ServiceCard";
export default function Establishment({ route }) {
  const { empresaData } = route.params;
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4D0288" />
      <View flex={1} alignItems="center" backgroundColor="#E9EDF0">
        <VStack
          height={300}
          width={"100%"}
          backgroundColor="#4D0288"
          alignItems="center"
          borderBottomLeftRadius={15}
          borderBottomRightRadius={15}
        >
          <HStack alignItems="center" width={"100%"} height={"25%"}>
            <Ionicons name="chevron-back-outline" size={24} color="white" />
            <Heading color="white">Voltar</Heading>
          </HStack>
          <HStack
            alignItems="center"
            width={"100%"}
            height={"75%"}
            justifyContent="space-around"
          >
            <Box style={{ width: "40%", height: "90%" }}>
              <Image
                source={{
                  uri: "https://static6.depositphotos.com/1025962/560/v/450/depositphotos_5601187-stock-illustration-car-wash.jpg",
                }}
                alt="Imagem dos estabelecimentos"
                style={{ width: "100%", height: "100%", borderRadius: 15 }}
              />
            </Box>
            <VStack
              style={{ width: "50%", height: "90%" }}
              justifyContent="space-between"
              paddingLeft={8}
            >
              <Heading color="white"> {empresaData.NomeDaEmpresa}</Heading>
              <HStack gap={5} alignItems="center">
                <Fontisto name="whatsapp" size={24} color="white" />
                <Text color="white">{empresaData.DadosDaEmpresa.Telefone}</Text>
              </HStack>
              <HStack gap={5} alignItems="center">
                <FontAwesome6 name="map-location-dot" size={20} color="white" />
                <Text color="white">{empresaData.DadosDaEmpresa.Endereco}</Text>
              </HStack>
              <HStack gap={5} alignItems="center">
                <Entypo name="info-with-circle" size={24} color="white" />
                <Text color="white">+ informações</Text>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
        <ScrollView width={"95%"} backgroundColor="#E9EDF0" marginTop={15}>
        <ServiceCard servicos={empresaData.Servicos} />
        </ScrollView>
      </View>
    </>
  );
}
