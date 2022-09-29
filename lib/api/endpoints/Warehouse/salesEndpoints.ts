/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Sale,
  SaleResponse,
  DeleteSaleRequest,
  EditSaleLocationRequest,
  GetSale,
  PostSaleRequest
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
    Sale: builder.query<
      ApiResponseMetadata<{ content: SaleResponse }>,
      GetSale
    >({
      providesTags: ["Sales"],
      query: (DTO) => ({
        url: `sales?page=${DTO?.page}&size=${DTO?.size}&start=${DTO?.start}&end=${DTO?.end}&depot=${DTO?.depot}&status=${DTO?.status}`,
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

    deleteSale: builder.mutation<ApiResponseMetadata<Sale>, DeleteSaleRequest>({
      invalidatesTags: ["Sales"],
      query: (DTO) => ({
        url: `/sales/${DTO?.id}`,
        method: "DELETE"
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
  useSaleQuery,
  usePostSaleMutation,
  useDeleteSaleMutation,
  useEditSaleMutation,
  useLazySaleQuery,
  useUnPaginatedTrucksQuery
} = salesEndpoints;
