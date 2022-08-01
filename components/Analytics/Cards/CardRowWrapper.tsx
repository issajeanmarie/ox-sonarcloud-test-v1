import { Row } from "antd";
import React, { FC } from "react";
import { ChildrenType } from "../../../lib/types/components/ChildrenType";

const CardRowWrapper: FC<ChildrenType> = ({ children }) => {
  return <Row className="flex justify-between py-5 gap-5">{children}</Row>;
};

export default CardRowWrapper;
