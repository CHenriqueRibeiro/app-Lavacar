import React from "react";
import Header from "../components/Header/Header";
import { ScrollView, StatusBar, View } from "@gluestack-ui/themed";
import EstablishmentCard from "../components/EstablishmentCard/EstablishmentCard";
export default function Home() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4D0288" />
      <View flex={1} alignItems="center " backgroundColor="#E9EDF0">
        <Header />
        <ScrollView width={"100%"}>
          <EstablishmentCard />
        </ScrollView>
      </View>
    </>
  );
}
