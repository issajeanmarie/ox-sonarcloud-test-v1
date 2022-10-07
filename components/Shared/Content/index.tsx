import React, { FC } from "react";
import { ContentTypes } from "../../../lib/types/content";
import { classes } from "../../../config/constants";

const Content: FC<ContentTypes> = ({
  navType = "CENTER" || "FULL" || "DOUBLE" || "TRIPLE",
  children,
  className
}) => (
  <div
    style={{
      height:
        navType === "CENTER"
          ? "84vh"
          : navType === "DOUBLE"
          ? "75vh"
          : navType === "TRIPLE"
          ? "46vh"
          : "86vh"
    }}
    className={`${classes.content_section} ${className || ""}`}
  >
    {children}
  </div>
);

export default Content;
