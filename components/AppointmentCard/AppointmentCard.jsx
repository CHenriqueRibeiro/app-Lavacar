import {
  Box,
  Button,
  ButtonText,
  HStack,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Config/Firebase";
export default function AppointmentCard() {
  const [horarioReservado, setHorarioReservado] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "Estabelecimentos", "Empresa 1");

      try {
        const docSnap = await getDoc(docRef);
        const horarioReservadoData = docSnap.data().HorarioReservado || {};

        if (docSnap.exists()) {
          setHorarioReservado(horarioReservadoData);
        } else {
          console.log("Nao tem documento!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <View
      height={180}
      backgroundColor="#FFFFFF"
      width={"95%"}
      alignItems="center"
      borderRadius={15}
      marginTop={15}
      style={{
        shadowRadius: 30,
        elevation: 6,
        shadowColor: "black",
      }}
    >
      <HStack width={"90%"} alignItems="center" height={"100%"} gap={15}>
        <Box
          width={120}
          height={150}
          backgroundColor="#4D0288"
          justifyContent="center"
          alignItems="center"
          borderRadius={15}
        >
          <MaterialCommunityIcons
            name="calendar-clock"
            size={48}
            color="white"
          />
        </Box>
        <VStack height={150} justifyContent="space-between">
          <HStack alignItems="center">
            <MaterialIcons name="local-car-wash" size={24} color="black" />
            <Text fontSize={18}>{horarioReservado.Estabelecimeto}</Text>
          </HStack>
          <HStack alignItems="center">
            <MaterialIcons name="cleaning-services" size={24} color="black" />
            <Text fontSize={18}>{horarioReservado.Servico}</Text>
          </HStack>
          <HStack alignItems="center">
            <AntDesign name="calendar" size={24} color="black" />
            <Text fontSize={18}>
              {horarioReservado.Data} - {horarioReservado.Hora}
            </Text>
          </HStack>
          <Button alignItems="center" backgroundColor="$error700" gap={15}>
            <MaterialIcons name="cancel" size={20} color="white" />
            <ButtonText>Cancelar</ButtonText>
          </Button>
        </VStack>
      </HStack>
    </View>
  );
}
