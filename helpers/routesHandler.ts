import Router from "next/router";

/**
 * This function handles routes change
 * @author Patrick TUNEZERWANE (AWESOMITY LAB)
 * @since Apr 26 2022 at 12:59
 */
export const changeRoute = (route: string) => {
  Router.replace(route);
};
