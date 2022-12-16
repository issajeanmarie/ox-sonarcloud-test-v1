// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const datesCompare = (date: any) => {
  const currentDate = new Date().getDate();

  if (currentDate >= date) {
    return false;
  } else {
    return true;
  }
};
