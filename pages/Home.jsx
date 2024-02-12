import React from "react";

import Header from "../components/Header/Header";
import {
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  ScrollView,
  SearchIcon,
  StatusBar,
  View,
} from "@gluestack-ui/themed";
import { Feather } from "@expo/vector-icons";
import EstablishmentCard from "../components/EstablishmentCard/EstablishmentCard";
export default function Home() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4D0288" />
      <View height={"100%"} alignItems="center " backgroundColor="#E9EDF0">
        <Header />
        <HStack
          marginTop={12}
          width={"100%"}
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Input width={"85%"} marginBottom={8}>
            <InputSlot pl={5}>
              <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField placeholder="Procure por serviço ou estabelecimento" />
          </Input>
          <Feather name="filter" size={24} color="black" />
        </HStack>
        <ScrollView width={"100%"}>
         <EstablishmentCard />
        </ScrollView>
      </View>
    </>
  );
}
