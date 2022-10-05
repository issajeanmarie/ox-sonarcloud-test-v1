import React, { FC } from "react";
import { ContentTypes } from "../../../lib/types/content";
import { classes } from "../../../config/constants";

const Content: FC<ContentTypes> = ({
  navType = "CENTER" || "FULL",
  children,
  className
}) => {
  const static_height = navType === "CENTER" ? "83vh" : "85vh";

  return (
    <div
      className={`h-[${static_height}] ${classes.content_section} ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Content;
