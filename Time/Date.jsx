import { Text, View } from "@gluestack-ui/themed";
import moment from "moment";
import "moment/locale/pt-br";
import { StyleSheet, TouchableOpacity } from "react-native";

const Date = ({ date, onSelectDate, selected }) => {
  moment.locale("pt-br");

  const isToday = moment(date).isSame(moment(), "day");
  const day = isToday ? "Hoje" : moment(date).format("ddd");
  const dayNumber = moment(date).format("D");
  const fullDate = moment(date).format("DD-MM-YYYY");

  const isSelected = selected === fullDate || (isToday && !selected);

  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[
        styles.card,
        isSelected && { backgroundColor: "#6146c6", color: "#fff" },
        !isToday && !isSelected && { backgroundColor: "#eee" },
      ]}
    >
      <Text style={[styles.big, isSelected && { color: "#fff" }]}>{day}</Text>
      <View style={{ height: 10 }} />
      <Text
        style={[
          styles.medium,
          isSelected && {
            color: "#fff",
            fontWeight: "bold",
            fontSize: 22,
          },
        ]}
      >
        {dayNumber}
      </Text>
    </TouchableOpacity>
  );
};

export default Date;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#eee",
    borderRadius: 10,
    borderColor: "#ddd",
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    height: 90,
    width: 80,
    marginHorizontal: 5,
  },
  big: {
    fontWeight: "bold",
    fontSize: 20,
  },
  medium: {
    fontSize: 16,
  },
});
