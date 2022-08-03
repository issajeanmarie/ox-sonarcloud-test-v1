import { Col } from "antd";
import React, { FC } from "react";
import { CardColWrapperTypes } from "../../../lib/types/pageTypes/Analytics/CardColWrapperTypes";

const CardColWrapper: FC<CardColWrapperTypes> = ({ children, active }) => {
  return <Col flex={`${active === "KPIs" ? "none" : "auto"}`}>{children}</Col>;
};

export default CardColWrapper;
