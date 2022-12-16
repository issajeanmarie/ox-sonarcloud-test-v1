import { FC, ReactNode } from "react";
import { classes } from "../../../config/constants";

type Props = {
  children: ReactNode;
  uppercase?: boolean | undefined;
  className?: string | undefined;
};

const Heading1: FC<Props> = ({ children, uppercase, className }) => {
  return (
    <span
      className={`${classes.text.h1} ${uppercase ? "uppercase" : ""} ${
        className || ""
      }`}
    >
      {children}
    </span>
  );
};

export default Heading1;
