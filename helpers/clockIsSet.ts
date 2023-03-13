interface Props {
  onlineTime: Date;
  clientTime: Date;
}

const clockIsSEt = ({ onlineTime, clientTime }: Props) => {
  const onlineTimeMonth = new Date(onlineTime).getMonth() + 1;
  const onlineTimeDate = new Date(onlineTime).getDate();
  const onlineTimeHours = new Date(onlineTime).getHours();
  const onlineTimeMinutes = new Date(onlineTime).getMinutes();

  const clientTimeMonth = new Date(clientTime).getMonth() + 1;
  const clientTimeDate = new Date(clientTime).getDate();
  const clientTimeHours = new Date(clientTime).getHours();
  const clientTimeMinutes = new Date(clientTime).getMinutes();

  const onlineTimeDetails = {
    year: new Date(onlineTime).getFullYear(),
    month: `${onlineTimeMonth < 10 ? `0${onlineTimeMonth}` : onlineTimeMonth}`,
    date: `${onlineTimeDate < 10 ? `0${onlineTimeDate}` : onlineTimeDate}`,
    hours: `${onlineTimeHours < 10 ? `0${onlineTimeHours}` : onlineTimeHours}`,
    minutes: `${
      onlineTimeMinutes < 10 ? `0${onlineTimeMinutes}` : onlineTimeMinutes
    }`
  };

  const clientTimeDetails = {
    year: new Date(clientTime).getFullYear(),
    month: `${clientTimeMonth < 10 ? `0${clientTimeMonth}` : clientTimeMonth}`,
    date: `${clientTimeDate < 10 ? `0${clientTimeDate}` : clientTimeDate}`,
    hours: `${clientTimeHours < 10 ? `0${clientTimeHours}` : clientTimeHours}`,
    minutes: `${
      clientTimeMinutes < 10 ? `0${clientTimeMinutes}` : clientTimeMinutes
    }`
  };

  const onlineTimeStamp = new Date(
    `${onlineTimeDetails.year}-${onlineTimeDetails.month}-${onlineTimeDetails.date}T${onlineTimeDetails.hours}:${onlineTimeDetails.minutes}:00`
  );

  const clientTimeStamp = new Date(
    `${clientTimeDetails.year}-${clientTimeDetails.month}-${clientTimeDetails.date}T${clientTimeDetails.hours}:${clientTimeDetails.minutes}:00`
  );

  return {
    isTimeAccurate: onlineTime
      ? String(onlineTimeStamp) === String(clientTimeStamp)
      : true
  };
};

export default clockIsSEt;
