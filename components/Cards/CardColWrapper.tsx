import { Col } from "antd";
import React, { FC } from "react";
import { CardColWrapperTypes } from "../../lib/types/components/Cards/CardColWrapperTypes";

type CardMoreStockColWrapperTypes = {
  children: React.ReactNode;
};

const CardColWrapper: FC<CardColWrapperTypes> = ({ children, cardsNumber }) => {
  return (
    <Col
      className="w-[270px]"
      flex={`${cardsNumber && cardsNumber >= 5 ? "auto" : "none"}`}
    >
      {children}
    </Col>
  );
};

export const CardMoreStockColWrapper: FC<CardMoreStockColWrapperTypes> = ({
  children
}) => {
  return (
    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
      {children}
    </Col>
  );
};

export default CardColWrapper;
