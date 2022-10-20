import { Header_Links } from "../../links";

export type AnalyticsTopNavigatorProps = {
  headerLinks: Header_Links[];
  setActive: (menu: string) => void;
  toggleActiveHandler: (menuID: string) => void;
  onStartDateChange: (_: string, date: string) => void;
  onEndDateChange: (_: string, date: string) => void;
  selectedDay?: any;
  setSelectedDay?: any;
  isDateCustom?: boolean;
  setIsDateCustom?: any;
  daysList?: any;
  selectedDepot?: any;
  setSelectedDepot?: any;
};
