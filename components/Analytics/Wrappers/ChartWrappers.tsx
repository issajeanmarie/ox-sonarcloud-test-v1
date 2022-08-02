import React, { FC } from "react";
import { ChildrenType } from "../../../lib/types/components/ChildrenType";

export const MediumChartWrapper: FC<ChildrenType> = ({ children }) => {
  return (
    <div
      style={{
        background: "#ffffff",
        width: "100%",
        height: "45vh",
        padding: "0.5rem 2rem",
        borderRadius: "4px",
        boxShadow: "0px 0px 19px #00000008"
      }}
    >
      <div style={{ height: "80%", width: "100%" }}>{children}</div>
    </div>
  );
};

export const SmallChartWrapper: FC<ChildrenType> = ({ children }) => {
  return (
    <div
      style={{
        background: "#ffffff",
        width: "100%",
        height: "30vh",
        padding: "2rem",
        borderRadius: "4px",
        boxShadow: "0px 0px 19px #00000008"
      }}
    >
      <div style={{ height: "100%", width: "100%" }}>{children}</div>
    </div>
  );
};
