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
} from "@gluestack-ui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/Firebase";
const images = [
  "https://img.freepik.com/fotos-gratis/lavadora-profissional-em-uniforme-azul-lavando-carro-de-luxo-com-pistola-de-agua-em-um-lava-jato-a-ceu-aberto_496169-333.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705276800&semt=sph",
  "https://www.acquazero.com/wp-content/uploads/2021/03/lava-jato-santana.jpeg",
  "https://parquemall.com.br/wp-content/uploads/2019/10/lava-r%C3%A1pido-GreenLeaf-parque-mall-1030x687.jpg",
];

const Card = ({ empresaData, onPress }) => {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = () => (
    <View style={styles.carouselItem}>
      <Image
        source={{
          uri: "https://thumbs.dreamstime.com/b/imagem-de-fundo-bonita-do-c%C3%A9u-da-natureza-64743176.jpg",
        }}
        style={styles.image}
        alt="Imagens dos estabelecimentos"
      />
    </View>
  );

  const handleContinue = () => {
    handleCardPress(empresaData);
  };
  const handleCardPress = (empresaData) => {
    navigation.navigate("Establishment", { empresaData });
  };
  return (
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
        data={images}
        renderItem={renderItem}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width}
        loop={true}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={images.length}
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
        <HStack alignItems="center" justifyContent="space-between" padding={5}>
          <HStack flexDirection="column">
            <HStack>
              <Ionicons name="location-sharp" size={24} color="white" />
              <Text color="white">
                {empresaData.Geolocalizacao.latitude},
                {empresaData.Geolocalizacao.longitude}
              </Text>
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
  );
};

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [empresaDataList, setEmpresaDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empresasCollectionRef = collection(db, "Estabelecimentos");
        const empresasSnapshot = await getDocs(empresasCollectionRef);

        const empresasData = [];
        empresasSnapshot.forEach((empresaDoc) => {
          const data = empresaDoc.data();
          empresasData.push(data);
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

  return (
    <ScrollView vertical pb={65}>
      <VStack alignItems="center" gap={12} mb={8} paddingTop={8}>
        {empresaDataList.map((empresaData, index) => (
          <Card key={index} index={index} empresaData={empresaData} />
        ))}
      </VStack>
    </ScrollView>
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
