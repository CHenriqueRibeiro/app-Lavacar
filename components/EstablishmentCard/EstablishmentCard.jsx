import React, { useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  VStack,
  HStack,
  Heading,
  Text,
  Box,
  Button,
  ButtonText,
  Image,
} from "@gluestack-ui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const images = [
  "https://img.freepik.com/fotos-gratis/lavadora-profissional-em-uniforme-azul-lavando-carro-de-luxo-com-pistola-de-agua-em-um-lava-jato-a-ceu-aberto_496169-333.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705276800&semt=sph",
  "https://www.acquazero.com/wp-content/uploads/2021/03/lava-jato-santana.jpeg",
  "https://parquemall.com.br/wp-content/uploads/2019/10/lava-r%C3%A1pido-GreenLeaf-parque-mall-1030x687.jpg",
];

export default function Card() {
  const [activeSlide, setActiveSlide] = useState(0);
  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image
        source={{ uri: item }}
        style={styles.image}
        alt="imagens dos estabelecimentos"
      />
    </View>
  );
  const navigation = useNavigation();
  const handleContinue = () => {
    navigation.navigate("Establishment");
  };
  return (
    <VStack alignItems="center" gap={12} mt={12} mb={8} paddingTop={8}>
      <VStack
        overflow="hidden"
        width="95%"
        backgroundColor="$indigo700"
        height={300}
        borderRadius={10}
        style={{
          shadowRadius: 30,
          elevation: 6,
          shadowColor: "black",
        }}
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
            Limpinho LavaCarro
          </Heading>
          <HStack
            alignItems="center"
            justifyContent="space-between"
            padding={5}
          >
            <HStack flexDirection="column">
              <HStack>
                <Ionicons name="location-sharp" size={24} color="white" />
                <Text color="white">a 1km de você </Text>
              </HStack>
              <HStack>
                <MaterialIcons name="attach-money" size={24} color="white" />
                <Text color="white">a partir de R$ 30,00 </Text>
              </HStack>
            </HStack>
            <Button
              width={180}
              alignItems="center"
              justifyContent="space-around"
              bg="$white"
              onPress={handleContinue}
            >
              <ButtonText color="$indigo700">Agendar</ButtonText>
              <MaterialIcons name="schedule-send" size={24} color="#4338CA" />
            </Button>
          </HStack>
        </VStack>
      </VStack>
      <VStack
        overflow="hidden"
        width="95%"
        backgroundColor="$indigo700"
        height={300}
        borderRadius={10}
        style={{
          shadowRadius: 30,
          elevation: 6,
          shadowColor: "black",
        }}
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
            Limpinho LavaCarro
          </Heading>
          <HStack
            alignItems="center"
            justifyContent="space-between"
            padding={5}
          >
            <HStack flexDirection="column">
              <HStack>
                <Ionicons name="location-sharp" size={24} color="white" />
                <Text color="white">a 1km de você </Text>
              </HStack>
              <HStack>
                <MaterialIcons name="attach-money" size={24} color="white" />
                <Text color="white">a partir de R$ 30,00 </Text>
              </HStack>
            </HStack>
            <Button
              width={180}
              alignItems="center"
              justifyContent="space-around"
              bg="$white"
            >
              <ButtonText color="$indigo700">Agendar</ButtonText>
              <MaterialIcons name="schedule-send" size={24} color="#4338CA" />
            </Button>
          </HStack>
        </VStack>
      </VStack>
      <VStack
        overflow="hidden"
        width="95%"
        backgroundColor="$indigo700"
        height={300}
        borderRadius={10}
        style={{
          shadowRadius: 30,
          elevation: 6,
          shadowColor: "black",
          marginBottom: 58,
        }}
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
            Limpinho LavaCarro
          </Heading>
          <HStack
            alignItems="center"
            justifyContent="space-between"
            padding={5}
          >
            <HStack flexDirection="column">
              <HStack>
                <Ionicons name="location-sharp" size={24} color="white" />
                <Text color="white">a 1km de você </Text>
              </HStack>
              <HStack>
                <MaterialIcons name="attach-money" size={24} color="white" />
                <Text color="white">a partir de R$ 30,00 </Text>
              </HStack>
            </HStack>
            <Button
              width={180}
              alignItems="center"
              justifyContent="space-around"
              bg="$white"
            >
              <ButtonText color="$indigo700">Agendar</ButtonText>
              <MaterialIcons name="schedule-send" size={24} color="#4338CA" />
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
}

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
