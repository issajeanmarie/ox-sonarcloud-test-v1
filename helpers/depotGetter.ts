/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This function retuns depot data
 * @author Patrick TUNEZERWANE (AWESOMITY LAB)
 * @authorEmail tunezepatrick@awesomity.rw
 * @since August 9 2022 at 13:14
 */

export const depotGetter = () => {
  let localDepotName: string;
  let localDepotID: string;

  try {
    localDepotName = localStorage.getItem("ox_depotName") || "Tyazo Depot";
    localDepotID = localStorage.getItem("ox_depotID") || "1";
  } catch (error: any) {
    return error?.message;
  }

  return {
    localDepotName,
    localDepotID
  };
};
