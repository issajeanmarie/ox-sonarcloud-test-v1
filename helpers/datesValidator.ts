/* eslint-disable @typescript-eslint/no-explicit-any */
import { RangePickerProps } from "formik-antd";
import moment from "moment";

/**
 * Can not select days before the current date
 * @author Patrick TUNEZERWANE (AWESOMITY LAB)
 * @since Aug 23 2022
 */

export const datesBeforeStartDateDisabler = (startDate: any) => {
  return startDate && startDate < moment().startOf("day");
};

export const futureDateDisabler: RangePickerProps["disabledDate"] = (
  current
) => {
  // Can not select days after today
  return current && current > moment().endOf("day");
};
