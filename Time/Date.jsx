import { Text, View } from "@gluestack-ui/themed";
import moment from "moment";
import "moment/locale/pt-br";
import { StyleSheet, TouchableOpacity } from "react-native";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../Config/Firebase";

const Date = ({ date, onSelectDate, selected }) => {
  moment.locale("pt-br");

  const isToday = moment(date).isSame(moment(), "day");
  const day = isToday ? "Hoje" : moment(date).format("ddd");
  const dayNumber = moment(date).format("D");
  const fullDate = moment(date).format("DD-MM-YYYY");

  const isSelected = selected === fullDate || (isToday && !selected);

  const handleDateSelection = async () => {
    try {
      const empresaDocRef = doc(db, "Estabelecimentos", "Empresa 1");
      await updateDoc(empresaDocRef, {
        HorarioReservado: {
          Cliente: "testeNome",
          Data: fullDate,
          Hora: "",
        },
      });

      onSelectDate(fullDate);
    } catch (error) {
      console.error("Erro ao adicionar data ao Firestore:", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleDateSelection}
      style={[
        styles.card,
        isSelected && { backgroundColor: "#4D0288", color: "#fff" },
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
