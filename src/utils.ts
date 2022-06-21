import { addDays, isWithinInterval } from "date-fns";
import { getISOWeek } from "date-fns/esm";
import moment from "moment";
import { WeekTypes } from "./App";
import { WeekDay } from "./components/WeekDaySelector";

function getDates(startDate: Date, stopDate: Date) {
  const dateArray = [];
  let _currentDate = moment(startDate);
  const _stopDate = moment(stopDate);
  while (_currentDate <= _stopDate) {
    dateArray.push(moment(_currentDate).toDate());
    _currentDate = moment(_currentDate).add(1, "days");
  }
  return dateArray;
}

// type MonthInWeeks = {
//   [key: string]: Date[];
// };

// const splitMonthsIntoWeeks = (arr: Date[]): MonthInWeeks => {
//   return arr.reduce((acc: MonthInWeeks, curr: Date) => {
//     const week = getISOWeek(curr);
//     return {
//       ...acc,
//       [`week-${week}`]: [...(acc?.[`week-${week}`] || []), curr],
//     };
//   }, {});
// };

// const getWeeklyRange = (startDate: Date): Date[] => {
//   return getDates(startDate, addDays(startDate, 7));
// };

const isPickupWeek = (weekType: WeekTypes, nr: number) => {
  const evenWeeks = weekType === WeekTypes.Even;
  return evenWeeks ? nr % 2 === 0 : nr % 2 !== 0;
};

// interface WeekDay2 {
//     day: number;
//     name: string;
// }

// const days = {
//     0: 'Sunday',
//     1: 'Monday'
// }

const weekDays: WeekDay[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface Event {
  start: Date;
  end: Date;
  title: string;
}

export const getMonthlyEvents = (
  startDate = new Date(),
  endDate = new Date(),
  weekType: WeekTypes,
  weekDay: WeekDay
) => {
  //   const start = startOfMonth(defaultDate);
  //   const end = endOfMonth(defaultDate);
  let datesArr = getDates(startDate, endDate);

  const startDayIndex = weekDays.indexOf(weekDay);

  let realEvents: Event[] = [];
  datesArr.forEach((date: Date) => {
    if (
      !realEvents.some((ev) => {
        return isWithinInterval(date, { start: ev.start, end: ev.end });
      })
    ) {
      const week = getISOWeek(date);
      if (isPickupWeek(weekType, week) && date.getDay() === startDayIndex) {
        realEvents.push({ start: date, end: addDays(date, 7), title: "Barn" });
      }
    }
  });
  return realEvents;
};
