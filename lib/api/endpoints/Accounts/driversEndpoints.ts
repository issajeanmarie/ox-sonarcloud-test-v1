import {
  Driver,
  DriverResponse,
  DeleteDriverRequest,
  EditDriverLocationRequest,
  GetDrivers,
  PostDriverRequest,
  ToggleDriverRequest,
  MakeDriverDispatcherRequest,
  SeachDriverRequest
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
          DTO?.page
        }&size=${DTO?.size}&status=${DTO?.status}&sort=${DTO?.sort}`,
        method: "GET"
      })
    }),
    postDriver: builder.mutation<
      ApiResponseMetadata<Driver>,
      PostDriverRequest
    >({
      invalidatesTags: ["Drivers"],
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
      invalidatesTags: ["Drivers"],
      query: (DTO) => ({
        url: `/drivers/${DTO?.id}`,
        method: "DELETE"
      })
    }),
    editDriver: builder.mutation<
      ApiResponseMetadata<Driver>,
      EditDriverLocationRequest
    >({
      invalidatesTags: ["Drivers"],
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
      invalidatesTags: ["Drivers"],
      query: (DTO) => ({
        url: `/drivers/${DTO?.id}/toggle-active`,
        method: "PUT",
        body: DTO
      })
    }),
    /*  searchDriver: builder.mutation<
      ApiResponseMetadata<Driver>,
      SeachDriverRequest
    >({
      invalidatesTags: ["Drivers"],
      query: ({ search }) => ({
        url: `/drivers?search=${search}`,
        method: "GET"
      })
    }), */

    /* searchDriver: builder.mutation({
      invalidatesTags: ["Trucks"],
      query: ({ search }: any) => ({
        url: `/drivers?search=${search || ""}`,
        method: "GET"
      })
    }), */

    searchDriver: builder.query<
      ApiResponseMetadata<Driver>,
      SeachDriverRequest
    >({
      providesTags: ["Clients"],
      query: ({ search }) => ({
        url: `./drivers?search=${search}`,
        method: "GET"
      })
    }),

    makeDriverDispatcher: builder.mutation<
      ApiResponseMetadata<Driver>,
      MakeDriverDispatcherRequest
    >({
      invalidatesTags: ["Drivers"],
      query: (DTO) => ({
        url: `/drivers/${DTO?.id}/toggle-dispatcher`,
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
  useLazySearchDriverQuery
} = driversEndpoints;
