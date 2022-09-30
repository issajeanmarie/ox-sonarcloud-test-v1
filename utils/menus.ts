/* eslint-disable @typescript-eslint/no-explicit-any */
import { routes } from "../config/route-config";

const user: any = {};

export const analyticsMenu = (active = "", depotName = "") => {
  const menus: any = [
    {
      name: "TRUCKS",
      url: `${routes.Analytics.url}?depotId=${"depotID" || ""}&depotName=${
        depotName || ""
      }`,
      active: false
    },
    {
      name: "REVENUE",
      url: `${routes.Revenue.url}?depotId=${"depotID" || ""}&depotName=${
        depotName || ""
      }`,
      active: false
    },
    {
      name: "MAP",
      url: `${routes.Map.url}?depotId=${"depotID" || ""}&depotName=${
        depotName || ""
      }`,
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
