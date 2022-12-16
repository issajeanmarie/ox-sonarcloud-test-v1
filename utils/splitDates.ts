export const splitDates = (date?: string | number | null) => ({
  currentYear: date ? new Date(date).getFullYear() : new Date().getFullYear(),
  currentMonth: date ? new Date(date).getMonth() : new Date().getMonth(),
  currentDate: date ? new Date(date).getDate() : new Date().getDate(),
  currentHour: date ? new Date(date).getHours() : new Date().getHours(),
  currentMinute: date ? new Date(date).getMinutes() : new Date().getMinutes(),
  currentSecond: date ? new Date(date).getSeconds() : new Date().getSeconds()
});
