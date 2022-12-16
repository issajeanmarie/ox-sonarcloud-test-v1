import { SetStateAction } from "react";

export type StockHistoryTypes = {
  filter: object;
  setFilter: React.Dispatch<SetStateAction<object>>;
  onStartDateChange: (_: string, date: string) => void;
  onEndDateChange: (_: string, date: string) => void;
  downloadStockHistoryReport?: () => void;
  isDownloading?: boolean;
};
