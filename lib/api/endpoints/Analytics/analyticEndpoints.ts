import { baseAPI } from "../../api";
import {
  TruckAnalyticsRequest,
  AnalyticsResponse,
  RevenueAnalyticsRequest,
  KPIsAnalyticsRequest
} from "../../../types/analytics";

const analyticsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    truckAnalytics: builder.query<AnalyticsResponse, TruckAnalyticsRequest>({
      providesTags: ["Analytics", "Depot"],
      query: (DTO) => ({
        url: `analytics/truck-analytics/new?depot=${DTO?.depot}&start=${DTO?.start}&end=${DTO?.end}&sortBy=${DTO?.sortBy}&direction=${DTO?.direction}`,
        method: "GET"
      })
    }),
    revenueAnalytics: builder.query<AnalyticsResponse, RevenueAnalyticsRequest>(
      {
        providesTags: ["Analytics", "Depot"],
        query: (DTO) => ({
          url: `analytics/revenue?depot=${DTO?.depot}&start=${DTO?.start}&end=${DTO?.end}`,
          method: "GET"
        })
      }
    ),
    KPIsAnalytics: builder.query<AnalyticsResponse, KPIsAnalyticsRequest>({
      providesTags: ["Analytics", "Depot"],
      query: (DTO) => ({
        url: `analytics/kpis?depot=${DTO?.depot}&start=${DTO?.start}&end=${DTO?.end}`,
        method: "GET"
      })
    })
  })
});

export const {
  useTruckAnalyticsQuery,
  useRevenueAnalyticsQuery,
  useKPIsAnalyticsQuery
} = analyticsEndpoints;
