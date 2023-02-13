import {
  Driver,
  DriverResponse,
  DeleteDriverRequest,
  EditDriverLocationRequest,
  GetDrivers,
  PostDriverRequest,
  ToggleDriverRequest,
  MakeDriverDispatcherRequest,
  SeachDriverRequest as SearchDriverRequest,
  GetDriver,
  DriverShiftResponse,
  DriverShiftOrders,
  SingleDriverResponse,
  DriverProfileResponse
} from "../../../types/Accounts/drivers";
import { ApiResponseMetadata } from "../../../types/shared";
import { baseAPI } from "../../api";

/**
 * DriverS ENDPOINTS
 * @author  Patrick TUNEZERWANE
 * @authorEmail tunezepatrick@awesomity.rw
 * @since sep 25
 */

const driversEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    drivers: builder.query<
      ApiResponseMetadata<{ content: DriverResponse }>,
      GetDrivers
    >({
      providesTags: ["ToggleDriver"],
      query: (DTO) => ({
        url: `drivers${DTO.noPagination ? "/no-pagination" : ""}?page=${
          DTO?.page || ""
        }&size=${DTO?.size || ""}&status=${DTO?.status || ""}&sort=${
          DTO?.sort || ""
        }&search=${DTO.search || ""}`,
        method: "GET"
      })
    }),
    driver: builder.query<SingleDriverResponse, GetDriver>({
      providesTags: ["Drivers"],
      query: ({ id }) => ({
        url: `drivers/${id}`,
        method: "GET"
      })
    }),
    postDriver: builder.mutation<
      ApiResponseMetadata<Driver>,
      PostDriverRequest
    >({
      invalidatesTags: [],
      query: (DTO) => ({
        url: `/drivers`,
        method: "POST",
        body: DTO
      })
    }),

    deleteDriver: builder.mutation<
      ApiResponseMetadata<Driver>,
      DeleteDriverRequest
    >({
      invalidatesTags: [],
      query: (DTO) => ({
        url: `/drivers/${DTO?.id}`,
        method: "DELETE"
      })
    }),
    editDriver: builder.mutation<
      ApiResponseMetadata<Driver>,
      EditDriverLocationRequest
    >({
      invalidatesTags: ["EditDriver"],
      query: (DTO) => ({
        url: `/drivers/${DTO?.id}`,
        method: "PUT",
        body: DTO
      })
    }),
    toggleDriver: builder.mutation<
      ApiResponseMetadata<Driver>,
      ToggleDriverRequest
    >({
      invalidatesTags: ["ToggleDriver"],
      query: (DTO) => ({
        url: `/drivers/${DTO?.id || ""}/toggle-active`,
        method: "PUT",
        body: DTO
      })
    }),

    searchDriver: builder.query<
      ApiResponseMetadata<Driver>,
      SearchDriverRequest
    >({
      providesTags: [],
      query: ({ search }) => ({
        url: `./drivers?search=${search}`,
        method: "GET"
      })
    }),

    makeDriverDispatcher: builder.mutation<
      ApiResponseMetadata<Driver>,
      MakeDriverDispatcherRequest
    >({
      invalidatesTags: [],
      query: (DTO) => ({
        url: `/drivers/${DTO?.id}/toggle-dispatcher`,
        method: "PATCH",
        body: DTO
      })
    }),

    endShift: builder.mutation<
      ApiResponseMetadata<Driver>,
      MakeDriverDispatcherRequest
    >({
      invalidatesTags: ["EndShift"],
      query: (DTO) => ({
        url: `/drivers/${DTO.id}/end-shift`,
        method: "PATCH",
        body: DTO
      })
    }),

    getDriverShifts: builder.query<DriverShiftResponse, GetDriver>({
      providesTags: [],
      query: ({ id, page, size, status }) => ({
        url: `./drivers/${id}/shifts?page=${page || 0}&size=${
          size || 40
        }&status=${status || ""}`,
        method: "GET"
      })
    }),

    getDriverShiftOrders: builder.query<DriverShiftOrders, GetDriver>({
      providesTags: [],
      query: ({ id, page, size, status }) => ({
        url: `./shifts/${id}/orders?page=${page || 0}&size=${
          size || 40
        }&status=${status || ""}`,
        method: "GET"
      })
    }),

    driverProfile: builder.query<DriverProfileResponse, GetDriver>({
      providesTags: ["EditDriver", "ToggleDriver", "EndShift"],
      query: ({ id }) => ({
        url: `drivers/${id}/profile`,
        method: "GET"
      })
    })
  })
});

export const {
  useDriversQuery,
  usePostDriverMutation,
  useDeleteDriverMutation,
  useEditDriverMutation,
  useToggleDriverMutation,
  useLazyDriversQuery,
  useMakeDriverDispatcherMutation,
  useLazySearchDriverQuery,
  useDriverQuery,
  useEndShiftMutation,
  useLazyGetDriverShiftsQuery,
  useLazyGetDriverShiftOrdersQuery,
  useDriverProfileQuery
} = driversEndpoints;
