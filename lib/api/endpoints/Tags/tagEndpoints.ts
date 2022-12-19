import { ApiResponseMetadata } from "../../../types/shared";
import { TagResponse } from "../../../types/tags";
import { baseAPI } from "../../api";

/**
 * TAG ENDPOINTS
 * @author  Patrick TUNEZERWANE
 * @authorEmail tunezepatrick@awesomity.rw
 * @since  Sep 11 2022
 */

const tagApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    tags: builder.query<ApiResponseMetadata<{ content: TagResponse }>, void>({
      providesTags: ["Clients", "Tags"],
      query: () => ({
        url: "/tags/by-name",
        method: "GET"
      })
    })
  })
});

export const { useTagsQuery } = tagApi;
