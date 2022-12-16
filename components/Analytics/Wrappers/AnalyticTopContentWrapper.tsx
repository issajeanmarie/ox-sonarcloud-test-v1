import React, { FC } from "react";
import { AnalyticTopContentWrapperTypes } from "../../../lib/types/pageTypes/Analytics/AnalyticTopContentWrapperTypes";

const AnalyticTopContentWrapper: FC<AnalyticTopContentWrapperTypes> = ({
  children,
  active
}) => {
  return (
    <div
      className={`bg_light_white  ${
        active === "TRUCKS" && "sticky top-[0rem] z-10"
      } `}
    >
      {children}
    </div>
  );
};

export default AnalyticTopContentWrapper;
