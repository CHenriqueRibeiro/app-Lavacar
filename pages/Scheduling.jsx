import {
  ButtonText,
  HStack,
  Heading,
  ModalContent,
  ModalHeader,
  ScrollView,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import AppointmentCard from "../components/AppointmentCard/AppointmentCard";
import { StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { firebaseAuth } from "../Config/Firebase";
import { Modal } from "@gluestack-ui/themed";
import { ModalBackdrop } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { ModalFooter } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";

export default function SchedulingComponent() {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  const checkUserStatus = () => {
    if (!firebaseAuth.currentUser) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkUserStatus();
    });

    return unsubscribe;
  }, [navigation]);

  const goToAccount = () => {
    setShowModal(false);
    setTimeout(() => {
      navigation.navigate("Account");
    }, 150);
  };
  const backToHome = () => {
    setShowModal(false);
    setTimeout(() => {
      navigation.navigate("Home");
    }, 150);
  };
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
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Heading color="#FFFFFF">Agendamentos</Heading>
        </HStack>
        <ScrollView width={"100%"}>
          <View style={{ alignItems: "center", paddingBottom: 98 }}>
            {firebaseAuth.currentUser && <AppointmentCard />}
          </View>
        </ScrollView>
      </View>
      <Modal isOpen={showModal}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader borderBottomWidth="$0">
            <VStack space="sm">
              <Heading size="lg" color="#4D0288">
                Não tem conta?
              </Heading>
              <Text size="sm">
                Faça login ou cadastre-se para consultar seu(s) agendamento(s).
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
                  onPress={backToHome}
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
}
