import React, { useState, useEffect } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  ButtonText,
  Image,
  View,
  ScrollView,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Input,
  SearchIcon,
  InputSlot,
  InputField,
  InputIcon,
} from "@gluestack-ui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet, useWindowDimensions } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db, firebaseAuth } from "../../Config/Firebase";
import ContentLoader, { Rect } from "react-content-loader/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocation } from "../../context/LocationContext";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
const stepsDistance = ["500mt", "1km", "2km", "4km", "8km"];
const stepsPrice = ["30", "45", "60", "80", "120"];
const Card = ({ empresaData, onPress }) => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [distance, setDistance] = useState(null);
  const { userLocation } = useLocation();

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const savedDataString = await AsyncStorage.getItem("userLocation");
        if (savedDataString) {
          const savedData = JSON.parse(savedDataString);
          if (savedData && savedData.latAndLon) {
            const { lat, lng } = savedData.latAndLon;

            const empresaCoords = {
              latitude: empresaData.Geolocalizacao.latitude,
              longitude: empresaData.Geolocalizacao.longitude,
            };

            const userCoords = {
              latitude: lat,
              longitude: lng,
            };

            const calculatedDistance = calculateDistance(
              userCoords,
              empresaCoords
            );
            setDistance(calculatedDistance);
          }
        }
      } catch (error) {
        console.error("Erro ao recuperar dados do AsyncStorage:", error);
      }
    };

    fetchCoordinates();
  }, [empresaData, userLocation]);

  const calculateDistance = (coord1, coord2) => {
    const R = 6371;
    const dLat = deg2rad(coord2.latitude - coord1.latitude);
    const dLon = deg2rad(coord2.longitude - coord1.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(coord1.latitude)) *
        Math.cos(deg2rad(coord2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image
        source={{ uri: item }}
        style={styles.image}
        alt="Imagens dos estabelecimentos"
      />
    </View>
  );

  const handleContinue = () => {
    if (firebaseAuth.currentUser) {
      handleCardPress(empresaData);
    } else {
      setShowModal(true);
    }
  };

  const handleCardPress = (empresaData) => {
    navigation.navigate("Establishment", { empresaData });
  };
  const goToAccount = () => {
    setShowModal(false);
    setTimeout(() => {
      navigation.navigate("Account");
    }, 150);
  };

  return (
    <>
      <VStack
        overflow="hidden"
        width="95%"
        backgroundColor="#4D0288"
        height={300}
        borderRadius={10}
        style={{
          shadowRadius: 30,
          elevation: 6,
          shadowColor: "black",
        }}
        onTouchEnd={onPress}
      >
        <Carousel
          data={empresaData.Fotos}
          renderItem={renderItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width}
          loop={true}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={empresaData.Fotos ? empresaData.Fotos.length : 0}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.paginationDot}
          inactiveDotStyle={styles.paginationInactiveDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        <VStack width="100%" height="30%">
          <Heading color="$white" pl={6} textAlign="center">
            {empresaData.NomeDaEmpresa}
          </Heading>
          <HStack
            alignItems="center"
            justifyContent="space-between"
            padding={5}
          >
            <HStack flexDirection="column">
              <HStack>
                <Ionicons name="location-sharp" size={24} color="white" />
                {distance !== null && (
                  <Text color="white">
                    {distance < 1
                      ? `${Math.round(distance * 1000)} metros`
                      : `${distance.toFixed(2)} km`}
                  </Text>
                )}
              </HStack>
              <HStack>
                <MaterialIcons name="attach-money" size={24} color="white" />
                <Text color="white"> {empresaData.ValoresDosServicos} </Text>
              </HStack>
            </HStack>
            <Button
              width={180}
              alignItems="center"
              justifyContent="space-around"
              bg="$white"
              onPress={handleContinue}
            >
              <ButtonText color="#4D0288">Agendar</ButtonText>
              <MaterialIcons name="schedule-send" size={24} color="#4D0288" />
            </Button>
          </HStack>
        </VStack>
      </VStack>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader borderBottomWidth="$0">
            <VStack space="sm">
              <Heading size="lg" color="#4D0288">
                Não tem conta?
              </Heading>
              <Text size="sm">
                Faça login ou cadastre-se para realizar seu(s) agendamento(s).
              </Text>
            </VStack>
          </ModalHeader>

          <ModalFooter borderTopWidth="$0">
            <VStack space="lg" w="$full">
              <Button onPress={goToAccount}>
                <ButtonText>Login / Criar conta</ButtonText>
              </Button>
              <HStack>
                <Button
                  variant="link"
                  size="sm"
                  onPress={() => {
                    setShowModal(false);
                  }}
                  alignItems="center"
                >
                  <Ionicons name="chevron-back" size={25} color="#4D0288" />
                  <ButtonText
                    color="#4D0288"
                    fontSize={18}
                    textDecorationLine="none"
                  >
                    Voltar
                  </ButtonText>
                </Button>
              </HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [empresaDataList, setEmpresaDataList] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedStep, setSelectedStep] = useState("");
  const [selectedStepPrice, setSelectedStepPrice] = useState("");
  const [searchText, setSearchText] = useState("");

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const empresasCollectionRef = collection(db, "Estabelecimentos");
        const empresasSnapshot = await getDocs(empresasCollectionRef);

        const empresasData = [];
        empresasSnapshot.forEach((empresaDoc) => {
          const data = empresaDoc.data();
          empresasData.push({
            ...data,
            Fotos: data.Fotos || [],
          });
        });

        setEmpresaDataList(empresasData);
      } catch (error) {
        console.error("Erro ao buscar dados das empresas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const filteredEmpresaDataList = empresaDataList.filter((empresaData) =>
    empresaData.NomeDaEmpresa.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <ScrollView vertical pb={65}>
      {loading ? (
        <VStack alignItems="center" gap={12} mb={8} paddingTop={8}>
          {Array.from({ length: 5 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </VStack>
      ) : (
        <VStack alignItems="center" gap={12} mb={8} paddingTop={8}>
          <HStack
            marginTop={12}
            width={"100%"}
            justifyContent="space-evenly"
            alignItems="center"
            position="relative"
          >
            <Input width={"95%"} marginBottom={8}>
              <InputSlot pl={5}>
                <InputIcon as={SearchIcon} />
              </InputSlot>
              <InputField
                placeholder="Procure pelo estabelecimento"
                onChangeText={(text) => setSearchText(text)}
              />
            </Input>
            {/* <TouchableOpacity
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
                            color={
                              selectedStep === step ? "#000000" : "#4D0288"
                            }
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
                      <ButtonText
                        onPress={() => setShow(false)}
                        color="#FFFFFF"
                      >
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
            )}*/}
          </HStack>

          {filteredEmpresaDataList.map((empresaData, index) => (
            <Card key={index} index={index} empresaData={empresaData} />
          ))}
        </VStack>
      )}
    </ScrollView>
  );
};

const CardSkeleton = () => {
  const { width } = useWindowDimensions();

  return (
    <VStack
      speed={1}
      overflow="hidden"
      width="95%"
      backgroundColor="transparent"
      height={300}
      borderRadius={10}
    >
      <ContentLoader viewBox={`0 0 ${width} 300`}>
        <Rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
        <Rect x="5" y="5" rx="5" ry="5" width="98%" height="65%" />
        <Rect x="215" y="250" rx="5" ry="5" width="190" height="45" />
        <Rect x="140" y="215" rx="0" ry="0" width="170" height="25" />
        <Rect x="15" y="250" rx="0" ry="0" width="145" height="18" />
        <Rect x="15" y="280" rx="0" ry="0" width="145" height="18" />
      </ContentLoader>
    </VStack>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    width: Dimensions.get("window").width,
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  paginationContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 70,
    width: "100%",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: "#4A90E2",
  },
  paginationInactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: "#C0C0C0",
  },
});
export default HomeScreen;
