import { Col } from "antd";
import React, { FC } from "react";
import { ChildrenType } from "../../../lib/types/components/ChildrenType";

const CardColWrapper: FC<ChildrenType> = ({ children }) => {
  return <Col flex="auto">{children}</Col>;
};

export default CardColWrapper;
