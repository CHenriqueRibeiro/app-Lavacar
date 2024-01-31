import { Text, View } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

const DiagonalTimeline = ({ onSelectHour }) => {
  const [selectedHour, setSelectedHour] = useState(null);

  const renderTimeline = () => {
    const hours = [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
    ];

    return hours.map((hour, index) => (
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
  };

  const handleHourSelection = (hour) => {
    setSelectedHour((prevSelectedHour) =>
      prevSelectedHour === hour ? null : hour
    );
    onSelectHour(hour);
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
      {renderTimeline()}
    </View>
  );
};

export default DiagonalTimeline;
