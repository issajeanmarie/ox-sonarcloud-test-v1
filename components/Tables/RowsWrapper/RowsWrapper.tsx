import React, { FC } from "react";
import { ChildrenType } from "../../../lib/types/components/ChildrenType";

const RowsWrapper: FC<ChildrenType> = ({ children }) => {
  return <div className="py-[-12px]">{children}</div>;
};

export default RowsWrapper;
