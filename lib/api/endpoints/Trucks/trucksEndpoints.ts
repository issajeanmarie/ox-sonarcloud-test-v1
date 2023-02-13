import { TruckTypes } from "../../../types/pageTypes/Analytics/TruckTypes";
import { ApiResponseMetadata } from "../../../types/shared";
import {
  CreateTruckIssueRequest,
  CreateTruckRequest,
  CreateTruckResponse,
  ToggleTruckRequest,
  ToggleTruckResponse,
  ToggleTruckIssueRequest,
  EditTruckRequest,
  DeleteTruckRepairLogRequest,
  DeleteMaintenanceCheckRequest
} from "../../../types/trucksTypes";
import { baseAPI } from "../../api";

/**
 * CATEGORY ENDPOINTS
 * @author Issa Jean Marie <jeanmarieissa@gmail.com>
 * @since August 2022
 */

type Payload = {
  page?: number;
  size?: number;
  status?: any;
  sort?: any;
  search?: any;
  id?: number;
  truckId?: any;
  issueId?: number;
};

const trucksApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTrucks: builder.query({
      providesTags: ["Trucks"],
      query: ({ noPagination, page, size, sort, search, status, depot }) => ({
        url: `/trucks${noPagination ? "/no-pagination" : ""}?page=${
          page || ""
        }&depot=${depot || 0}&size=${size || ""}&status=${status || ""}&sort=${
          sort || ""
        }&search=${search || ""}`,
        method: "GET"
      }),
      transformResponse: (response: ApiResponseMetadata<TruckTypes>) => response
    }),

    createTruck: builder.mutation<CreateTruckResponse, CreateTruckRequest>({
      invalidatesTags: ["Trucks"],
      query: (DTO) => ({
        url: "/trucks",
        method: "POST",
        body: DTO
      })
    }),

    filterTrucks: builder.mutation({
      invalidatesTags: ["Trucks"],
      query: ({ page, size, status, sort, search }: Payload) => ({
        url: `/trucks?page=${page || ""}&size=${size || ""}&status=${
          status || ""
        }&sort=${sort || ""}&search=${search || ""}`,
        method: "GET"
      })
    }),

    toggleTruck: builder.mutation<ToggleTruckResponse, ToggleTruckRequest>({
      invalidatesTags: ["Trucks"],
      query: ({ id }) => ({
        url: `/trucks/${id}/toggle-active`,
        method: "PUT"
      })
    }),

    getSingleTruck: builder.query({
      providesTags: ["Trucks"],
      query: ({ id }) => ({
        url: `/trucks/${id}`,
        method: "GET"
      }),
      transformResponse: (response: ApiResponseMetadata<TruckTypes>) =>
        response.payload
    }),

    getTruckOverview: builder.query({
      providesTags: ["Trucks"],
      query: ({ id, start, end }) => ({
        url: `/trucks/${id}/overview?start=${start || ""}&end=${end || ""}`,
        method: "GET"
      }),
      transformResponse: (response: ApiResponseMetadata<TruckTypes>) =>
        response.payload
    }),

    getTruckRepairLog: builder.query({
      providesTags: ["Trucks"],
      query: ({ id, startDate, endDate }) => ({
        url: `/trucks/${id}/repairs?start=${startDate || ""}&end=${
          endDate || ""
        }`,
        method: "GET"
      }),
      transformResponse: (response: ApiResponseMetadata<TruckTypes>) => response
    }),

    getTruckIssues: builder.query({
      providesTags: ["Trucks"],
      query: ({ truckId }) => ({
        url: `/trucks/${truckId}/issues`,
        method: "GET"
      }),
      transformResponse: (response: ApiResponseMetadata<TruckTypes>) =>
        response.payload
    }),

    getTruckFuelReport: builder.query({
      providesTags: ["Trucks"],
      query: ({ id, startDate, endDate }) => ({
        url: `/trucks/${id}/fuel-report?start=${startDate || ""}&end=${
          endDate || ""
        }`,
        method: "GET"
      }),
      transformResponse: (response: ApiResponseMetadata<TruckTypes>) =>
        response.payload
    }),

    createTruckIssue: builder.mutation<
      CreateTruckResponse,
      CreateTruckIssueRequest
    >({
      invalidatesTags: ["Trucks"],
      query: ({ id, ...DTO }) => {
        return {
          url: `/trucks/${id}/issues`,
          method: "POST",
          body: DTO
        };
      }
    }),

    toggleTruckIssueStatus: builder.mutation<
      ToggleTruckResponse,
      ToggleTruckIssueRequest
    >({
      invalidatesTags: ["Trucks"],
      query: ({ truckId, issueId }) => {
        return {
          url: `/trucks/${truckId}/issues/${issueId}/toggle-status`,
          method: "PATCH"
        };
      }
    }),

    downloadTruckDailyInspection: builder.mutation({
      query: ({ id, start, end, fileType }) => ({
        url: `/daily_inspections/download?truck_id=${id}&start=${
          start || ""
        }&end=${end || ""}&file_type=${fileType || ""}`,
        method: "GET",
        headers: {
          "content-type": "application/octet-stream"
        },
        responseHandler: (response) => response.blob()
      })
    }),

    downloadTruckShifts: builder.mutation({
      query: ({ id, fileType }) => ({
        url: `/trucks/${id}/shifts/download?file_type=${fileType || ""}`,
        method: "GET",
        headers: {
          "content-type": "application/octet-stream"
        },
        responseHandler: (response) => response.blob()
      })
    }),

    downloadOOSReport: builder.mutation({
      query: ({ fileType, truckId }) => ({
        url: `/trucks/${
          truckId ? `${truckId}/` : ""
        }repairs/download?file_type=${fileType || ""}`,
        method: "GET",
        headers: {
          "content-type": "application/octet-stream"
        },
        responseHandler: (response) => response.blob()
      })
    }),

    downloadMaintenanceCheck: builder.mutation({
      query: ({ fileType, truckId, start, end }) => ({
        url: `/trucks/${truckId}/maintenance-checks/download?file_type=${
          fileType || "CSV"
        }&start=${start}&end=${end}`,
        method: "GET",
        headers: {
          "content-type": "application/octet-stream"
        },
        responseHandler: (response) => response.blob()
      })
    }),

    getTruckDailyInspection: builder.query({
      providesTags: ["Trucks"],
      query: ({ id }) => ({
        url: `/trucks/${id}/daily-inspections`,
        method: "GET"
      }),
      transformResponse: (response: ApiResponseMetadata<TruckTypes>) =>
        response.payload
    }),

    editTruck: builder.mutation<CreateTruckResponse, EditTruckRequest>({
      invalidatesTags: ["Trucks"],
      query: ({ id, ...DTO }) => ({
        url: `/trucks/${id}`,
        method: "PUT",
        body: DTO
      })
    }),

    deleteTruck: builder.mutation<CreateTruckResponse, EditTruckRequest>({
      invalidatesTags: ["Trucks"],
      query: ({ id }) => ({
        url: `/trucks/${id}`,
        method: "DELETE"
      })
    }),

    uploadTruckDocument: builder.mutation({
      invalidatesTags: ["Trucks"],
      query: ({ id, ...DTO }) => ({
        url: `/trucks/${id}/documents`,
        method: "POST",
        body: DTO
      })
    }),

    editTruckDocument: builder.mutation({
      invalidatesTags: ["Trucks"],
      query: ({ id, documentId, ...DTO }) => ({
        url: `/trucks/${id}/documents/${documentId}`,
        method: "PUT",
        body: DTO
      })
    }),

    createTruckRepairLog: builder.mutation<
      CreateTruckResponse,
      CreateTruckIssueRequest
    >({
      invalidatesTags: ["Trucks"],
      query: ({ id, ...DTO }) => {
        return {
          url: `/trucks/${id}/repairs`,
          method: "POST",
          body: DTO
        };
      }
    }),

    createMaintenanceCheck: builder.mutation<unknown, unknown>({
      invalidatesTags: [],
      query: ({ id, ...DTO }) => {
        return {
          url: `/trucks/${id}/maintenance-checks`,
          method: "POST",
          body: DTO
        };
      }
    }),

    deleteTruckRepairLog: builder.mutation<
      CreateTruckResponse,
      DeleteTruckRepairLogRequest
    >({
      invalidatesTags: ["Trucks"],
      query: ({ id, repairId }) => {
        return {
          url: `/trucks/${id}/repairs/${repairId}`,
          method: "DELETE"
        };
      }
    }),

    deleteMaintenanceCheck: builder.mutation<
      CreateTruckResponse,
      DeleteMaintenanceCheckRequest
    >({
      invalidatesTags: [],
      query: ({ id, checkId }) => {
        return {
          url: `/trucks/${id}/maintenance-checks/${checkId}`,
          method: "DELETE"
        };
      }
    }),

    getTruckShiftsAnalytics: builder.query({
      providesTags: ["Trucks"],
      query: ({ id, start, end }) => ({
        url: `/analytics/truck-shifts?truck=${id}&start=${start}&end=${end}`,
        method: "GET"
      }),
      transformResponse: (response: ApiResponseMetadata<TruckTypes>) =>
        response.payload
    }),

    getTruckMaintenanceChecklist: builder.query({
      providesTags: ["MaintenanceCheck"],
      query: ({ id, start, end, page, size }) => ({
        url: `/trucks/${id || 0}/maintenance-checks?page=${page || 0}&size=${
          size || ""
        }&start=${start || ""}&end=${end || ""}`,
        method: "GET"
      }),
      transformResponse: (response: ApiResponseMetadata<TruckTypes>) => response
    }),

    getTruckRevenueAnalytics: builder.query({
      providesTags: ["Trucks"],
      query: ({ truckId, id, start, end }) => ({
        url: `/analytics/truck-revenue?depot=${truckId || ""}&truck=${
          id || 0
        }&start=${start || ""}&end=${end || ""}`,
        method: "GET"
      }),
      transformResponse: (response: ApiResponseMetadata<TruckTypes>) =>
        response.payload
    })
  })
});

export const {
  useLazyGetTrucksQuery,
  useFilterTrucksMutation,
  useToggleTruckMutation,
  useLazyGetSingleTruckQuery,
  useLazyGetTruckOverviewQuery,
  useLazyGetTruckRepairLogQuery,
  useLazyGetTruckIssuesQuery,
  useLazyGetTruckFuelReportQuery,
  useCreateTruckIssueMutation,
  useToggleTruckIssueStatusMutation,
  useDownloadTruckDailyInspectionMutation,
  useDownloadTruckShiftsMutation,
  useCreateTruckMutation,
  useDownloadOOSReportMutation,
  useLazyGetTruckDailyInspectionQuery,
  useEditTruckMutation,
  useDeleteTruckMutation,
  useUploadTruckDocumentMutation,
  useEditTruckDocumentMutation,
  useCreateTruckRepairLogMutation,
  useLazyGetTruckShiftsAnalyticsQuery,
  useLazyGetTruckRevenueAnalyticsQuery,
  useDeleteTruckRepairLogMutation,
  useLazyGetTruckMaintenanceChecklistQuery,
  useDeleteMaintenanceCheckMutation,
  useCreateMaintenanceCheckMutation,
  useDownloadMaintenanceCheckMutation
} = trucksApi;
