/**
 * This function calculates the percentage of the truck usage.
 * @author Patrick TUNEZERWANE (AWESOMITY LAB)
 * @since Aug 19 2022
 */

export const truckPercentageCalculator = (current: number, prev: number) => {
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

export const KPIsPercentageCalculator = (
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

/**
 * This function calculates the percentage of revenue.
 * @author Patrick TUNEZERWANE (AWESOMITY LAB)
 * @since Aug 23 2022
 */

export const revenuePercentageCalculator = (
  totalSales: number,
  allRevenue: number
) => {
  try {
    const percentage = (totalSales / allRevenue) * 100;
    return percentage.toFixed(1);
  } catch (error) {
    return error;
  }
};

/**
 * @author Issa Jean Marie <jeanmarieissa@gmail.com>
 * @since Feb 2022
 */

export const percentageCalculator = (prev: number, current: number) =>
  !prev && !current
    ? 0
    : !prev && current
    ? 100
    : Math.round((current * 100) / prev);
