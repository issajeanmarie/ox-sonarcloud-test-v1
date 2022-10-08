/* eslint-disable @typescript-eslint/no-explicit-any */
import { routes } from "../config/route-config";

const user: any = {};

export const analyticsMenu = (active = "") => {
  const menus: any = [
    {
      name: "TRUCKS",
      url: `${routes.Analytics.url}`,
      active: false
    },
    {
      name: "REVENUE",
      url: `${routes.Revenue.url}`,
      active: false
    },
    {
      name: "MAP",
      url: `${routes.Map.url}`,
      active: false
    }
  ];

  const filteredMenu = menus.filter((menu: any) => {
    if (user.isDispatcher) {
      return menu.name !== "MAP" && menu.name !== "REVENUE";
    }
    return menu;
  });

  const activatedMenu = filteredMenu.map((menu: any) => {
    if (menu.name === active) {
      return { ...menu, active: true };
    }
    return menu;
  });

  return activatedMenu;
};
