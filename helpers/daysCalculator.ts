/**
 * @author Issa Jean Marie <jeanmarieissa@gmail.com>
 * @since Sep 2022
 */

const DaysCalculator = (lastDays: number) => {
  const now = new Date();
  const then = new Date(new Date().setDate(new Date().getDate() - lastDays));

  const thenMonth = `${
    then.getMonth() + 1 < 10 ? `0${then.getMonth() + 1}` : then.getMonth() + 1
  }`;
  const nowMonth = `${
    now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1
  }`;

  const thenDay = `${
    then.getDate() < 10 ? `0${then.getDate()}` : then.getDate()
  }`;
  const nowDay = `${now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()}`;

  const today = `${now.getFullYear()}-${nowMonth}-${nowDay}`;
  const startingDate = `${then.getFullYear()}-${thenMonth}-${thenDay}`;
  return { start: startingDate, end: today };
};

export default DaysCalculator;
