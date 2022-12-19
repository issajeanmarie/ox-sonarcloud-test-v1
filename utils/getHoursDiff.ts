const getHoursDiff = (startDate: any, endDate: any) => {
  const msInHour = 1000 * 60 * 60;

  return Math.round(Math.abs(endDate - startDate) / msInHour);
};

export default getHoursDiff;
