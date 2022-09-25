import {
  Admin,
  AdminResponse,
  DeleteAdminRequest,
  EditAdminLocationRequest,
  GetAdmins,
  PostAdminRequest,
  ToggleAdminRequest
} from "../../../types/Accounts/admins";
import { ApiResponseMetadata } from "../../../types/shared";
import { baseAPI } from "../../api";

/**
 * AdminS ENDPOINTS
 * @author  Patrick TUNEZERWANE
 * @authorEmail tunezepatrick@awesomity.rw
 * @since sep 25
 */

const adminsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    admins: builder.query<
      ApiResponseMetadata<{ content: AdminResponse }>,
      GetAdmins
    >({
      providesTags: ["Admins"],
      query: (DTO) => ({
        url: `admins?page=${DTO?.page}&size=${DTO?.size}`,
        method: "GET"
      })
    }),
    postAdmin: builder.mutation<ApiResponseMetadata<Admin>, PostAdminRequest>({
      invalidatesTags: ["Admins"],
      query: (DTO) => ({
        url: `/admins`,
        method: "POST",
        body: DTO
      })
    }),

    deleteAdmin: builder.mutation<
      ApiResponseMetadata<Admin>,
      DeleteAdminRequest
    >({
      invalidatesTags: ["Admins"],
      query: (DTO) => ({
        url: `/admins/${DTO?.id}`,
        method: "DELETE"
      })
    }),
    editAdmin: builder.mutation<
      ApiResponseMetadata<Admin>,
      EditAdminLocationRequest
    >({
      invalidatesTags: ["Admins"],
      query: (DTO) => ({
        url: `/admins/${DTO?.id}`,
        method: "PATCH",
        body: DTO
      })
    }),
    toggleAdmin: builder.mutation<
      ApiResponseMetadata<Admin>,
      ToggleAdminRequest
    >({
      invalidatesTags: ["Admins"],
      query: (DTO) => ({
        url: `/admins/${DTO?.id}/toggle-active`,
        method: "PATCH",
        body: DTO
      })
    })
  })
});

export const {
  useAdminsQuery,
  usePostAdminMutation,
  useDeleteAdminMutation,
  useEditAdminMutation,
  useToggleAdminMutation,
  useLazyAdminsQuery
} = adminsEndpoints;
