import Card from "antd/lib/card";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { FC, useEffect, useState } from "react";
import { getTimeDiff, msToTime } from "../../../utils/getHoursDiff";
import { toNewDate } from "../../../utils/toNewDate";
import { splitDates } from "../../../utils/splitDates";

interface Props {
  data: { profileInfo: any; name: string };
  truckId?: number | string;
}

const TimeOverviewCard: FC<Props> = ({ data }) => {
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    days: 0
  });

  const shiftStartingTime = splitDates(
    data?.profileInfo
      ? `${data?.profileInfo?.ongoingShift?.startDateTime}Z`
      : ""
  );

  useEffect(() => {
    const handleTimeCalculations = () => {
      const now = splitDates();

      const diff = getTimeDiff(toNewDate(shiftStartingTime), toNewDate(now));
      const res = msToTime(diff);

      setDuration(res);
    };

    const interval = setInterval(() => handleTimeCalculations(), 1000);

    return () => clearInterval(interval);
  }, [shiftStartingTime]);

  return (
    <Card className="radius4 overviewCard">
      <span className="block mb-2 text_ellipsis" title={data?.name}>
        {data?.name}
      </span>

      <Row align="middle" justify="space-between">
        <Col>
          {duration.days ? (
            <span className="text-sm text-gray-500 font-[400]">
              {duration.days > 1 ? `${duration.days} days` : duration.days} day
              and
            </span>
          ) : null}
          <span className="text-2xl font-semibold block red">
            {`${duration.hours} : ${duration.minutes} : ${duration.seconds} `}
          </span>
        </Col>
      </Row>
    </Card>
  );
};

export default TimeOverviewCard;
