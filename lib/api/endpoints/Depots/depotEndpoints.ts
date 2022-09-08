import { baseAPI } from "../../api";
import { DepotResponse } from "../../../types/depots";

const depotsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    depots: builder.query<DepotResponse, void>({
      providesTags: ["Depot", "Analytics", "Clients"],
      query: () => ({
        url: "/depots",
        method: "GET"
      })
    })
  })
});

export const { useDepotsQuery } = depotsEndpoints;
