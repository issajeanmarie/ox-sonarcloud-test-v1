import { Order, OrdersResponse } from "../../../types/orders";
import {
  ApiResponseMetadata,
  GenericResponse,
  Query
} from "../../../types/shared";
import { baseAPI } from "../../api";

/**
 * AUTH ENDPOINTS
 * @author Kundwa Bruno Materne (AWESOMITY LAB)
 * @authorEmail kundwabruno@awesomity.rw
 * @since Jul 19 2022
 */

const ordersApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    orders: builder.query<ApiResponseMetadata<OrdersResponse>, void>({
      providesTags: ["Orders"],
      query: () => ({
        url: "/orders?page=0&size=40&depot=1",
        method: "GET"
      })
    }),
    order: builder.query<Order | undefined, Query>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET"
      }),
      transformResponse: (response: ApiResponseMetadata<Order>) =>
        response.payload
    }),
    deleteOrder: builder.mutation<GenericResponse, Query>({
      invalidatesTags: ["Orders"],
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE"
      })
    }),
    orderInvoice: builder.query<any, Query>({
      query: (id) => ({
        url: `/orders/${id}/invoice`,
        method: "GET",
        headers: { "Content-Type": "application/octet-stream" },
        responseType: "blob",
        responseHandler: async (response) =>
          window.location.assign(
            window.URL.createObjectURL(await response.blob())
          ),
        cache: "no-cache"
      })
    })
  })
});

export const {
  useOrdersQuery,
  useLazyOrdersQuery,
  useLazyOrderQuery,
  useLazyOrderInvoiceQuery,
  useDeleteOrderMutation
} = ordersApi;
