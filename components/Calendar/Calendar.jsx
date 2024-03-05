import { useState, useEffect } from "react";
import { Text, ScrollView } from "react-native";
import moment from "moment";
import Date from "../../Time/Date";

import "moment/locale/pt-br";
import DiagonalTimeline from "../Hours/Hours";
import { VStack, View } from "@gluestack-ui/themed";
import { FirebaseProvider, useFirebase } from "../../context/FirebaseContext";

const Calendar = ({ onSelectDate, selected }) => {
  const [dates, setDates] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentMonth, setCurrentMonth] = useState();
  const [selectedHour, setSelectedHour] = useState(null);
  const { setDataSelecionada } = useFirebase();

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

  useEffect(() => {
    if (dates.length > 0) {
      setDataSelecionada(dates[0]);
    }
  }, [dates]);

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
        <VStack
          style={{
            width: "100%",
          }}
        >
          <View height={"20%"} justifyContent="center">
            <Text
              style={{
                textAlign: "center",
                textTransform: "capitalize",
                fontSize: 28,
                fontWeight: "bold",
              }}
            >
              {currentMonth}
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
          >
            <View
              style={{
                flexDirection: "row",
                height: "80%",
                justifyContent: "center",
                alignItems: "center",
              }}
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
            </View>
          </ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            height={"10%"}
          >
            <View
              style={{
                height: "80%",
                alignItems: "center",
                justifyContent: "center",
                paddingRight:5
              }}
            >
              <DiagonalTimeline onSelectHour={handleHourSelection} />
            </View>
          </ScrollView>
        </VStack>
      </FirebaseProvider>
    </>
  );
};

export default Calendar;
