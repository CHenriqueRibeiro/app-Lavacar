import React from "react";

import Header from "../components/Header/Header";
import {
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
  View,
} from "@gluestack-ui/themed";
import { Feather } from "@expo/vector-icons";
import Card from "../components/Card/Card";
export default function Home() {
  return (
    <>
      <View height={"100%"} alignItems="center">
        <Header />
        <HStack
          marginTop={12}
          width={"100%"}
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Input width={"85%"}>
            <InputSlot pl={5}>
              <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField placeholder="Procure por serviço ou estabelecimento" />
          </Input>
          <Feather name="filter" size={24} color="black" />
        </HStack>
        <Card />
      </View>
    </>
  );
}
