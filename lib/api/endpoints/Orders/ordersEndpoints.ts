import {
  EditOrderRequestBody,
  Order,
  AddStopRequest,
  OrdersResponse,
  Order_Filter,
  EditStopRequest,
  OrderRequestBody,
  EditPaymentStatusRequest,
  EditTransactionRequest,
  SupportOrderRequest
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
        url: `/orders?page=${page || "0"}&size=${size || "40"}&depot=${
          depot || ""
        }&driver=${driver || ""}&truck=${truck || ""}&start=${
          start || ""
        }&end=${end || ""}&filter=${filter || ""}&momoRefCode=${
          momoRefCode || ""
        }`,
        method: "GET"
      })
    }),
    lhsOrders: builder.query<
      ApiResponseMetadata<{ content: OrdersResponse }>,
      void
    >({
      providesTags: ["Clients"],
      query: () => ({
        url: "/orders/lhs?size=10000000",
        method: "GET"
      })
    }),
    order: builder.query<Order | undefined, Query | number | any>({
      providesTags: ["Order"],
      query: ({ orderId }) => ({
        url: `/orders/${orderId}`,
        method: "GET"
      }),
      transformResponse: (response: ApiResponseMetadata<Order>) =>
        response.payload
    }),
    createOrder: builder.mutation<GenericResponse, OrderRequestBody>({
      invalidatesTags: ["Orders"],
      query: (data) => ({
        url: `/orders/`,
        method: "POST",
        body: data
      })
    }),
    supportOrder: builder.mutation<
      GenericResponse,
      { orderId: Query; data: SupportOrderRequest }
    >({
      invalidatesTags: ["Orders"],
      query: ({ orderId, data }) => ({
        url: `/orders/${orderId}/support-order`,
        method: "POST",
        body: data
      })
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
    changeOrderStatus: builder.mutation<
      GenericResponse,
      { id: number; data: { comment: string; status: "CANCEL" | "COMPLETE" } }
    >({
      invalidatesTags: ["Orders", "Order"],
      query: ({ data, id }) => ({
        url: `/orders/${id}/change-status`,
        body: data,
        method: "PATCH"
      })
    }),
    orderInvoice: builder.mutation<any, Query | any>({
      query: ({ orderId }) => {
        return {
          url: `/orders/${orderId}/invoice`,
          method: "GET",
          headers: {
            "content-type": "application/octet-stream"
          },
          responseHandler: (response) => response.blob()
        };
      }
    }),
    initiatePayment: builder.mutation<
      any,
      {
        orderId: number;
        data: { amount: number; phone: string };
        endpoint?: string;
      }
    >({
      invalidatesTags: ["Order", "Orders", "MoMoPayment"],
      query: ({ orderId, data, endpoint }) => ({
        url: `/${endpoint || "orders"}/${orderId}/momo-pay/initiate`,
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
    editPaymentStatus: builder.mutation<
      GenericResponse,
      { orderId: number; data: EditPaymentStatusRequest }
    >({
      invalidatesTags: ["Order"],
      query: ({ orderId, data }) => ({
        url: `/orders/${orderId}/pay`,
        method: "POST",
        body: data
      })
    }),
    editTransaction: builder.mutation<
      GenericResponse,
      { orderId: number; transactionId: number; data: EditTransactionRequest }
    >({
      invalidatesTags: ["Order"],
      query: ({ orderId, transactionId, data }) => ({
        url: `/orders/${orderId}/transactions/${transactionId}`,
        method: "PUT",
        body: data
      })
    }),
    writeOff: builder.mutation<
      GenericResponse,
      { orderId: number; data: { reason: string } }
    >({
      invalidatesTags: ["Order"],
      query: ({ orderId, data }) => ({
        url: `/orders/${orderId}/approve-write-off/`,
        method: "PATCH",
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
    }),
    uploadOrderDocument: builder.mutation({
      invalidatesTags: ["Order"],
      query: ({ id, ...DTO }) => ({
        url: `/orders/${id}/documents`,
        method: "POST",
        body: DTO
      })
    }),

    editOrderDocument: builder.mutation({
      invalidatesTags: ["Order"],
      query: ({ id, documentId, ...DTO }) => ({
        url: `/orders/${id}/documents/${documentId}`,
        method: "PATCH",
        body: DTO
      })
    }),

    lockOrder: builder.mutation({
      invalidatesTags: ["Order"],
      query: ({ id }) => ({
        url: `/orders/${id}/lock`,
        method: "PATCH"
      })
    })
  })
});

export const {
  useOrdersQuery,
  useLazyOrdersQuery,
  useEditPaymentStatusMutation,
  useLazyOrderQuery,
  useOrderInvoiceMutation,
  useCreateOrderMutation,
  useEditTransactionMutation,
  useWriteOffMutation,
  useDeleteStopMutation,
  useAddStopMutation,
  useEditStopMutation,
  useEditOrderMutation,
  useChangeOrderStatusMutation,
  useInitiatePaymentMutation,
  useSupportOrderMutation,
  useVerifyPaymentMutation,
  useLhsOrdersQuery,
  useUploadOrderDocumentMutation,
  useEditOrderDocumentMutation,
  useLockOrderMutation
} = ordersApi;
