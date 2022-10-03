import React, { FC } from "react";
import { ContentTypes } from "../../../lib/types/content";
import { classes } from "../../../config/constants";

const Content: FC<ContentTypes> = ({
  navType = "CENTER" || "FULL",
  children
}) => {
  const static_height = navType === "CENTER" ? "83vh" : "10vh";

  return (
    <div
      className={`h-[${static_height}] ${classes.content_section}  w-["100vw"}]`}
    >
      {children}
    </div>
  );
};

export default Content;
