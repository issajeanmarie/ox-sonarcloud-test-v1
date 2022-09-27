/* eslint-disable @typescript-eslint/no-explicit-any */
export type StockHistoryTyes = {
  onSortChange: any;
  sorter: string;
  onStartDateChange: (_: string, date: string) => void;
  onEndDateChange: (_: string, date: string) => void;
};
