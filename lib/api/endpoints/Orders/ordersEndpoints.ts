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
      providesTags: ["Order"],
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
    orderInvoice: builder.mutation<any, Query>({
      query: (id) => ({
        url: `/orders/${id}/invoice`,
        method: "GET",
        headers: {
          "content-type": "application/octet-stream"
        },
        responseHandler: (response) => response.blob()
      })
    }),
    initiatePayment: builder.mutation<
      any,
      { orderId: number; data: { amount: number; phone: string } }
    >({
      query: ({ orderId, data }) => ({
        url: `/orders/${orderId}/momo-pay/initiate`,
        method: "POST",
        body: data
      })
    }),
    verifyPayment: builder.mutation<
      any,
      { orderId: number; referenceId: string }
    >({
      invalidatesTags: ["Order", "Orders"],
      query: ({ orderId, referenceId }) => ({
        url: `/orders/${orderId}/momo-pay/verify?referenceId=${referenceId}`,
        method: "GET"
      })
    })
  })
});

export const {
  useOrdersQuery,
  useLazyOrdersQuery,
  useLazyOrderQuery,
  useOrderInvoiceMutation,
  useDeleteOrderMutation,
  useInitiatePaymentMutation,
  useVerifyPaymentMutation
} = ordersApi;
