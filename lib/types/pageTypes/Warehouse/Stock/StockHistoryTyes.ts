/* eslint-disable @typescript-eslint/no-explicit-any */
export type StockHistoryTyes = {
  setFilter: any;
  filter: string;
  onStartDateChange: (_: string, date: string) => void;
  onEndDateChange: (_: string, date: string) => void;
};
