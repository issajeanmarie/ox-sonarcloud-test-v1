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
  kilogramKilometre: number;
  totalFuel: number;
  previousTotalFuel: number;
};

export type TrucksUsageTableColumnsTypes = {
  title: string | React.ReactNode;
  key: string;
  render: (record: TrucksUsageTableTypes) => void;
};

export type TrucksUsageTypes = {
  onSortChange: any;
  sorter: string;
};
