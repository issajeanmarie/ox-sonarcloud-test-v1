interface Props {
  onlineTime: Date;
  clientTime: Date;
}

const clockIsSEt = ({ onlineTime, clientTime }: Props) => {
  const onlineTimeToString = new Date(onlineTime);
  const clientTimeToString = new Date(clientTime);

  const onlineTimeMonth = onlineTimeToString.getMonth() + 1;
  const onlineTimeDate = onlineTimeToString.getDate();
  const onlineTimeHours = onlineTimeToString.getHours();
  const onlineTimeMinutes = onlineTimeToString.getMinutes();

  const clientTimeMonth = clientTimeToString.getMonth() + 1;
  const clientTimeDate = clientTimeToString.getDate();
  const clientTimeHours = clientTimeToString.getHours();
  const clientTimeMinutes = clientTimeToString.getMinutes();

  const onlineTimeDetails = {
    year: onlineTimeToString.getFullYear(),
    month: `${onlineTimeMonth < 10 ? `0${onlineTimeMonth}` : onlineTimeMonth}`,
    date: `${onlineTimeDate < 10 ? `0${onlineTimeDate}` : onlineTimeDate}`,
    hours: `${onlineTimeHours < 10 ? `0${onlineTimeHours}` : onlineTimeHours}`,
    minutes: `${
      onlineTimeMinutes < 10 ? `0${onlineTimeMinutes}` : onlineTimeMinutes
    }`
  };

  const clientTimeDetails = {
    year: clientTimeToString.getFullYear(),
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
    isTimeAccurate: String(onlineTimeStamp) === String(clientTimeStamp)
  };
};

export default clockIsSEt;
