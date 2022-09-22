/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This function shortin a long string more than 30 chars
 * @author Patrick TUNEZERWANE (AWESOMITY LAB)
 * @since Sep 12 2022
 */

export const limitStringLengthSmall = (str: any) => {
  try {
    if (str.length > 17) {
      return `${(str = str.substring(0, 17))}...`;
    } else {
      return str;
    }
  } catch (error) {
    return error;
  }
};
