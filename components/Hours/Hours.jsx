import { Text, View } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useFirebase } from "../../context/FirebaseContext";

const DiagonalTimeline = ({ onSelectHour }) => {
  const { horarioReservado, horariosDisponiveis, updateHorarioReservado } =
    useFirebase();
  const [selectedHour, setSelectedHour] = useState(horarioReservado.Hora || "");

  const handleHourSelection = async (hour) => {
    if (horarioReservado.Hora === hour.Hora) {
    } else if (horariosDisponiveis.includes(hour.Hora)) {
      await updateHorarioReservado({ ...horarioReservado, Hora: hour.Hora });

      setSelectedHour(hour);
      onSelectHour(hour);
    }
  };

  const renderTimeline = () => {
    const hours = Array.from(horariosDisponiveis);

    const components = hours.map((hour, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleHourSelection(hour)}
        style={{
          width: 70,
          height: "100%",
          backgroundColor: selectedHour === hour ? "#4D0288" : "#eee",
          borderRadius: 5,
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
