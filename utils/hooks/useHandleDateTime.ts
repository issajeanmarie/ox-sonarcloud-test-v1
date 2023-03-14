import { useEffect, useState } from "react";
import { ErrorMessage } from "../../components/Shared/Messages/ErrorMessage";
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

      if (res?.date_time_ymd) {
        setClock({
          date: res?.date_time_ymd,
          setClockNotification: !isTimeAccurate
        });
      } else {
        ErrorMessage(
          "We can't fetch accurate time from online, please check if your date and time is accurate!"
        );
      }
    });
  };

  useEffect(() => {
    updateState();
  }, []);

  return { clock };
};
