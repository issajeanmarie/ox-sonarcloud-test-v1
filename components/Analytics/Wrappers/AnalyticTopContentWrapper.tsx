import React, { FC } from "react";
import { ChildrenType } from "../../../lib/types/components/ChildrenType";

const AnalyticTopContentWrapper: FC<ChildrenType> = ({ children }) => {
  return (
    <div className="bg-ox-white sticky top-[3.60rem] z-10">{children}</div>
  );
};

export default AnalyticTopContentWrapper;
