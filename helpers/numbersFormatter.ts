/**
 * This function formats numbers EX: it takes 2000 and returns 2,000.
 * @author Patrick TUNEZERWANE (AWESOMITY LAB)
 * @since Aug 10 2022
 */

export const numbersFormatter = (x: number | undefined) => {
  try {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } catch (error) {
    return error;
  }
};
