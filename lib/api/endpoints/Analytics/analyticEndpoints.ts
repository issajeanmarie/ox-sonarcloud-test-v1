import { baseAPI } from "../../api";
import {
  TruckAnalyticsRequest,
  AnalyticsResponse,
  RevenueAnalyticsRequest,
  KPIsAnalyticsRequest,
  MapAnalyticsRequest,
  DownloadTruckAnalyticsRequest
} from "../../../types/analytics";

const analyticsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    truckAnalytics: builder.query<AnalyticsResponse, TruckAnalyticsRequest>({
      providesTags: ["Analytics", "Depot"],
      query: (DTO) => ({
        url: `/analytics/truck-analytics/v2?depot=${DTO?.depot || ""}&start=${
          DTO?.start || ""
        }&end=${DTO?.end || ""}&sortBy=${DTO?.sortBy || ""}&direction=${
          DTO?.direction || ""
        }&search=${DTO?.search || ""}`,
        method: "GET"
      })
    }),
    downloadTruckAnalytics: builder.query<
      AnalyticsResponse,
      DownloadTruckAnalyticsRequest
    >({
      providesTags: ["Analytics", "Depot"],
      query: (DTO) => ({
        url: `/analytics/truck-analytics/download?depot=${
          DTO?.depot || ""
        }&start=${DTO?.start || ""}&end=${DTO?.end || ""}&sortBy=${
          DTO?.sortBy || ""
        }&direction=${DTO?.direction || ""}&search=${
          DTO?.search || ""
        }&file_type=${DTO?.file_type || ""}`,
        method: "GET",
        headers: {
          "content-type": "application/octet-stream"
        },
        responseHandler: (response) => response.blob()
      })
    }),

    downloadTruckMonthlyReport: builder.query<
      AnalyticsResponse,
      DownloadTruckAnalyticsRequest
    >({
      providesTags: ["Analytics", "Depot"],
      query: (DTO) => ({
        url: `/trucks/monthly-report/download?start=${DTO.start || ""}&end=${
          DTO.end || ""
        }`,
        method: "GET",
        headers: {
          "content-type": "application/octet-stream"
        },
        responseHandler: (response) => response.blob()
      })
    }),

    downloadAnalyticsReport: builder.mutation({
      query: (DTO) => ({
        url: `/reports?startDate=${DTO.start || ""}&endDate=${
          DTO.end || ""
        }&scope=${DTO.scope || ""}&file_type=${DTO.file_type || "XLS"}`,
        method: "GET",
        headers: {
          "content-type": "application/octet-stream"
        },
        responseHandler: (response) => response.blob()
      })
    }),

    revenueAnalytics: builder.query<AnalyticsResponse, RevenueAnalyticsRequest>(
      {
        providesTags: ["Analytics", "Depot"],
        query: (DTO) => ({
          url: `/analytics/revenue?depot=${DTO?.depot || ""}&start=${
            DTO?.start || ""
          }&end=${DTO?.end || ""}`,
          method: "GET"
        })
      }
    ),
    mapAnalytics: builder.query<AnalyticsResponse, MapAnalyticsRequest>({
      providesTags: ["Analytics", "Depot"],
      query: (DTO) => ({
        url: `/analytics/client-locations?depot=${
          DTO?.depot || ""
        }&categories=${DTO?.categories || ""}`,
        method: "GET"
      })
    }),
    KPIsAnalytics: builder.query<AnalyticsResponse, KPIsAnalyticsRequest>({
      providesTags: ["Analytics", "Depot"],
      query: (DTO) => ({
        url: `/analytics/kpis?depot=${DTO?.depot || ""}&start=${
          DTO?.start || ""
        }&end=${DTO?.end || ""}`,
        method: "GET"
      })
    }),

    getTruckRepairAnalytics: builder.query<
      AnalyticsResponse,
      KPIsAnalyticsRequest
    >({
      providesTags: ["Analytics", "Depot"],
      query: (DTO) => ({
        url: `/analytics/truck-repairs?truck=${DTO.id}&start=${
          DTO?.start || ""
        }&end=${DTO?.end || ""}`,
        method: "GET"
      })
    })
  })
});

export const {
  useTruckAnalyticsQuery,
  useRevenueAnalyticsQuery,
  useMapAnalyticsQuery,
  useLazyMapAnalyticsQuery,
  useKPIsAnalyticsQuery,
  useDownloadTruckAnalyticsQuery,
  useLazyDownloadTruckAnalyticsQuery,
  useDownloadAnalyticsReportMutation,
  useLazyDownloadTruckMonthlyReportQuery,
  useLazyGetTruckRepairAnalyticsQuery
} = analyticsEndpoints;
