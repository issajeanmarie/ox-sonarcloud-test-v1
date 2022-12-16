import { LS_MENU_FOLDED } from "../config/constants";

/**
 * Handle all localStorage operations here
 * @author Issa Jean Marie <jeanmarieissa@gmail.com>
 * @since 20 May 2022
 */

type Types = {
  name: string;
  value: any;
};

type SetMenuFoldTypes = {
  menuFold?: boolean;
};

export const setMenuFold = ({ menuFold }: SetMenuFoldTypes) =>
  localStorage.setItem(LS_MENU_FOLDED, JSON.stringify(menuFold));

export const getMenuFold = () => {
  const status = localStorage.getItem(LS_MENU_FOLDED);
  return status && status !== undefined ? JSON.parse(status) : null;
};

export const saveToLocal = ({ name, value }: Types) => {
  try {
    localStorage.setItem(name, JSON.stringify(value));
  } catch (err) {
    return "Can't save to local storage";
  }
};

export const getFromLocal = (name: string) => {
  const value = localStorage.getItem(name);

  return value ? JSON.parse(value) : null;
};

export const removeFromLocal = (name: string) => {
  localStorage.removeItem(name);
};
