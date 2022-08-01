import { Card, Image, Typography } from "antd";
import React, { FC } from "react";
import { AnalyticsCardTypes } from "../../../lib/types/pageTypes/Analytics/AnalyticsCardTypes";

const { Text } = Typography;

const MediumCard: FC<AnalyticsCardTypes> = ({ title, subTitle, count }) => {
  return (
    <Card
      className="radius4"
      headStyle={{ border: "none", marginBottom: "0" }}
      bodyStyle={{ padding: "0 24px 24px 24px" }}
      style={{ width: "auto" }}
      title={<Text className="normalText">{title}</Text>}
      extra={
        <Image
          width={18}
          src="/icons/more_vert_FILL0_wght400_GRAD0_opsz48.svg"
          preview={false}
          alt=""
        />
      }
    >
      <Text className="text-2xl font-semibold block yellow mb-3">{count}</Text>
      <Text className="captionText">{subTitle}</Text>
    </Card>
  );
};

export default MediumCard;
