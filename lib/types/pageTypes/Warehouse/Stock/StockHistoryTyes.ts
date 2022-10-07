import { SetStateAction } from "react";

export type StockHistoryTyes = {
  filter: object;
  setFilter: React.Dispatch<SetStateAction<object>>;
  onStartDateChange: (_: string, date: string) => void;
  onEndDateChange: (_: string, date: string) => void;
};
