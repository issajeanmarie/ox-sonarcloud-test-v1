/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Sale,
  SaleResponse,
  EditSaleLocationRequest,
  GetSale,
  PostSaleRequest,
  CancelSaleRequest,
  GetSales
} from "../../../types/Warehouses/Sales/sale";
import { ApiResponseMetadata } from "../../../types/shared";
import { baseAPI } from "../../api";

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
        url: `sales?page=${DTO?.page}&size=${DTO?.size}`,
        method: "GET"
      })
    }),
    saleDetails: builder.query<
      ApiResponseMetadata<{ content: SaleResponse }>,
      GetSale
    >({
      providesTags: ["Sales"],
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
      invalidatesTags: ["Sales"],
      query: (DTO) => ({
        url: `/sales`,
        method: "POST",
        body: DTO
      })
    }),

    cancelSale: builder.mutation<ApiResponseMetadata<Sale>, CancelSaleRequest>({
      invalidatesTags: ["Sales"],
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
  useSaleDetailsQuery
} = salesEndpoints;
