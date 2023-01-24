/**
 * This function calculates the percentage of the truck usage.
 * @author Patrick TUNEZERWANE (AWESOMITY LAB)
 * @since Aug 19 2022
 */

const toMyFixed = (num: number) => num.toFixed(2).replace(/[.,]00$/, "");

export const truckPercentageCalculator = (current: number, prev: number) => {
  try {
    if (prev === 0) {
      const percentage = ((current - prev) / current) * 100;
      return toMyFixed(percentage);
    } else {
      const percentage = ((current - prev) / prev) * 100;
      return toMyFixed(percentage);
    }
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
    return toMyFixed(percentage);
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
    const percentage = totalSales ? (totalSales / allRevenue) * 100 : 0;
    return toMyFixed(percentage);
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
