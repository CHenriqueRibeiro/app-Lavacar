import { HStack, Heading, StatusBar, View } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import AppointmentCard from "../components/AppointmentCard/AppointmentCard";

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
          <Heading color="#FFFFFF">Agendamentos</Heading>
        </HStack>
        <AppointmentCard />
      </View>
    </>
  );
}
