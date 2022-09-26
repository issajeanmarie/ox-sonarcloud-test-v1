import { SetStateAction } from "react";

type DefaultTypes = {
  name: string;
  id: number;
};

export type DropDownSelectorTypes = {
  dropDownContent: any;
  defaultSelected: DefaultTypes | any;
  setDefaultSelected: React.Dispatch<SetStateAction<object>>;
  label: string;
};
