import {
  Client,
  ClientResponse,
  DeleteClientLocationRequest,
  DeleteClientRecipientRequest,
  DeleteClientRequest,
  DownoadClients,
  EditClientLocationRequest,
  GetClient,
  GetClientOrders,
  GetClients,
  PostClientLocationRequest,
  PostClientRecipientRequest,
  PostClientRequest
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
<<<<<<< HEAD
      query: (DTO) => ({
        url: `/clients?page=${DTO?.page}&size=${DTO?.size}&org=${DTO?.org}&dest=${DTO?.dest}&hq=${DTO?.hq}&categoryId=${DTO?.categoryId}&q=${DTO?.q}&sort=${DTO?.sort}&source=${DTO?.source}`,
=======
      query: () => ({
        url: "/clients?page=0&size=50",
>>>>>>> ft(support):implement support order
        method: "GET"
      })
    }),
    clientOrders: builder.query<
      ApiResponseMetadata<{ content: ClientResponse }>,
      GetClientOrders
    >({
      providesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id}/orders?page=${DTO?.page}&size=${DTO?.size}`,
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
    client: builder.query<ApiResponseMetadata<Client>, GetClient>({
      providesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id}`,
        method: "GET",
        cache: "no-cache"
      })
    }),
    postClient: builder.mutation<
      ApiResponseMetadata<Client>,
      PostClientRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients`,
        method: "POST",
        body: DTO
      })
    }),
    postClientLocation: builder.mutation<
      ApiResponseMetadata<Client>,
      PostClientLocationRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `clients/${DTO?.id}/offices`,
        method: "POST",
        body: DTO
      })
    }),
    postClientRecipient: builder.mutation<
      ApiResponseMetadata<Client>,
      PostClientRecipientRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `clients/${DTO?.id}/affiliates`,
        method: "POST",
        body: DTO
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
    }),
    deleteClientLocation: builder.mutation<
      ApiResponseMetadata<Client>,
      DeleteClientLocationRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.clientId}/offices/${DTO?.officeId}`,
        method: "DELETE"
      })
    }),
    deleteClientRecipient: builder.mutation<
      ApiResponseMetadata<Client>,
      DeleteClientRecipientRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id}/affiliates/${DTO?.affiliateId}`,
        method: "DELETE"
      })
    }),
    editClientLocation: builder.mutation<
      ApiResponseMetadata<Client>,
      EditClientLocationRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.clientId}/offices/${DTO?.officeId}`,
        method: "PUT",
        body: DTO
      })
    })
  })
});

export const {
  useClientsQuery,
  useClientQuery,
  useDownloadClientsQuery,
  useLazyDownloadClientsQuery,
  useClientOrdersQuery,
  usePostClientMutation,
  useDeleteClientMutation,
  usePostClientLocationMutation,
  useDeleteClientLocationMutation,
  useEditClientLocationMutation,
  usePostClientRecipientMutation,
  useDeleteClientRecipientMutation
} = clientsApi;
