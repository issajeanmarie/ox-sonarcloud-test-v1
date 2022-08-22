import { Client, ClientResponse } from "../../../types/clients";
import { ApiResponseMetadata } from "../../../types/shared";
import { baseAPI } from "../../api";

/**
 * CATEGORY ENDPOINTS
 * @author Kundwa Bruno Materne (AWESOMITY LAB)
 * @authorEmail kundwabruno@awesomity.rw
 * @since Jul 19 2022
 */

const clientsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    clients: builder.query<
      ApiResponseMetadata<{ content: ClientResponse }>,
      void
    >({
      providesTags: ["Clients"],
      query: () => ({
        url: "/clients",
        method: "GET"
      })
    }),
    client: builder.query<ApiResponseMetadata<Client>, number>({
      providesTags: ["Clients"],
      query: (id) => ({
        url: `/clients/${id}`,
        method: "GET",
        cache: "no-cache"
      })
    })
  })
});

export const { useClientsQuery, useClientQuery } = clientsApi;
