import { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import moment from "moment";
import Date from "../../Time/Date";

import "moment/locale/pt-br";
import DiagonalTimeline from "../Hours/Hours";
import { VStack } from "@gluestack-ui/themed";
import { FirebaseProvider } from "../../context/FirebaseContext";

const Calendar = ({ onSelectDate, selected }) => {
  const [dates, setDates] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentMonth, setCurrentMonth] = useState();
  const [selectedHour, setSelectedHour] = useState(null);
  /*const {
    horarioReservado,
    servicoEscolhido,
    agendamento,
    lerAgendamento,
    showActionsheet,
    handleClose,
    setDataSelecionada,
  } = useFirebase();*/

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
  };

  return (
    <>
      <FirebaseProvider>
        <View>
          <Text
            style={{
              textAlign: "center",
              textTransform: "capitalize",
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            {currentMonth}
          </Text>
        </View>
        <VStack
          style={{
            width: "100%",
            height: 350,
            paddingBottom: 20,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
            style={{
              height: 10,
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            {dates.map((date, index) => {
              if (selected) {
                //  setDataSelecionada(date)
              }

              return (
                <Date
                  key={index}
                  date={date}
                  onSelectDate={onSelectDate}
                  selected={selected}
                  isToday={index === 0}
                />
              );
            })}
          </ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ height: 10, marginBottom: 5 }}
          >
            <DiagonalTimeline onSelectHour={handleHourSelection} />
          </ScrollView>
        </VStack>
      </FirebaseProvider>
    </>
  );
};

export default Calendar;
