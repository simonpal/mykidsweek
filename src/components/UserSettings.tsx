import React, { useState } from "react";
import styled from "styled-components";
import { WeekTypes } from "../App";
import { weekDaysLang } from "../utils";
import AngleDownIcon from "./AngleDownIcon";
import { WeekDay, WeekDaySelector } from "./WeekDaySelector";
import WeekTypeSelector from "./WeekTypeSelector";

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

interface UserSettingsProps {
  handleDayChange: (day: WeekDay) => void;
  handleWeekChange: (week: WeekTypes) => void;
  startOfWeek: WeekDay;
  weekType: WeekTypes;
}

export const UserSettings: React.FC<UserSettingsProps> = ({
  handleDayChange,
  startOfWeek,
  weekType,
  handleWeekChange,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  return (
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
  );
};
