import { SearchType } from "./Inputs";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnalyticTrucksTypes = {
  active: string;
  truckData: any;
  truckLoading: boolean;
  truckFetching: boolean;
  sorter: string;
  onStartDateChange: (_: string, date: string) => void;
  onEndDateChange: (_: string, date: string) => void;
  handleSearch: (e: SearchType) => void;
  handleDownloadClients: () => void;
  isDownloadingTruckReport: boolean;
  isDownloadFetching: boolean;
  selectedSort: any;
  setSelectedSort: any;
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
