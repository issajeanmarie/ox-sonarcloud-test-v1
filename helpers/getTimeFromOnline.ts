import { TIME_API_KEY } from "../config/constants";

export const getTimeFromOnline = async (timeZone: string) => {
  const response = await fetch(
    `https://api.ipgeolocation.io/timezone?apiKey=${TIME_API_KEY}&tz=${timeZone}`
  );

  const dateAndTime = await response.json();

  return dateAndTime;
};
