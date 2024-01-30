import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import moment from "moment";
import Date from "../../Time/Date";

import "moment/locale/pt-br";
import DiagonalTimeline from "../Hours/Hours";
import { Button, ButtonText, VStack } from "@gluestack-ui/themed";

const Calendar = ({ onSelectDate, selected }) => {
  const [dates, setDates] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentMonth, setCurrentMonth] = useState();
  const [selectedHour, setSelectedHour] = useState(null);
  moment.locale("pt-br");

  const getDates = () => {
    const _dates = [];
    for (let i = 0; i < 10; i++) {
      const date = moment().add(i, "days");
      _dates.push(date);
    }
    setDates(_dates);
  };

  useEffect(() => {
    getDates();
  }, []);

  const getCurrentMonth = () => {
    const month = moment(dates[0])
      .add(scrollPosition / 60, "days")
      .format("MMMM");
    setCurrentMonth(month);
  };

  useEffect(() => {
    getCurrentMonth();
  }, [scrollPosition]);
  const handleHourSelection = (hour) => {
    setSelectedHour(hour);

    console.log("Hora selecionada:", hour);
  };
  return (
    <>
      <View>
        <Text
          style={{
            textTransform: "capitalize",
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          {currentMonth}
        </Text>
      </View>
      <VStack
        style={{
          width: "100%",
          height: 300,
          paddingBottom: 20,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
          style={{ height: 10, marginBottom: 5 }}
        >
          {dates.map((date, index) => (
            <Date
              key={index}
              date={date}
              onSelectDate={onSelectDate}
              selected={selected}
              isToday={index === 0}
            />
          ))}
        </ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: 10, marginBottom: 5 }}
        >
          <DiagonalTimeline onSelectHour={handleHourSelection} />
        </ScrollView>
        <Button>
          <ButtonText>Marcar Horario</ButtonText>
        </Button>
      </VStack>
    </>
  );
};

export default Calendar;
