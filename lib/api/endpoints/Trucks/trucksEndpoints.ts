import { TruckTypes } from "../../../types/pageTypes/Analytics/TruckTypes";
import { ApiResponseMetadata } from "../../../types/shared";
import {
  CreateTruckRequest,
  CreateTruckResponse,
  ToggleTruckRequest,
  ToggleTruckResponse
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
      query: (id) => ({
        url: `/daily_inspections?truck_id=${id || ""}`,
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
      query: (id) => ({
        url: `/trucks/${id}/repairs`,
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
      query: (id) => ({
        url: `/trucks/${id}/fuel-report?start=2021-08-02&end=2022-09-05`,
        method: "GET"
      }),
      transformResponse: (response: ApiResponseMetadata<TruckTypes>) =>
        response.payload
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
  useLazyGetTruckFuelReportQuery
} = trucksApi;
