/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EditSaleLocationRequest,
  GetSale,
  PostSaleRequest,
  CancelSaleRequest,
  GetSales,
  PostSalePaymentRequest,
  EditSaleTransactionRequest,
  SalesResponse,
  SingleSale
} from "../../../types/Warehouses/Sales/sale";
import { ApiResponseMetadata } from "../../../types/shared";
import { baseAPI } from "../../api";
import { PostSaleItemRequest } from "../../../types/Warehouses/Warehouse/stock";

/**
 * Sale ENDPOINTS
 * @author  Patrick TUNEZERWANE
 * @authorEmail tunezepatrick@awesomity.rw
 * @since sep 28
 */

const salesEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    sales: builder.query<SalesResponse, GetSales>({
      providesTags: ["Sales"],
      query: (DTO) => ({
        url: `sales?page=${DTO.page || ""}&size=${DTO.size || ""}&depot=${
          DTO.depot || ""
        }&driver=${DTO.driver || ""}&truck=${DTO.truck || ""}&start=${
          DTO.start || ""
        }&end=${DTO.end || ""}&filter=${DTO.filter || ""}&momoRefCode=${
          DTO.momoRefCode || ""
        }`,
        method: "GET"
      })
    }),

    saleDetails: builder.query<
      ApiResponseMetadata<{ content: SingleSale }>,
      GetSale
    >({
      providesTags: ["Sales", "MoMoPayment", "CancelSale"],
      query: (DTO) => ({
        url: `sales/${DTO?.id}`,
        method: "GET"
      })
    }),
    unPaginatedTrucks: builder.query<ApiResponseMetadata<any>, void>({
      providesTags: ["Trucks"],
      query: () => ({
        url: "/trucks/no-pagination",
        method: "GET"
      })
    }),
    postSale: builder.mutation<
      ApiResponseMetadata<SingleSale>,
      PostSaleRequest
    >({
      invalidatesTags: [],
      query: (DTO) => ({
        url: `/sales`,
        method: "POST",
        body: DTO
      })
    }),

    postSalePayment: builder.mutation<
      ApiResponseMetadata<SingleSale>,
      { orderId: number; data: PostSalePaymentRequest }
    >({
      invalidatesTags: ["Sales"],
      query: ({ orderId, data }) => ({
        url: `/sales/${orderId}/pay`,
        method: "POST",
        body: data
      })
    }),

    cancelSale: builder.mutation<
      ApiResponseMetadata<SingleSale>,
      CancelSaleRequest
    >({
      invalidatesTags: ["CancelSale"],
      query: (DTO) => ({
        url: `/sales/${DTO?.id}/cancel`,
        method: "PATCH"
      })
    }),
    editSale: builder.mutation<
      ApiResponseMetadata<SingleSale>,
      EditSaleLocationRequest
    >({
      invalidatesTags: ["Sales"],
      query: (DTO) => ({
        url: `/sales/${DTO?.id}`,
        method: "PATCH",
        body: DTO
      })
    }),
    editSaleTransaction: builder.mutation<
      ApiResponseMetadata<SingleSale>,
      EditSaleTransactionRequest
    >({
      invalidatesTags: ["Sales"],
      query: (DTO) => ({
        url: `sales/${DTO?.id}/transactions/${DTO?.transactionId}`,
        method: "PUT",
        body: DTO
      })
    }),

    addSaleItem: builder.mutation<
      ApiResponseMetadata<SingleSale>,
      PostSaleItemRequest
    >({
      invalidatesTags: ["Sales", "AddSaleItem"],
      query: (DTO) => ({
        url: `/sales/${DTO.saleId}/items`,
        method: "POST",
        body: DTO
      })
    }),

    deleteSaleItem: builder.mutation<
      ApiResponseMetadata<SingleSale>,
      PostSaleItemRequest
    >({
      invalidatesTags: ["Sales", "AddSaleItem"],
      query: (DTO) => ({
        url: `/sales/${DTO.saleId}/items/${DTO.itemId}`,
        method: "DELETE",
        body: DTO
      })
    }),

    editSaleDocument: builder.mutation({
      invalidatesTags: ["Sales"],
      query: ({ id, documentId, ...DTO }) => ({
        url: `/sales/${id}/documents/${documentId}`,
        method: "PATCH",
        body: DTO
      })
    }),

    uploadSaleDocument: builder.mutation({
      invalidatesTags: ["Sales"],
      query: ({ id, ...DTO }) => ({
        url: `/sales/${id}/documents`,
        method: "POST",
        body: DTO
      })
    })
  })
});

export const {
  useSalesQuery,
  usePostSaleMutation,
  useCancelSaleMutation,
  useEditSaleMutation,
  useLazySalesQuery,
  useUnPaginatedTrucksQuery,
  useSaleDetailsQuery,
  usePostSalePaymentMutation,
  useEditSaleTransactionMutation,
  useAddSaleItemMutation,
  useDeleteSaleItemMutation,
  useUploadSaleDocumentMutation,
  useEditSaleDocumentMutation
} = salesEndpoints;
