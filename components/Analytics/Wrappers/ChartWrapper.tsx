import React, { FC } from "react";
import { ChildrenType } from "../../../lib/types/components/ChildrenType";

const ChartWrapper: FC<ChildrenType> = ({ children }) => {
  return (
    <div
      style={{
        background: "#ffffff",
        width: "100%",
        height: "50vh",
        padding: "0.5rem 2rem",
        borderRadius: "4px",
        boxShadow: "-3px 2px 8px #0000000D"
      }}
    >
      <div style={{ height: "80%", width: "100%" }}>{children}</div>
    </div>
  );
};

export default ChartWrapper;
