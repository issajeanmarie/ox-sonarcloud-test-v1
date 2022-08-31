import {
  ProfileResponse,
  ProfileTypes,
  PasswordTypes,
  KPIsResponse,
  AddKPI
} from "../../../types/settings";
import { ApiResponseMetadata, GenericResponse } from "../../../types/shared";
import { baseAPI } from "../../api";

/**
 * AUTH ENDPOINTS
 * @author Elie K. Gashagaza
 * @authorEmail gashagaza@awesomity.rw
 * @since Jul 2022
 */

const settingsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    /** Personal Information Requests */
    settings: builder.query<ApiResponseMetadata<ProfileResponse>, void>({
      providesTags: ["Settings"],
      query: () => ({
        url: "/users/profile",
        method: "GET"
      })
    }),

    personalInfo: builder.mutation<GenericResponse, ProfileTypes>({
      invalidatesTags: ["Settings"],
      query: (DTO) => ({
        url: "/users/profile",
        method: "PATCH",
        body: DTO
      })
    }),

    changePassword: builder.mutation<GenericResponse, PasswordTypes>({
      invalidatesTags: ["Settings"],
      query: (DTO) => ({
        url: "/users/profile",
        method: "PATCH",
        body: DTO
      })
    }),

    /** KPIs Requests */
    getKpis: builder.query<ApiResponseMetadata<KPIsResponse>, void>({
      providesTags: ["Settings"],
      query: () => ({
        url: "/kpis/current",
        method: "GET"
      })
    }),
    addKpi: builder.mutation<ApiResponseMetadata<KPIsResponse>, AddKPI>({
      invalidatesTags: ["Settings"],
      query: (DTO) => ({
        url: "/kpis",
        method: "POST",
        body: DTO
      })
    })
  })
});

export const {
  useSettingsQuery,
  usePersonalInfoMutation,
  useChangePasswordMutation,
  useGetKpisQuery,
  useAddKpiMutation
} = settingsApi;
