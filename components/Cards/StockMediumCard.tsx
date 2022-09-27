import { Card, Image, Typography } from "antd";
import React, { FC } from "react";
import { numbersFormatter } from "../../helpers/numbersFormatter";
import { SmallSpinLoader } from "../Shared/Loaders/Loaders";

const { Text } = Typography;

type StockMediumCardTypes = {
  title: string;
  subTitle: string;
  count: number;
  isFetching: boolean;
};

const StockMediumCard: FC<StockMediumCardTypes> = ({
  title,
  subTitle,
  count,
  isFetching
}) => {
  return (
    <Card
      className="radius4 shadow-[0px_0px_19px_#00000008]"
      headStyle={{ border: "none", marginBottom: "0" }}
      bodyStyle={{ padding: "0 24px 24px 24px" }}
      style={{ width: "auto", border: "1px solid #EAEFF2" }}
      title={<Text className="text-base font-light">{title}</Text>}
      extra={
        <Image
          width={18}
          src="/icons/more_vert_FILL0_wght400_GRAD0_opsz48.svg"
          preview={false}
          alt=""
        />
      }
    >
      <Text className="text-2xl font-semibold block yellow mb-3">
        {isFetching ? (
          <SmallSpinLoader />
        ) : (
          <>{count !== null ? <>{numbersFormatter(count)} KGS</> : "None"}</>
        )}
      </Text>
      <Text className="captionText">
        {isFetching ? `Hold on, getting you ${title}...` : subTitle}
      </Text>
    </Card>
  );
};

export default StockMediumCard;
