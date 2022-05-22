import { LS_MENU_FOLDED } from "../config/constants";

/**
 * Handle all localStorage operations here
 * @author Issa Jean Marie <jeanmarieissa@gmail.com>
 * @since 20 May 2022
 */

type Types = {
  menuFold: boolean;
};

export const setMenuFold = ({ menuFold }: Types) =>
  localStorage.setItem(LS_MENU_FOLDED, JSON.stringify(menuFold));

export const getMenuFold = () => {
  const status = localStorage.getItem(LS_MENU_FOLDED);
  return status && status !== undefined ? JSON.parse(status) : null;
};
