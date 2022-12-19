import React, { FC } from "react";
import { ChildrenType } from "../../../lib/types/components/ChildrenType";

const RowsWrapper: FC<ChildrenType> = ({ children }) => {
  return <div className="py-[4px]">{children}</div>;
};

export default RowsWrapper;
