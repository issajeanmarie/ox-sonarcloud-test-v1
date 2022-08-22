/**
 * This function calculates the percentage of the truck usage.
 * @author Patrick TUNEZERWANE (AWESOMITY LAB)
 * @since Aug 19 2022
 */

export const truckPacentageCalculator = (current: number, prev: number) => {
  try {
    if (prev === 0) {
      return ((current - prev) / current) * 100;
    } else return ((current - prev) / prev) * 100;
  } catch (error) {
    return error;
  }
};

/**
 * This function calculates the percentage of the KPIs.
 * @author Patrick TUNEZERWANE (AWESOMITY LAB)
 * @since Aug 22 2022
 */

export const KPIsPacentageCalculator = (
  actualAmount: number,
  TargetAmount: number
) => {
  try {
    const percentage = (actualAmount / TargetAmount) * 100;
    return percentage.toFixed(3);
  } catch (error) {
    return error;
  }
};
