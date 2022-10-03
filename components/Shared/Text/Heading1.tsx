import { FC, ReactNode } from "react";
import { classes } from "../../../config/constants";

const Heading1: FC<ReactNode> = ({ children }) => {
  return <span className={classes.text.h1}>{children}</span>;
};

export default Heading1;
