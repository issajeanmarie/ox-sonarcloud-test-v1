import { ReactElement } from "react";

export type NavbarTypes = {
  LeftSide: ReactElement;
  RightSide?: ReactElement;
  type: string;
};

export type ContentTypes = {
  children: ReactElement;
  navType?: string | undefined;
  className?: string | undefined;
  isOverflowHidden: boolean;
};
