/**
 * Handle all localStorage operations here
 * @author Issa Jean Marie <jeanmarieissa@gmail.com>
 * @since August 2022
 */

export const yearsList = (minMum?: number) => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = currentYear; i >= (minMum || 1900); i--) {
    years.push(i);
  }

  return years;
};
