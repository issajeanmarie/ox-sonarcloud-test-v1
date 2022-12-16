interface Props {
  currentYear: number;
  currentMonth: number;
  currentDate: number;
  currentHour: number;
  currentMinute: number;
  currentSecond: number;
}

export const toNewDate = (date: Props) => {
  return new Date(
    date.currentYear,
    date.currentMonth,
    date.currentDate,
    date.currentHour,
    date.currentMinute,
    date.currentSecond
  );
};
