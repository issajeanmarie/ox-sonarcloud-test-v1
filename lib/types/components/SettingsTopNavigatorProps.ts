import { Header_Links } from "../links";

export type date = {
  dateStringTwo: string;
};

export interface SettingsTopNavigatorProps {
  headerLinks: Header_Links[];
  setActive: (menu: string) => void;
  active: string;
  toggleActiveHandler: (menuID: string) => void;
}
