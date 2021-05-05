import React, { useEffect, useState } from "react";
import getISOWeek from "date-fns/getISOWeek";
import DateSelector from "./components/DateSelector";
import styled from "styled-components";
import WeekTypeSelector from "./components/WeekTypeSelector";
import ResultMessage from "./components/ResultMessage";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: "center";
`;

enum WeekTypes {
  Even = "even",
  Odd = "odd",
}

function App() {
  const localSetting = localStorage.getItem("weekType") as WeekTypes;
  const [weekType, setWeekType] = useState<WeekTypes>(
    localSetting || WeekTypes.Even
  );
  const [checkDate, setCheckDate] = useState<Date>(new Date());
  const [haveKids, setHaveKids] = useState<boolean>(false);
  const [selectedWeek, setSelectedWeek] = useState<number>(
    getISOWeek(new Date())
  );

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

      <WeekTypeSelector
        isEven={weekType === WeekTypes.Even}
        handleWeekChange={handleWeekChange}
      />
      <DateSelector date={checkDate} setDate={setCheckDate} />
      <ResultMessage selectedWeek={selectedWeek} haveKids={haveKids} />
    </AppWrapper>
  );
}

export default App;
