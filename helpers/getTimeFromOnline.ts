export const getTimeFromOnline = async (timeZone: string) => {
  const response = await fetch(
    `http://worldtimeapi.org/api/timezone/${timeZone}`
  );

  const dateAndTime = await response.json();

  return dateAndTime;
};
