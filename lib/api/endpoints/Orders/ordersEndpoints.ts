import {
  EditOrderRequestBody,
  Order,
  AddStopRequest,
  OrdersResponse,
  Order_Filter,
  EditStopRequest
} from "../../../types/orders";
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
    orders: builder.query<ApiResponseMetadata<OrdersResponse>, Order_Filter>({
      providesTags: ["Orders"],
      query: ({
        depot,
        driver,
        truck,
        page,
        size,
        start,
        end,
        filter,
        momoRefCode
      }) => ({
        url: `/orders?page=${page || ""}&size=${size || ""}&depot=${
          depot || ""
        }&driver=${driver || ""}&truck=${truck || ""}&start=${
          start || ""
        }&end=${end || ""}&filter=${filter || ""}&momoRefCode=${
          momoRefCode || ""
        }`,
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
    editOrder: builder.mutation<
      GenericResponse,
      { orderId: Query; data: EditOrderRequestBody }
    >({
      invalidatesTags: ["Order"],
      query: ({ orderId, data }) => ({
        url: `/orders/${orderId}`,
        method: "PATCH",
        body: data
      })
    }),
    cancelOrder: builder.mutation<
      GenericResponse,
      { id: number; data: { comment: string; status: "CANCEL" } }
    >({
      invalidatesTags: ["Orders", "Order"],
      query: ({ data, id }) => ({
        url: `/orders/${id}/change-status`,
        body: data,
        method: "PATCH"
      })
    }),
    orderInvoice: builder.mutation<any, Query | number>({
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
      GenericResponse,
      { orderId: number; referenceId: string }
    >({
      invalidatesTags: ["Order", "Orders"],
      query: ({ orderId, referenceId }) => ({
        url: `/orders/${orderId}/momo-pay/verify?referenceId=${referenceId}`,
        method: "GET"
      })
    }),
    addStop: builder.mutation<
      GenericResponse,
      { orderId: number; data: AddStopRequest }
    >({
      invalidatesTags: ["Order"],
      query: ({ orderId, data }) => ({
        url: `/orders/${orderId}/stops`,
        method: "POST",
        body: data
      })
    }),
    editStop: builder.mutation<
      GenericResponse,
      { orderId: number; stopId: number; data: EditStopRequest }
    >({
      invalidatesTags: ["Order"],
      query: ({ orderId, stopId, data }) => ({
        url: `/orders/${orderId}/stops/${stopId}`,
        method: "PUT",
        body: data
      })
    }),
    deleteStop: builder.mutation<
      GenericResponse,
      { orderId: Query; stopId: number }
    >({
      invalidatesTags: ["Order"],
      query: ({ orderId, stopId }) => ({
        url: `/orders/${orderId}/stops/${stopId}`,
        method: "DELETE"
      })
    })
  })
});

export const {
  useOrdersQuery,
  useLazyOrdersQuery,
  useLazyOrderQuery,
  useOrderInvoiceMutation,
  useDeleteStopMutation,
  useAddStopMutation,
  useEditStopMutation,
  useEditOrderMutation,
  useCancelOrderMutation,
  useInitiatePaymentMutation,
  useVerifyPaymentMutation
} = ordersApi;
