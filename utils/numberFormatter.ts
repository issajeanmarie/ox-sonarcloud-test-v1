export const localeString = (number?: number) => {
  return number?.toLocaleString("Us") || "--";
};
