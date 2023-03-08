import { useEffect, useState } from "react";
import { clientTime, timeZone } from "../../config/constants";
import clockIsSEt from "../../helpers/clockIsSet";
import { getTimeFromOnline } from "../../helpers/getTimeFromOnline";

export const useHandleDateTime = () => {
  const [clock, setClock] = useState({
    setClockNotification: false,
    date: ""
  });

  const updateState = () => {
    getTimeFromOnline(timeZone).then((res) => {
      const { isTimeAccurate } = clockIsSEt({
        clientTime,
        onlineTime: res?.date_time_ymd
      });

      setClock({
        date: res?.date_time_ymd,
        setClockNotification: !isTimeAccurate
      });
    });
  };

  useEffect(() => {
    updateState();
  }, []);

  return { clock };
};
