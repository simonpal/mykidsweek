import React, { useEffect, useMemo, useState } from "react";
import getISOWeek from "date-fns/getISOWeek";
import DateSelector from "./components/DateSelector";
import styled from "styled-components";
import WeekTypeSelector from "./components/WeekTypeSelector";
import ResultMessage from "./components/ResultMessage";
import { WeekDay, WeekDaySelector } from "./components/WeekDaySelector";
import { addDays, addYears, startOfMonth, subDays } from "date-fns";
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getMonthlyEvents } from "./utils";

const localizer = momentLocalizer(moment);

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: "center";
  height: 100vh;
  max-width: 100%;
`;

export enum WeekTypes {
  Even = "even",
  Odd = "odd",
}

function App() {
  const localSetting = localStorage.getItem("weekType") as WeekTypes;
  const localStartDay = localStorage.getItem("startOfWeek") as WeekDay;
  const [weekType, setWeekType] = useState<WeekTypes>(
    localSetting || WeekTypes.Even
  );
  const [startOfWeek, setStartOfWeek] = useState<WeekDay>(
    localStartDay || "Monday"
  );
  const [checkDate, setCheckDate] = useState<Date>(new Date());
  const [haveKids, setHaveKids] = useState<boolean>(false);
  const [selectedWeek, setSelectedWeek] = useState<number>(
    getISOWeek(new Date())
  );

  const events = useMemo(
    () =>
      getMonthlyEvents(
        subDays(new Date(), 30),
        addYears(new Date(), 1),
        weekType,
        startOfWeek
      ),
    [startOfWeek, weekType]
  );
  console.log({ events });

  const handleDayChange = (day: WeekDay) => {
    setStartOfWeek(day);
    localStorage.setItem("startOfWeek", day);
  };

  const handleWeekChange = (e: any) => {
    setWeekType(e.currentTarget.id);
    localStorage.setItem("weekType", e.currentTarget.id);
  };

  useEffect(() => {
    if (!localSetting) {
      localStorage.setItem("weekType", WeekTypes.Even);
    }
  }, [localSetting]);

  useEffect(() => {
    const weekNr = getISOWeek(checkDate);
    const typeResult = weekNr % 2 === 0 ? WeekTypes.Even : WeekTypes.Odd;
    console.log(weekNr, typeResult);
    setSelectedWeek(weekNr);
    setHaveKids(typeResult === weekType);
  }, [checkDate, weekType]);

  return (
    <AppWrapper>
      <h1>Har jag barnen?</h1>
      <h4>Min vecka startar på dag</h4>
      <WeekDaySelector weekDay={startOfWeek} onChange={handleDayChange} />
      <h4>Jag får barn på jämn/ojämn vecka</h4>
      <WeekTypeSelector
        isEven={weekType === WeekTypes.Even}
        handleWeekChange={handleWeekChange}
      />
      {/* <DateSelector date={checkDate} setDate={setCheckDate} /> */}
      {/* <ResultMessage selectedWeek={selectedWeek} haveKids={haveKids} /> */}
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        events={events}
        max={addYears(new Date(), 2)}
        showMultiDayTimes
        step={60}
      />
    </AppWrapper>
  );
}

export default App;
