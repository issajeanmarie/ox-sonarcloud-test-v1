import { baseAPI } from "../../api";
import {
  CreateDepotRequest,
  DepotResponse,
  EditDepotRequest,
  GetDepotProfileRequest,
  GetDepotProfileResponse,
  GetFlagsRequest,
  RedFlagResponse
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
      providesTags: ["EditDepot"],
      query: ({ id, start, end, search, page, size }) => ({
        url: `/depots/${id}/red-flags?start=${start}&end=${end}&search=${search}&page=${page}&size=${size}`,
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
    })
  })
});

export const {
  useDepotsQuery,
  useCreateDepotMutation,
  useEditDepotMutation,
  useLazyDepotProfileQuery,
  useLazyGetFlagsQuery
} = depotsEndpoints;
