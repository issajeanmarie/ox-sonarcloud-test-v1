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
