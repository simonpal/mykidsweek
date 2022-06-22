import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { WeekDay } from "./components/WeekDaySelector";
import { addYears, subDays } from "date-fns";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getMonthlyEvents } from "./utils";
import { UserSettings } from "./components/UserSettings";
import { CalendarWrapper } from "./components/CalendarWrapper";

moment.locale("sv", {
  week: {
    dow: 1,
    doy: 4,
  },
});

const localizer = momentLocalizer(moment);

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: "center";
  min-height: 100vh;
  max-width: 100%;
  @media screen and (max-width: 600px) {
    padding: 1rem;
  }
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

  return (
    <AppWrapper>
      <h1>Har jag barnen?</h1>
      <UserSettings
        weekType={weekType}
        startOfWeek={startOfWeek}
        handleDayChange={handleDayChange}
        handleWeekChange={handleWeekChange}
      />
      <CalendarWrapper>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          events={events}
          max={addYears(new Date(), 2)}
          showMultiDayTimes
          step={60}
          views={["month"]}
        />
      </CalendarWrapper>
    </AppWrapper>
  );
}

export default App;
