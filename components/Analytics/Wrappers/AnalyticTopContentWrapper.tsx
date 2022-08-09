import React, { FC } from "react";
import { AnalyticTopContentWrapperTypes } from "../../../lib/types/pageTypes/Analytics/AnalyticTopContentWrapperTypes";

const AnalyticTopContentWrapper: FC<AnalyticTopContentWrapperTypes> = ({
  children,
  active
}) => {
  return (
    <div
      className={`bg_light_white  ${
        active === "trucks" && "sticky top-[4rem] z-10"
      } `}
    >
      {children}
    </div>
  );
};

export default AnalyticTopContentWrapper;
