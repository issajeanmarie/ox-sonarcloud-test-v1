import { Card, Progress, Typography } from "antd";
import React, { FC } from "react";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import { SmallSpinLoader } from "../../Shared/Loaders/Loaders";

const { Text } = Typography;

type AnalyticKPIsCardTypes = {
  title: string;
  amount1: number;
  amount2: number;
  percentage: number;
  traveled: string;
  isFetching: boolean;
};

const LargeCard: FC<AnalyticKPIsCardTypes> = ({
  title,
  amount1,
  amount2,
  percentage,
  traveled,
  isFetching
}) => {
  return (
    <Card
      className="radius4 shadow-[0px_0px_19px_#00000008]"
      headStyle={{ border: "none", marginBottom: "0" }}
      bodyStyle={{ padding: "0 24px 24px 24px" }}
      style={{
        minWidth: "400px",
        border: "1px solid #EAEFF2",
        minHeight: "170px"
      }}
      title={<Text className="text-base font-light">{title}</Text>}
    >
      <div className="py-2">
        {isFetching ? (
          <SmallSpinLoader />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 flex-nowrap text-sm">
                <span className="font-bold">
                  {amount1 && numbersFormatter(amount1)} Rwf{" "}
                </span>
                <span>of {amount2 && numbersFormatter(amount2)} Rwf</span>
              </div>
              <span className="captionText">{percentage} Reached</span>
            </div>
            <Progress percent={percentage} showInfo={false} />
            <span className="italic text-sm">{traveled}</span>
          </>
        )}
      </div>
    </Card>
  );
};

export default LargeCard;
