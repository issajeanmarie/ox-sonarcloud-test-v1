import {
  Client,
  ClientResponse,
  DeleteClientLocationRequest,
  DeleteClientRecipientRequest,
  DeleteClientRequest,
  DeleteClientTagRequest,
  DownoadClients,
  DownoadInvoice,
  EditClientLocationRequest,
  EditClientRecipientRequest,
  EditClientRequest,
  GetClient,
  GetClientOrders,
  GetClients,
  PostClientLocationRequest,
  PostClientNoteRequest,
  PostClientRecipientRequest,
  PostClientRequest,
  PostClientTagRequest
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
        url: `/clients${DTO.noPagination ? "/no-pagination" : ""}?page=${
          DTO?.page || "0"
        }&size=${DTO?.size || ""}&org=${DTO?.org || ""}&dest=${
          DTO?.dest || ""
        }&hq=${DTO?.hq || ""}&categoryId=${DTO?.categoryId || ""}&q=${
          DTO?.q || ""
        }&sort=${DTO?.sort || ""}&source=${DTO?.source || ""}`,
        method: "GET"
      })
    }),
    clientsUnpaginated: builder.query<
      ApiResponseMetadata<{ content: ClientResponse }>,
      void
    >({
      providesTags: ["Clients"],
      query: () => ({
        url: "/clients/no-pagination",
        method: "GET"
      })
    }),
    clientOrders: builder.query<
      ApiResponseMetadata<{ content: ClientResponse }>,
      GetClientOrders
    >({
      providesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id || ""}/orders?page=${DTO?.page || ""}&size=${
          DTO?.size || ""
        }&paymentStatus=${DTO?.paymentStatus || ""}`,
        method: "GET"
      })
    }),
    clientsUnpaginated: builder.query<
      ApiResponseMetadata<{ content: ClientResponse }>,
      void
    >({
      providesTags: ["Clients"],
      query: () => ({
        url: "/clients/no-pagination",
        method: "GET"
      })
    }),
    clientOrders: builder.query<
      ApiResponseMetadata<{ content: ClientResponse }>,
      GetClientOrders
    >({
      providesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id || ""}/orders?page=${DTO?.page || ""}&size=${
          DTO?.size || ""
        }&paymentStatus=${DTO?.paymentStatus || ""}`,
        method: "GET"
      })
    }),
    downloadClients: builder.query<
      ApiResponseMetadata<{ content: ClientResponse }>,
      DownoadClients
    >({
      providesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/download?file_type=${DTO?.file_type || "XLS"}&org=${
          DTO?.org || ""
        }&dest=${DTO?.dest || ""}&hq=${DTO?.hq || ""}&categoryId=${
          DTO?.categoryId || ""
        }&q=${DTO?.q || ""}&sort=${DTO?.sort || ""}&source=${
          DTO?.source || ""
        }`,
        method: "GET",
        headers: {
          "content-type": "application/octet-stream"
        },
        responseHandler: (response) => response.blob()
      })
    }),
    downloadClientInvoice: builder.query<
      ApiResponseMetadata<{ content: ClientResponse }>,
      DownoadInvoice
    >({
      providesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id || ""}/invoice`,
        method: "GET",
        headers: {
          "content-type": "application/octet-stream"
        },
        responseHandler: (response) => response.blob()
      })
    }),
    downloadClientInvoice: builder.query<
      ApiResponseMetadata<{ content: ClientResponse }>,
      DownoadInvoice
    >({
      providesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id || ""}/invoice`,
        method: "GET",
        headers: {
          "content-type": "application/octet-stream"
        },
        responseHandler: (response) => response.blob()
      })
    }),
    client: builder.query<ApiResponseMetadata<Client>, GetClient>({
      providesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id || ""}`,
        method: "GET",
        cache: "no-cache"
      })
    }),
    postClient: builder.mutation<
      ApiResponseMetadata<Client>,
      PostClientRequest
    >({
      invalidatesTags: [],
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
        url: `clients/${DTO?.id || ""}/offices`,
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
        url: `clients/${DTO?.id || ""}/affiliates`,
        method: "POST",
        body: DTO
      })
    }),
    postClientNote: builder.mutation<
      ApiResponseMetadata<Client>,
      PostClientNoteRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `clients/${DTO?.id || ""}/add-comment`,
        method: "PATCH",
        body: DTO
      })
    }),
    postClientTag: builder.mutation<
      ApiResponseMetadata<Client>,
      PostClientTagRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `clients/${DTO?.id || ""}/tag`,
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
        url: `clients/${DTO?.id || ""}/affiliates`,
        method: "POST",
        body: DTO
      })
    }),
    postClientNote: builder.mutation<
      ApiResponseMetadata<Client>,
      PostClientNoteRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `clients/${DTO?.id || ""}/add-comment`,
        method: "PATCH",
        body: DTO
      })
    }),
    postClientTag: builder.mutation<
      ApiResponseMetadata<Client>,
      PostClientTagRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `clients/${DTO?.id || ""}/tag`,
        method: "POST",
        body: DTO
      })
    }),
    deleteClient: builder.mutation<
      ApiResponseMetadata<Client>,
      DeleteClientRequest
    >({
      invalidatesTags: ["DeleteClient"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id || ""}`,
        method: "DELETE"
      })
    }),
    deleteClientTag: builder.mutation<
      ApiResponseMetadata<Client>,
      DeleteClientTagRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id || ""}/tag/${DTO.tagId || ""}`,
        method: "DELETE"
      })
    }),
    deleteClientTag: builder.mutation<
      ApiResponseMetadata<Client>,
      DeleteClientTagRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id || ""}/tag/${DTO.tagId || ""}`,
        method: "DELETE"
      })
    }),
    deleteClientLocation: builder.mutation<
      ApiResponseMetadata<Client>,
      DeleteClientLocationRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.clientId || ""}/offices/${DTO?.officeId || ""}`,
        method: "DELETE"
      })
    }),
    deleteClientRecipient: builder.mutation<
      ApiResponseMetadata<Client>,
      DeleteClientRecipientRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id || ""}/affiliates/${DTO?.affiliateId || ""}`,
        method: "DELETE"
      })
    }),
    deleteClientRecipient: builder.mutation<
      ApiResponseMetadata<Client>,
      DeleteClientRecipientRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id || ""}/affiliates/${DTO?.affiliateId || ""}`,
        method: "DELETE"
      })
    }),
    editClientLocation: builder.mutation<
      ApiResponseMetadata<Client>,
      EditClientLocationRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.clientId || ""}/offices/${DTO?.officeId || ""}`,
        method: "PUT",
        body: DTO
      })
    }),
    editClientRecipient: builder.mutation<
      ApiResponseMetadata<Client>,
      EditClientRecipientRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id || ""}/affiliates/${DTO?.affiliateId || ""}`,
        method: "PUT",
        body: DTO
      })
    }),
    editClient: builder.mutation<
      ApiResponseMetadata<Client>,
      EditClientRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id || ""}`,
        method: "PUT",
        body: DTO
      })
    }),
    editClientRecipient: builder.mutation<
      ApiResponseMetadata<Client>,
      EditClientRecipientRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id || ""}/affiliates/${DTO?.affiliateId || ""}`,
        method: "PUT",
        body: DTO
      })
    }),
    editClient: builder.mutation<
      ApiResponseMetadata<Client>,
      EditClientRequest
    >({
      invalidatesTags: ["Clients"],
      query: (DTO) => ({
        url: `/clients/${DTO?.id || ""}`,
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
  useLazyClientOrdersQuery,
  usePostClientMutation,
  useDeleteClientMutation,
  usePostClientLocationMutation,
  useDeleteClientLocationMutation,
  useEditClientLocationMutation,
  usePostClientRecipientMutation,
  useDeleteClientRecipientMutation,
  useEditClientRecipientMutation,
  usePostClientTagMutation,
  useDownloadClientInvoiceQuery,
  useLazyDownloadClientInvoiceQuery,
  useEditClientMutation,
  useDeleteClientTagMutation,
  usePostClientNoteMutation,
  useLazyClientsQuery,
  useClientsUnpaginatedQuery
} = clientsApi;
