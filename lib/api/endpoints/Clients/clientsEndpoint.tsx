import {
  Client,
  ClientResponse,
  DeleteClientRequest,
  DownoadClients,
  GetClients
} from "../../../types/clients";
import { ApiResponseMetadata } from "../../../types/shared";
import { baseAPI } from "../../api";

/**
 * CLIENTS ENDPOINTS
 * @author Kundwa Bruno Materne (AWESOMITY LAB) & Patrick TUNEZERWANE
 * @authorEmail kundwabruno@awesomity.rw, tunezepatrick@awesomity.rw
 * @since Jul 19 2022, Sep 07 2022
 */

const clientsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    clients: builder.query<
      ApiResponseMetadata<{ content: ClientResponse }>,
      GetClients
    >({
      providesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients?page=${DTO?.page}&size=${DTO?.size}&org=${DTO?.org}&dest=${DTO?.dest}&hq=${DTO?.hq}&categoryId=${DTO?.categoryId}&q=${DTO?.q}&sort=${DTO?.sort}&source=${DTO?.source}`,
        method: "GET"
      })
    }),
    downloadClients: builder.query<
      ApiResponseMetadata<{ content: ClientResponse }>,
      DownoadClients
    >({
      providesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients?file_type=${DTO?.file_type}&org=${DTO?.org}&dest=${DTO?.dest}&hq=${DTO?.hq}&categoryId=${DTO?.categoryId}&q=${DTO?.q}&sort=${DTO?.sort}&source=${DTO?.source}`,
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
    }),
    deleteClient: builder.mutation<
      ApiResponseMetadata<Client>,
      DeleteClientRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id}`,
        method: "DELETE"
      })
    })
  })
});

export const {
  useClientsQuery,
  useClientQuery,
  useDownloadClientsQuery,
  useLazyDownloadClientsQuery,
  useDeleteClientMutation
} = clientsApi;
