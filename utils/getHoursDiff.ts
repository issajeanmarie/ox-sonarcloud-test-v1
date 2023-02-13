const getHoursDiff = (startDate: any, endDate: any) => {
  const msInHour = 1000 * 60 * 60;

  return Math.round(Math.abs(endDate - startDate) / msInHour);
};

export default getHoursDiff;

export const getTimeDiff = (startDate: any, endDate: any) => {
  return Math.round(Math.abs(endDate - startDate));
};

export const msToTime = (ms: number) => {
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 3600 * 24));

  hours = hours < 10 ? 0 + hours : hours;
  minutes = minutes < 10 ? 0 + minutes : minutes;
  seconds = seconds < 10 ? 0 + seconds : seconds;

  return { hours, minutes, seconds, days };
};
