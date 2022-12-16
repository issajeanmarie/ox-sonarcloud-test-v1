/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header_Links } from "../links";

export interface AllAccountsTopNavigatorProps {
  headerLinks: Header_Links[];
  setActive: (menu: string) => void;
  active: string;
  toggleActiveHandler: (menuID: string) => void;
}
