/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";

/**
 * Can not select days before the current date
 * @author Patrick TUNEZERWANE (AWESOMITY LAB)
 * @since Aug 23 2022
 */

export const datesBeforeStartDateDisabler = (startDate: any) => {
  return startDate && startDate < moment().startOf("day");
};
