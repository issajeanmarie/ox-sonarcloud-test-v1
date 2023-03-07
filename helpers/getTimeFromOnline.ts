export const useNowTime = async () => {
  const response = await fetch(
    "http://worldtimeapi.org/api/timezone/Africa/Kigali"
  );

  const dateAndTime = await response.json();

  return dateAndTime;
};
