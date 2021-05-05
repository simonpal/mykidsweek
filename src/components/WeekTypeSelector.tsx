import React from "react";
import styled from "styled-components";

const WeekSelector = styled.div<Partial<WeekTypeSelectorProps>>`
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.textColor};
  padding: 2px;
  display: flex;
  flex-direction: row;
  position: relative;
  width: 400px;
  max-width: 100%;
  height: 3rem;
  border-radius: 6px;
  > div {
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
    content: "";
    height: calc(100% - 6px);
    border-radius: 6px;
    z-index: 0;
    display: inline-flex;
    position: absolute;
    transition: all 0.3s cubic-bezier(0.17, 0.67, 0.45, 1.09);
    top: 3px;
    width: 50%;
    left: ${({ isEven }) => (isEven ? "3px" : "calc(50% - 3px)")};
    background: ${({ theme }) => theme.colors.primary};
  }
`;

interface WeekTypeSelectorProps {
  handleWeekChange: (e: any) => void;
  isEven: boolean;
}

const WeekTypeSelector = ({
  handleWeekChange,
  isEven,
}: WeekTypeSelectorProps) => {
  return (
    <>
      <h4>Min vecka:</h4>
      <WeekSelector isEven={isEven}>
        <div>
          <label htmlFor="even">Jämn</label>
          <input
            type="radio"
            name="weektype"
            id="even"
            defaultChecked={isEven}
            onChange={handleWeekChange}
          />
        </div>
        <div>
          <label htmlFor="odd">Udda</label>
          <input
            type="radio"
            name="weektype"
            id="odd"
            defaultChecked={!isEven}
            onChange={handleWeekChange}
          />
        </div>
      </WeekSelector>
    </>
  );
};

export default WeekTypeSelector;
