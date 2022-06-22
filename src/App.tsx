import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import WeekTypeSelector from "./components/WeekTypeSelector";
import { WeekDay, WeekDaySelector } from "./components/WeekDaySelector";
import { addYears, subDays } from "date-fns";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getMonthlyEvents, weekDaysLang } from "./utils";
import AngleDownIcon from "./components/AngleDownIcon";

moment.locale("sv", {
  week: {
    dow: 1,
    doy: 4,
  },
});

const localizer = momentLocalizer(moment);

interface SettingsProps {
  active: boolean;
}

const SettingsBox = styled.div<SettingsProps>`
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  border-radius: ${({ active }) => (active ? "10px" : "25px")};
  width: 500px;
  max-width: 100%;
  overflow: hidden;

  .content {
    opacity: ${({ active }) => (active ? 1 : 0)};
    transform: ${({ active }) => `scale(${active ? 1 : 0})`};
    transition: all 0.3s ease;
    max-height: ${({ active }) => (active ? "400px" : 0)};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({ active }) => (active ? "1rem" : 0)};
    overflow: hidden;
    flex-direction: column;
  }
  .summary {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-weight: bold;
    position: relative;
    padding: 1rem;
    cursor: pointer;
    svg {
      position: absolute;
      right: 1.5rem;
      top: 50%;
      transition: all 0.3s ease;
      transform: ${({ active }) =>
        active ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)"};
    }
    @media screen and (max-width: 600px) {
      font-size: 0.825rem;
    }
  }
`;

const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 680px;
  height: 500px;
  margin-bottom: 1rem;
  .rbc-month-view,
  .rbc-header,
  .rbc-header + .rbc-header,
  .rbc-day-bg + .rbc-day-bg,
  .rbc-month-row + .rbc-month-row {
    border-color: rgba(255, 255, 255, 0.1);
  }
  .rbc-toolbar button {
    color: ${({ theme }) => theme.colors.textColor};
    border-color: ${({ theme }) => theme.colors.primary};
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
  .rbc-off-range-bg {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .rbc-today {
    background-color: rgba(255, 255, 255, 0.2);
  }
  .rbc-event,
  .rbc-day-slot .rbc-background-event {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

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
  const [showSettings, setShowSettings] = useState(false);
  // const [checkDate, setCheckDate] = useState<Date>(new Date());
  // const [haveKids, setHaveKids] = useState<boolean>(false);
  // const [selectedWeek, setSelectedWeek] = useState<number>(
  //   getISOWeek(new Date())
  // );

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

  // useEffect(() => {
  //   const weekNr = getISOWeek(checkDate);
  //   const typeResult = weekNr % 2 === 0 ? WeekTypes.Even : WeekTypes.Odd;
  //   console.log(weekNr, typeResult);
  //   setSelectedWeek(weekNr);
  //   setHaveKids(typeResult === weekType);
  // }, [checkDate, weekType]);

  return (
    <AppWrapper>
      <h1>Har jag barnen?</h1>
      <SettingsBox active={showSettings}>
        <div className="content">
          <h4>Min vecka startar på dag</h4>
          <WeekDaySelector weekDay={startOfWeek} onChange={handleDayChange} />
          <h4>Jag får barn på jämn/udda vecka</h4>
          <WeekTypeSelector
            isEven={weekType === WeekTypes.Even}
            handleWeekChange={handleWeekChange}
          />
        </div>
        <div
          className="summary"
          role="button"
          onClick={() => setShowSettings(!showSettings)}
        >
          {!showSettings
            ? `Jag får barnen på ${weekDaysLang[startOfWeek]} ${
                weekType === WeekTypes.Even ? "jämna" : "udda"
              } veckor`
            : "Stäng"}
          <AngleDownIcon color="#FFFFFF" size="16" />
        </div>
      </SettingsBox>
      {/* <DateSelector date={checkDate} setDate={setCheckDate} /> */}
      {/* <ResultMessage selectedWeek={selectedWeek} haveKids={haveKids} /> */}
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
