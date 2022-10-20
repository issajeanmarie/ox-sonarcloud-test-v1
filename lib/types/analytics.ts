export interface AnalyticsResponse {
  status: number;
  message: string;
  payload:
    | [
        {
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
      ]
    | any;
}

export interface TruckAnalyticsRequest {
  depot: number | "" | undefined;
  start: string | null;
  end: string | null;
  sortBy: string;
  direction: string;
  search: string | undefined;
}
export interface DownloadTruckAnalyticsRequest {
  depot: number | "" | undefined;
  start: string | null;
  end: string | null;
  sortBy: string;
  direction: string;
  search: string | undefined;
  file_type: string;
}

export interface RevenueAnalyticsRequest {
  depot: number | "" | undefined;
  start: string | null;
  end: string | null;
}

export interface KPIsAnalyticsRequest {
  depot: number | "" | undefined;
  start: string | null;
  end: string | null;
}

export interface MapAnalyticsRequest {
  depot: number | "" | undefined;
  categories: number[];
}
