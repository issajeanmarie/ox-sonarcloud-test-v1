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
          ? "83vh"
          : navType === "DOUBLE"
          ? "75vh"
          : navType === "TRIPLE"
          ? "46vh"
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
