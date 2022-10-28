import { SearchType } from "./Inputs";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnalyticTrucksTypes = {
  active: string | string[] | undefined;
  sorter: { value: string };
  onStartDateChange: (_: string, date: string) => void;
  onEndDateChange: (_: string, date: string) => void;
  handleSearch: (e: SearchType) => void;
  handleDownloadTruckUsage: () => void;
  handleDownloadTruckMonthlyReport: () => void;
  isDownloadingTruckReport: boolean;
  isDownloadFetching: boolean;
  selectedSort: any;
  setSelectedSort: any;
  depotsState: any;
  startDate: string | null;
  endDate: string | null;
  searchQuery?: any;
};

export type truckTableTypes = {
  truckData: [
    {
      index: number;
      plateNumber: string;
      truckModel: string;
      totalDistance: number;
      previousTotalDistance: number;
      totalWeight: number;
      previousTotalWeight: number;
      totalHours: number;
      previousTotalHours: number;
      totalRevenue: number;
      previousTotalRevenue: number;
      totalPaid: number;
      previousTotalPaid: number;
      kilogramKilometre: number;
    }
  ];
  truckFetching: boolean;
};
