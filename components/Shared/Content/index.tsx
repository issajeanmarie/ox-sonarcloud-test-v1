import React, { FC } from "react";
import { ContentTypes } from "../../../lib/types/content";
import { classes } from "../../../config/constants";

const Content: FC<ContentTypes> = ({
  navType = "CENTER" || "FULL",
  children,
  className
}) => (
  <div
    className={`h-[${navType === "CENTER" ? "84vh" : "86vh"}] ${
      classes.content_section
    } ${className || ""}`}
  >
    {children}
  </div>
);

export default Content;
