import React, { FC } from "react";
import { ChildrenType } from "../../../../lib/types/components/ChildrenType";

const TopNavigatorRightSideWrapper: FC<ChildrenType> = ({ children }) => {
  return <div className="flex items-center gap-5">{children}</div>;
};

export default TopNavigatorRightSideWrapper;
