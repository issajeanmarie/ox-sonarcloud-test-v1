/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt_decode from "jwt-decode";

/**
 * This function retuns the loggedIn user by reading his/her token
 * @author Patrick TUNEZERWANE (AWESOMITY LAB)
 * @authorEmail tunezepatrick@awesomity.rw
 * @since Jul 18 2022 at 16:26
 */

export const getLoggedInUser = () => {
  let loggedInUser: any = {};

  try {
    loggedInUser = jwt_decode(localStorage.getItem("_ox_tkn_") || "{}");
  } catch (error: any) {
    return error?.message;
  }

  return {
    loggedInUser
  };
};

export const userType = () => {
  const data = localStorage.getItem("_ox_tkn_");
  const role: any = data ? jwt_decode(data) : {};
  const { scope } = role;

  const types = {
    isGuest: scope === "ADMIN_GUEST",
    isDispatcher: scope === "DISPATCHER",
    isAdmin: scope === "ADMIN",
    isSuperAdmin: scope === "SUPER_ADMIN"
  };

  return { ...types };
};
