import { UploadProps } from "antd/es/upload";
import { Query } from "../../shared";
import { SearchType } from "./Inputs";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TrucksUsageTableTypes = {
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
  kilogramKilometer: number;
  totalFuel: number;
  previousTotalFuel: number;
  actualKilogramKilometer: number;
};

export type TrucksUsageTableColumnsTypes = {
  title: string | React.ReactNode;
  key: string;
  render: (record: TrucksUsageTableTypes) => void;
};

export type TrucksUsageTypes = {
  sorter: any;
  onStartDateChange: (_: string, date: string) => void;
  onEndDateChange: (_: string, date: string) => void;
  uploadingFuelReport: boolean;
  uploadFileProps: UploadProps;
  handleSearch: (e: SearchType) => void;
  handleDownloadTruckUsage: () => void;
  handleDownloadTruckMonthlyReport: () => void;
  isDownloadingTruckReport: boolean;
  isDownloadFetching: boolean;
  selectedSort: any;
  setSelectedSort: any;
};

export type TruckMaintenanceCheckListTypes = {
  onStartDateChange: (_: string, date: string) => void;
  onEndDateChange: (_: string, date: string) => void;
  maintenanceData: any;
  startDate: string;
  endDate: string;
  truckId: Query;
};
