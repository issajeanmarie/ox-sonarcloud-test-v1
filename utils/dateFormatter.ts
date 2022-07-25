import moment from "moment";

export const dateFormatterNth = (date: string) => {
  return moment(date).format("Do MMMM YYYY");
};
