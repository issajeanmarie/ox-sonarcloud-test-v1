import { ReactElement } from "react";

export type NavbarTypes = {
  LeftSide: ReactElement;
  RightSide?: ReactElement;
  type: string;
};

export type ContentTypes = {
  children: ReactElement;
  navType?: "CENTER" | "FULL" | "DOUBLE" | "TRIPLE";
  className?: string | undefined;
  isOverflowHidden: boolean;
};
