import { Col } from "antd";
import React, { FC } from "react";
import { CardColWrapperTypes } from "../../lib/types/components/Cards/CardColWrapperTypes";

type CardMoreStockColWrapperTypes = {
  children: React.ReactNode;
};

const CardColWrapper: FC<CardColWrapperTypes> = ({ children, active }) => {
  return (
    <Col flex={`${active === "KPIs" || active === "KPIs" ? "none" : "auto"}`}>
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
