import {
  ProfileResponse,
  ProfileTypes,
  PasswordTypes,
  KPIsResponse,
  AddKPI,
  CategoriesResponse,
  AddCategory,
  DeleteCategoryRequest,
  UpdateCategoryRequest,
  MakeCategoryParentRequest,
  OxAppReleaseResponse,
  GetRepairService
} from "../../../types/settings";
import { ApiResponseMetadata, GenericResponse } from "../../../types/shared";
import { baseAPI } from "../../api";

/**
 * SETTINGS ENDPOINTS
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
    getKPIs: builder.query<ApiResponseMetadata<KPIsResponse>, void>({
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
    }),

    //Categories
    getCategories: builder.query<ApiResponseMetadata<CategoriesResponse>, void>(
      {
        providesTags: ["Settings"],
        query: () => ({
          url: "/categories",
          method: "GET"
        })
      }
    ),
    getRepairServices: builder.query<
      ApiResponseMetadata<CategoriesResponse>,
      GetRepairService
    >({
      providesTags: ["Settings"],
      query: (DTO) => ({
        url: `/repair-services?page=${DTO.page || 0}&size=${DTO.size}&q=${
          DTO.query || ""
        }`,
        method: "GET"
      })
    }),
    addCategory: builder.mutation<
      ApiResponseMetadata<CategoriesResponse>,
      AddCategory
    >({
      invalidatesTags: ["Settings"],
      query: (DTO) => ({
        url: "/categories",
        method: "POST",
        body: DTO
      })
    }),

    addRepairService: builder.mutation<
      ApiResponseMetadata<CategoriesResponse>,
      AddCategory
    >({
      invalidatesTags: ["AddRepairService"],
      query: (DTO) => ({
        url: "/repair-services",
        method: "POST",
        body: DTO
      })
    }),

    deleteCategory: builder.mutation<
      ApiResponseMetadata<CategoriesResponse>,
      DeleteCategoryRequest
    >({
      invalidatesTags: ["Settings"],
      query: (DTO) => ({
        url: `/categories/${DTO?.id}`,
        method: "DELETE",
        body: DTO
      })
    }),
    deleteRepairService: builder.mutation<
      ApiResponseMetadata<CategoriesResponse>,
      DeleteCategoryRequest
    >({
      invalidatesTags: ["DeleteRepairService"],
      query: (DTO) => ({
        url: `/repair-services/${DTO?.id}`,
        method: "DELETE",
        body: DTO
      })
    }),
    updateCategory: builder.mutation<
      ApiResponseMetadata<CategoriesResponse>,
      UpdateCategoryRequest
    >({
      invalidatesTags: ["Settings"],
      query: (DTO) => ({
        url: `/categories/${DTO?.id}`,
        method: "PUT",
        body: {
          name: DTO?.name
        }
      })
    }),

    updateRepairService: builder.mutation<
      ApiResponseMetadata<CategoriesResponse>,
      UpdateCategoryRequest
    >({
      invalidatesTags: ["UpdateRepairService"],
      query: (DTO) => ({
        url: `/repair-services/${DTO?.id}`,
        method: "PATCH",
        body: {
          name: DTO?.name
        }
      })
    }),
    makeCategoryParent: builder.mutation<
      ApiResponseMetadata<CategoriesResponse>,
      MakeCategoryParentRequest
    >({
      invalidatesTags: ["Settings"],
      query: (DTO) => ({
        url: `/categories/${DTO?.id}/make-parent`,
        method: "PUT"
      })
    }),

    oxAppRelease: builder.query<
      ApiResponseMetadata<OxAppReleaseResponse>,
      void
    >({
      providesTags: ["oxAppRelease"],
      query: () => ({
        url: "https://dev-api.ox.rw/app/releases/latest",
        method: "GET"
      })
    }),

    getShiftPreferences: builder.query<
      ApiResponseMetadata<CategoriesResponse>,
      void
    >({
      providesTags: [],
      query: () => ({
        url: `/shift-preferences/current`,
        method: "GET"
      })
    }),

    addShiftPreferences: builder.mutation<
      ApiResponseMetadata<CategoriesResponse>,
      AddCategory
    >({
      invalidatesTags: [],
      query: (DTO) => ({
        url: `/shift-preferences`,
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
  useGetKPIsQuery,
  useLazyGetKPIsQuery,
  useAddKpiMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useMakeCategoryParentMutation,
  useAddRepairServiceMutation,
  useDeleteRepairServiceMutation,
  useUpdateRepairServiceMutation,
  useOxAppReleaseQuery,
  useLazyGetRepairServicesQuery,
  useGetShiftPreferencesQuery,
  useAddShiftPreferencesMutation
} = settingsApi;
