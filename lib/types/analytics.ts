export interface AnalyticsResponse {
  status: number;
  message: string;
  payload: [
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
  ];
}

export interface TruckAnalyticsRequest {
  depot: number;
  start: string;
  end: string;
  sortBy: string;
  direction: string;
}

export interface RevenueAnalyticsRequest {
  depot: number;
  start: string;
  end: string;
}

export interface KPIsAnalyticsRequest {
  depot: number;
  start: string;
  end: string;
}
