import {
  ResourceResponse,
  GetResources,
  PostResourceRquest,
  DeleteResourceRequest,
  EditResourceRequest
} from "../../../types/Resources";
import { ApiResponseMetadata } from "../../../types/shared";
import { baseAPI } from "../../api";

/**
 * RESOURCES ENDPOINTS
 * @author Elie K. Gashagaza <gashagaza@awesomity.rw>
 * @since September 2022
 */

const resourcesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    resources: builder.query<
      ApiResponseMetadata<{ content: ResourceResponse }>,
      GetResources
    >({
      providesTags: ["Resources"],
      query: (DTO) => ({
        url: `/resources${DTO.noPagination ? "/no-pagination" : ""}?page=${
          DTO?.page || ""
        }&size=${DTO?.size || ""}&status=${DTO?.status || ""}&sort=${
          DTO?.sort || ""
        }`,
        method: "GET"
      })
    }),

    deleteResource: builder.mutation<
      ApiResponseMetadata<ResourceResponse>,
      DeleteResourceRequest
    >({
      invalidatesTags: ["Resources"],
      query: (DTO) => ({
        url: `/resources/${DTO?.id}`,
        method: "DELETE"
      })
    }),

    postResource: builder.mutation<
      ApiResponseMetadata<ResourceResponse>,
      PostResourceRquest
    >({
      invalidatesTags: ["Resources"],
      query: (DTO) => ({
        url: `/resources`,
        method: "POST",
        body: DTO
      })
    }),

    editResource: builder.mutation<
      ApiResponseMetadata<ResourceResponse>,
      EditResourceRequest
    >({
      invalidatesTags: ["Resources"],
      query: (DTO) => ({
        url: `/resources/${DTO?.id}`,
        method: "PATCH",
        body: DTO
      })
    })
  })
});

export const {
  useResourcesQuery,
  useLazyResourcesQuery,
  usePostResourceMutation,
  useDeleteResourceMutation,
  useEditResourceMutation
} = resourcesApi;
