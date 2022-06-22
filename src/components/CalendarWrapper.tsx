import React from "react";
import styled from "styled-components";

export const CalendarWrapper = styled.div`
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
