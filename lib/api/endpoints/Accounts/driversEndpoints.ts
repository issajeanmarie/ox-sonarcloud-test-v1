import {
  Driver,
  DriverResponse,
  DeleteDriverRequest,
  EditDriverLocationRequest,
  GetDrivers,
  PostDriverRequest,
  ToggleDriverRequest,
  MakeDriverDispatcherRequest,
  SeachDriverRequest,
  GetDriver
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
      providesTags: ["Drivers"],
      query: (DTO) => ({
        url: `drivers${DTO.noPagination ? "/no-pagination" : ""}?page=${
          DTO?.page || ""
        }&size=${DTO?.size || ""}&status=${DTO?.status || ""}&sort=${
          DTO?.sort || ""
        }&search=${DTO.search || ""}`,
        method: "GET"
      })
    }),
    driver: builder.query<
      ApiResponseMetadata<{ content: DriverResponse }>,
      GetDriver
    >({
      providesTags: ["Drivers"],
      query: ({ id }) => ({
        url: `drivers/${id}`,
        method: "GET"
      })
    }),
    driver: builder.query<
      ApiResponseMetadata<{ content: DriverResponse }>,
      GetDriver
    >({
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
      invalidatesTags: [],
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
      invalidatesTags: [],
      query: (DTO) => ({
        url: `/drivers/${DTO?.id || ""}/toggle-active`,
        method: "PUT",
        body: DTO
      })
    }),

    searchDriver: builder.query<
      ApiResponseMetadata<Driver>,
      SeachDriverRequest
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
      invalidatesTags: [],
      query: (DTO) => ({
        url: `/drivers/${DTO.id}/end-shift`,
        method: "PATCH",
        body: DTO
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
  useEndShiftMutation
} = driversEndpoints;
