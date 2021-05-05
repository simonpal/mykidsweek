import React from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { registerLocale } from "react-datepicker";
import sv from "date-fns/locale/sv";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("sv", sv);

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

interface DateProps {
  date: Date;
  setDate: (d: Date) => void;
}

const DateSelector = ({ date, setDate }: DateProps) => {
  return (
    <DateWrapper>
      <DatePicker
        selected={date}
        onChange={(date: Date) => date && setDate(date)}
        locale={sv}
        dateFormat="dd-MM-yyyy"
      />
    </DateWrapper>
  );
};

export default DateSelector;
