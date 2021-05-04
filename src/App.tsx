// import getWeek from 'date-fns/getWeek';
import getISOWeek from "date-fns/getISOWeek";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { registerLocale } from "react-datepicker";
import sv from "date-fns/locale/sv";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("sv", sv);

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: "center";
`;

const DateWrapper = styled.div`
  justify-content: center;
  width: 400px;
  max-width: 100%;
  margin: 2rem 0;
  .react-datepicker-wrapper {
    width: 100%;
    input {
      width: 100%;
      height: 3rem;
      border-radius: 0.25rem;
      border: 0;
      background-color: rgba(255, 255, 255, 0.8);
      padding: 0 1rem;
      line-height: 3rem;
      font-size: 1.5rem;
      transition: background-color 0.2s ease;
      &:focus {
        background-color: rgba(255, 255, 255, 1);
        outline: ${({ theme }) => `1px solid ${theme.colors.primary}`};
      }
    }
  }
`;

const WeekSelector = styled.div<WeekSelectorProps>`
  border: 2px solid rgba(255,255,255,0.2);
  color: ${({ theme }) => theme.colors.textColor};
  padding: 2px;
  display: flex;
  flex-direction: row;
  position: relative;
  width: 400px;
  max-width: 100%;
  height: 3rem;
  border-radius: 6px;
  >div {
    width: 50%;
    display: inline-flex;
    position: relative;
    z-index: 1;
    align-items: center;
    justify-content: center;
    input {
      display: none;
    }
    label {
      display: flex;
      width: 100%;
      text-align: center;
      cursor: pointer;
      justify-content: center;
    }
  }
  &:after {
    content: '';
    height: calc(100% - 6px);
    border-radius: 6px;
    z-index: 0;
    display: inline-flex;
    position: absolute;
    transition: all 0.3s cubic-bezier(.17,.67,.45,1.09);
    top: 3px;
    width: 50%;
    left: ${({ isEven }) => (isEven ? "3px" : "calc(50% - 3px)")};
    background: ${({ theme }) => theme.colors.primary};
  }
`;

interface WeekSelectorProps {
  isEven: boolean;
}

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
  const [selectedWeek, setSelectedWeek] = useState<number>(getISOWeek(new Date()));

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
      <h4>Min vecka:</h4>
      <WeekSelector isEven={weekType === WeekTypes.Even}>
        <div>
          <label htmlFor="even">Jämn</label>
          <input
            type="radio"
            name="weektype"
            id="even"
            defaultChecked={weekType === WeekTypes.Even}
            onChange={handleWeekChange}
          />
        </div>
        <div>
          <label htmlFor="odd">Udda</label>
          <input
            type="radio"
            name="weektype"
            id="odd"
            defaultChecked={weekType === WeekTypes.Odd}
            onChange={handleWeekChange}
          />
        </div>
      </WeekSelector>
      <DateWrapper>
        <DatePicker
          selected={checkDate}
          onChange={(date: Date) => date && setCheckDate(date)}
          locale={sv}
          dateFormat="dd-MM-yyyy"
        />
      </DateWrapper>
      {haveKids && <h3>Ja, du har barnen vecka {selectedWeek}!</h3>}
      {!haveKids && <h3>Nej, du har inte barnen vecka {selectedWeek}!</h3>}
    </AppWrapper>
  );
}

export default App;
