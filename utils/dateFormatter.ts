import moment from "moment";
import { msToTime } from "./getHoursDiff";

export const dateFormatterNth = (date: string | Date) => {
  return moment(date).format("Do MMM YYYY");
};

export const dateFormatter = (date: string) => {
  return moment(date).format("DD MMM YYYY");
};

export const dateDisplay = (dateToConvert: Date | string) => {
  if (!dateToConvert) return;

  const now = new Date();
  const date = new Date(`${dateToConvert}`);

  const diff = now.getTime() - date.getTime();
  const { seconds, minutes, hours, days } = msToTime(diff);

  if (days > 7) {
    return dateFormatterNth(dateToConvert);
  } else if (days) {
    return `${days} ${days <= 1 ? "day" : "days"} ago`;
  } else if (hours) {
    return `${hours} ${hours <= 1 ? "hour" : "hours"} ago`;
  } else if (minutes) {
    return `${minutes} ${minutes <= 1 ? "minute" : "minutes"} ago`;
  } else if (seconds) {
    return `${seconds} ${seconds <= 1 ? "second" : "seconds"} ago`;
  }
};
