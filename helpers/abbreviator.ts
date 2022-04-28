/**
 * This function takes the first letter of each word in a string and return them.
 * EX: If a string = 'PATRICK TUNEZERWANE' then the func will return 'PT'
 * @author Patrick TUNEZERWANE (AWESOMITY LAB)
 * @since Apr 26 2022 at 12:58
 */

export const abbreviator = (text: string) => {
  const abbr = text
    .split(" ")
    .map((item) => item[0])
    .join("");

  return abbr;
};
