import { routes } from "../config/route-config";

const user = {};

export const analyticsMenu = (active = "", depotName = "") => {
  const menus = [
    {
      name: "TRUCKS",
      url: `${routes.Analytics.url}?depotId=${"depotID" || ""}&depotName=${
        depotName || ""
      }`,
      active: false
    },
    {
      name: "REVENUES",
      url: `${routes.Revenues.url}?depotId=${"depotID" || ""}&depotName=${
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

  const filteredMenu = menus.filter((menu) => {
    if (user.isDispatcher) {
      return menu.name !== "MAP" && menu.name !== "REVENUES";
    }
    return menu;
  });

  const activatedMenu = filteredMenu.map((menu) => {
    if (menu.name === active) {
      return { ...menu, active: true };
    }
    return menu;
  });

  return activatedMenu;
};
