import React, { FC } from "react";
import { ContentTypes } from "../../../lib/types/content";
import { classes } from "../../../config/constants";

const Content: FC<ContentTypes> = ({
  navType = "CENTER" || "FULL" || "DOUBLE" || "TRIPLE",
  children,
  className,
  isOverflowHidden
}) => (
  <div
    style={{
      height:
        navType === "CENTER"
          ? "81vh"
          : navType === "DOUBLE"
          ? "74vh"
          : navType === "TRIPLE"
          ? "38vh"
          : "86vh"
    }}
    className={`${classes.content_section} ${
      isOverflowHidden && classes.overflowHidden
    } ${className || ""}`}
  >
    {children}
  </div>
);

export default Content;
