import { baseAPI } from "../../api";
import {
  CreateDepotRequest,
  DepotResponse,
  EditDepotRequest,
  ResolveRedFlagRequest,
  GetDepotProfileRequest,
  GetDepotProfileResponse,
  GetFlagsRequest,
  GetSingleFlagRequest,
  RedFlagResponse,
  SingleRedFlagResponse
} from "../../../types/depots";
import { GenericResponse } from "../../../types/shared";

const depotsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    depots: builder.query<DepotResponse, void>({
      providesTags: ["Depot", "CreateDepot"],
      query: () => ({
        url: "/depots",
        method: "GET"
      })
    }),

    createDepot: builder.mutation<GenericResponse, CreateDepotRequest>({
      invalidatesTags: ["CreateDepot"],
      query: (data) => ({
        url: `/depots`,
        method: "POST",
        body: data
      })
    }),

    depotProfile: builder.query<
      GetDepotProfileResponse,
      GetDepotProfileRequest
    >({
      providesTags: ["EditDepot"],
      query: ({ id, start, end }) => ({
        url: `/depots/${id}/profile?start=${start}&end=${end}`,
        method: "GET"
      })
    }),

    getFlags: builder.query<RedFlagResponse, GetFlagsRequest>({
      providesTags: ["GetFlags"],
      query: ({ id, start, end, search, page, size }) => ({
        url: `/depots/${id}/red-flags?start=${start || ""}&end=${end}&search=${
          search || ""
        }&page=${page || 0}&size=${size || 1000}`,
        method: "GET"
      })
    }),

    editDepot: builder.mutation<GenericResponse, EditDepotRequest>({
      invalidatesTags: ["EditDepot"],
      query: (DTO) => ({
        url: `/depots/${DTO.id}`,
        method: "PUT",
        body: DTO
      })
    }),

    getSingleFlag: builder.query<SingleRedFlagResponse, GetSingleFlagRequest>({
      providesTags: ["GetSingleFlag"],
      query: ({ id, redFlagId }) => ({
        url: `/depots/${id}/red-flags/${redFlagId}`,
        method: "GET"
      })
    }),

    resolveRedFlag: builder.mutation<GenericResponse, ResolveRedFlagRequest>({
      invalidatesTags: ["GetSingleFlag", "GetFlags"],
      query: (DTO) => ({
        url: `/depots/${DTO.id}/red-flags/${DTO.redFlagId}/resolve`,
        method: "PATCH",
        body: DTO
      })
    }),

    justifyRedFlag: builder.mutation<GenericResponse, ResolveRedFlagRequest>({
      invalidatesTags: ["GetSingleFlag", "GetFlags"],
      query: (DTO) => ({
        url: `/depots/${DTO.id}/red-flags/${DTO.redFlagId}/justify`,
        method: "PATCH",
        body: DTO
      })
    })
  })
});

export const {
  useDepotsQuery,
  useCreateDepotMutation,
  useEditDepotMutation,
  useLazyDepotProfileQuery,
  useLazyGetFlagsQuery,
  useLazyGetSingleFlagQuery,
  useResolveRedFlagMutation,
  useJustifyRedFlagMutation
} = depotsEndpoints;
