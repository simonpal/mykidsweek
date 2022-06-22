import React from "react";
import styled from "styled-components";

interface ButtonProps {
  selected: boolean;
}

const DayButton = styled.button<ButtonProps>`
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : "transparent"};
  color: ${({ theme }) => theme.colors.textColor};
  border-color: ${({ theme }) => theme.colors.primary};
  margin: 0.25rem;
  padding: 0.5rem;
  border-radius: 2rem;
  border-width: 1px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const DayWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 1rem;
  justify-content: center;
`;

export type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

const weekDays: WeekDay[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface Props {
  weekDay: WeekDay;
  onChange: (day: WeekDay) => void;
}
export const WeekDaySelector = ({ weekDay, onChange }: Props) => {
  return (
    <DayWrapper>
      {weekDays.map((d: WeekDay) => (
        <DayButton key={d} selected={weekDay === d} onClick={() => onChange(d)}>
          {d}
        </DayButton>
      ))}
    </DayWrapper>
  );
};
