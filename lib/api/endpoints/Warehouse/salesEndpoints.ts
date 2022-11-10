/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Sale,
  SaleResponse,
  EditSaleLocationRequest,
  GetSale,
  PostSaleRequest,
  CancelSaleRequest,
  GetSales,
  PostSalePaymentRequest,
  EditSaleTransactionRequest
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
    sales: builder.query<
      ApiResponseMetadata<{ content: SaleResponse }>,
      GetSales
    >({
      providesTags: ["Sales"],
      query: (DTO) => ({
        url: `sales?page=${DTO.page || ""}&size=${DTO.size || ""}&depot=${
          DTO.depot || ""
        }&driver=${DTO.driver || ""}&truck=${DTO.truck || ""}&start=${
          DTO.start || ""
        }&end=${DTO.end || ""}&filter=${DTO.filter || ""}`,
        method: "GET"
      })
    }),
    saleDetails: builder.query<
      ApiResponseMetadata<{ content: SaleResponse }>,
      GetSale
    >({
      providesTags: ["Sales", "AddSaleItem"],
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
    postSale: builder.mutation<ApiResponseMetadata<Sale>, PostSaleRequest>({
      invalidatesTags: [],
      query: (DTO) => ({
        url: `/sales`,
        method: "POST",
        body: DTO
      })
    }),

    postSalePayment: builder.mutation<
      ApiResponseMetadata<Sale>,
      { orderId: number; data: PostSalePaymentRequest }
    >({
      invalidatesTags: ["Sales"],
      query: ({ orderId, data }) => ({
        url: `/sales/${orderId}/pay`,
        method: "POST",
        body: data
      })
    }),

    cancelSale: builder.mutation<ApiResponseMetadata<Sale>, CancelSaleRequest>({
      invalidatesTags: [],
      query: (DTO) => ({
        url: `/sales/${DTO?.id}/cancel`,
        method: "PATCH"
      })
    }),
    editSale: builder.mutation<
      ApiResponseMetadata<Sale>,
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
      ApiResponseMetadata<Sale>,
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
      ApiResponseMetadata<Sale>,
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
      ApiResponseMetadata<Sale>,
      PostSaleItemRequest
    >({
      invalidatesTags: ["Sales", "AddSaleItem"],
      query: (DTO) => ({
        url: `/sales/${DTO.saleId}/items/${DTO.itemId}`,
        method: "DELETE",
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
  useDeleteSaleItemMutation
} = salesEndpoints;
