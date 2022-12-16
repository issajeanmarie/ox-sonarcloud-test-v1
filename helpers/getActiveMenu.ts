import { routes } from "../config/route-config";

type Props = {
  menu: { url: string };
  router: any;
};

export const getActiveMenu = ({ menu, router }: Props) => {
  const isOrdersActive =
    (menu.url === routes.Orders.url && router.pathname === routes.Orders.url) ||
    (router.pathname.includes(routes.viewOrder.url) &&
      menu.url === routes.Orders.url);

  const isDifferentMenuActive =
    router.pathname.includes(menu.url) && menu.url !== routes.Orders.url;

  const activeMenuStyles = isDifferentMenuActive
    ? "ant-menu-item-selected active-link"
    : isOrdersActive
    ? "ant-menu-item-selected active-link"
    : "";

  return { isOrdersActive, isDifferentMenuActive, activeMenuStyles };
};
