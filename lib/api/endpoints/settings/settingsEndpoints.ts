import { ProfileResponse } from "../../../types/settings";
import { ApiResponseMetadata } from "../../../types/shared";
import { baseAPI } from "../../api";

/**
 * AUTH ENDPOINTS
 * @author Elie K. Gashagaza
 * @authorEmail gashagaza@awesomity.rw
 * @since Jul 2022
 */

const settingsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    settings: builder.query<ApiResponseMetadata<ProfileResponse>, void>({
      query: () => ({
        url: "/users/profile",
        method: "GET"
      })
    }),
  })
});

export const { useLazySettingsQuery } = settingsApi;
