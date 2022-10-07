import React, { FC } from "react";
import { ContentTypes } from "../../../lib/types/content";
import { classes } from "../../../config/constants";

const Content: FC<ContentTypes> = ({
  navType = "CENTER" || "FULL" || "MULTIPLE",
  children,
  className
}) => (
  <div
    style={{
      height:
        navType === "CENTER" ? "84vh" : navType === "MULTIPLE" ? "75vh" : "86vh"
    }}
    className={`${classes.content_section} ${className || ""}`}
  >
    {children}
  </div>
);

export default Content;
