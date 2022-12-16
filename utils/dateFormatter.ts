import moment from "moment";

export const dateFormatterNth = (date: string | Date) => {
  return moment(date).format("Do MMM YYYY");
};

export const dateFormatter = (date: string) => {
  return moment(date).format("DD MMM YYYY");
};
