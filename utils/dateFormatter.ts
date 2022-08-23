import moment from "moment";

export const dateFormatterNth = (date: string) => {
  return moment(date).format("Do MMM YYYY");
};
