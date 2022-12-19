import { baseAPI } from "../../api";
import { CreateDepotRequest, DepotResponse } from "../../../types/depots";
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
    })
  })
});

export const { useDepotsQuery, useCreateDepotMutation } = depotsEndpoints;
