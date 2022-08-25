import {
  CreateTruckRequest,
  CreateTruckResponse
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
    })
  })
});

export const {
  useGetTrucksMutation,
  useCreateTruckMutation,
  useLoadMoreTrucksMutation,
  useFilterTrucksMutation
} = trucksApi;
