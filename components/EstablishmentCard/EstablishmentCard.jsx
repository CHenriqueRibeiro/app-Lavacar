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
import { Dimensions, StyleSheet, useWindowDimensions } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/Firebase";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useLocation } from "../../context/LocationContext";

const Card = ({ empresaData, onPress }) => {
  const navigation = useNavigation();
  const { userLocation, reverseGeocode, city, latAndLong } = useLocation();

  const [activeSlide, setActiveSlide] = useState(0);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (latAndLong) {
      const empresaLatitude = empresaData.Geolocalizacao.latitude;
      const empresaLongitude = empresaData.Geolocalizacao.longitude;

      const empresaCoords = {
        latitude: empresaLatitude,
        longitude: empresaLongitude,
      };

      const userCoords = {
        latitude: latAndLong.lat,
        longitude: latAndLong.lng,
      };

      const calculatedDistance = calculateDistance(userCoords, empresaCoords);

      setDistance(calculatedDistance);
    }
  }, [latAndLong, empresaData]);

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
        <HStack alignItems="center" justifyContent="space-between" padding={5}>
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
          {empresaDataList.map((empresaData, index) => (
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
