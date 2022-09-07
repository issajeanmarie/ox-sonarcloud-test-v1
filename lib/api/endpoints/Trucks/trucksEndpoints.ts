import { TruckTypes } from "../../../types/pageTypes/Analytics/TruckTypes";
import { ApiResponseMetadata } from "../../../types/shared";
import {
  CreateTruckIssueRequest,
  CreateTruckRequest,
  CreateTruckResponse,
  ToggleTruckRequest,
  ToggleTruckResponse,
  ToggleTruckIssueRequest
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
    getTrucks: builder.mutation({
      invalidatesTags: ["Trucks"],
      query: ({ page, size }: Payload) => ({
        url: `/trucks?page=${page || ""}&size=${size || ""}`,
        method: "GET"
      })
    }),

    loadMoreTrucks: builder.mutation({
      invalidatesTags: ["Trucks"],
      query: ({ page, size, status, sort, search }: Payload) => ({
        url: `/trucks?page=${page || ""}&size=${size || ""}&status=${
          status || ""
        }&sort=${sort || ""}&search=${search || ""}`,
        method: "GET"
      })
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
      query: ({ id, startDate, endDate }) => ({
        url: `/daily_inspections?truck_id=${id}&start=${startDate || ""}&end=${
          endDate || ""
        }`,
        method: "GET"
      }),
      transformResponse: (response: ApiResponseMetadata<TruckTypes>) =>
        response.payload
    }),

    getTruckOverview: builder.query({
      providesTags: ["Trucks"],
      query: (id) => ({
        url: `/trucks/${id}/overview`,
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
      transformResponse: (response: ApiResponseMetadata<TruckTypes>) =>
        response.payload
    }),

    getTruckIssues: builder.query({
      providesTags: ["Trucks"],
      query: (id) => ({
        url: `/trucks/${id}/issues`,
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
    })
  })
});

export const {
  useGetTrucksMutation,
  useCreateTruckMutation,
  useLoadMoreTrucksMutation,
  useFilterTrucksMutation,
  useToggleTruckMutation,
  useLazyGetSingleTruckQuery,
  useLazyGetTruckOverviewQuery,
  useLazyGetTruckRepairLogQuery,
  useLazyGetTruckIssuesQuery,
  useLazyGetTruckFuelReportQuery,
  useCreateTruckIssueMutation,
  useToggleTruckIssueStatusMutation
} = trucksApi;
