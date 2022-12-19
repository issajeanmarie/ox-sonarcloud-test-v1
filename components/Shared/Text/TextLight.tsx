import { FC, ReactNode } from "react";
import { classes } from "../../../config/constants";

type Props = {
  children: ReactNode;
  uppercase?: boolean | undefined;
  className?: string | undefined;
};

const TextLight: FC<Props> = ({ children, uppercase, className }) => {
  return (
    <p
      className={`${classes.text.text_light} ${uppercase ? "uppercase" : ""} ${
        className || ""
      }`}
    >
      {children}
    </p>
  );
};

export default TextLight;
