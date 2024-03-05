import { Text, View } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useFirebase } from "../../context/FirebaseContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DiagonalTimeline = ({ onSelectHour }) => {
  const { horariosDisponiveis } = useFirebase();
  const [selectedHour, setSelectedHour] = useState("");

  const handleHourSelection = async (hour) => {
    saveHourToAsyncStorage(hour);

    setSelectedHour(hour);
    onSelectHour(hour);
  };

  const saveHourToAsyncStorage = async (hora) => {
    try {
      const agendamentoData = await AsyncStorage.getItem("agendamento");

      let agendamento = {};
      if (agendamentoData) {
        agendamento = JSON.parse(agendamentoData);
      }

      agendamento = { ...agendamento, hora };

      await AsyncStorage.setItem("agendamento", JSON.stringify(agendamento));
    } catch (error) {
      console.error(
        "Erro ao salvar hora do agendamento no AsyncStorage:",
        error.message
      );
    }
  };

  const renderTimeline = () => {
    const hours = Array.from(horariosDisponiveis);

    const components = hours.map((hour, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleHourSelection(hour)}
        style={{
          width: 95,
          height: "100%",
          backgroundColor: selectedHour === hour ? "#4D0288" : "#eee",
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 8,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: selectedHour === hour ? "#fff" : "#000",
          }}
        >
          {hour}
        </Text>
      </TouchableOpacity>
    ));

    return <>{components}</>;
  };

  return (
    <View
      style={{
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
        height: 45,
      }}
    >
      {horariosDisponiveis.length > 0 && renderTimeline()}
    </View>
  );
};

export default DiagonalTimeline;
