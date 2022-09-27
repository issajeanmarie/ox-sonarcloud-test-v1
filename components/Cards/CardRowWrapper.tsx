import { Row } from "antd";
import React, { FC } from "react";
import { CardRowWrapperTypes } from "../../lib/types/components/Cards/CardRowWrapperTypes";

const CardRowWrapper: FC<CardRowWrapperTypes> = ({ children, active }) => {
  return (
    <Row
      className={`flex ${
        active !== "KPIs" ? "justify-between" : "justify-start"
      }  py-5 gap-5`}
    >
      {children}
    </Row>
  );
};

export default CardRowWrapper;
