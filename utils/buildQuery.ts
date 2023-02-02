export const buildQueryFromArray = (key: string, arr: number[] | string[]) => {
  const query = arr.map((el: number | string) => `${key}=${el}`);

  return query.join("&");
};
