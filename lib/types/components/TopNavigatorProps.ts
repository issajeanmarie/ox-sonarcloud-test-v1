/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header_Links } from "../links";

export type date = {
  dateStringTwo: string;
};

export interface TopNavigatorProps {
  headerLinks: Header_Links[];
  setActive: (menu: string) => void;
  active: string;
  toggleActiveHandler: (menuID: string) => void;
  onStartDateChange: (_: string, date: string) => void;
  onEndDateChange: (_: string, date: string) => void;
  selectedDay?: any;
  setselectedDay?: any;
  isDateCustom?: boolean;
  setIsDateCustom?: any;
  daysList?: any;
  selectedDepot?: any;
  setSelectedDepot?: any;
}
