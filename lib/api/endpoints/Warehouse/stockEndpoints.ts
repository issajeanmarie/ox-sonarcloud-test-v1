import {
  Stock,
  StockResponse,
  DeleteStockRequest,
  EditStockLocationRequest,
  GetStock,
  PostStockRequest
} from "../../../types/Warehouses/Warehouse/stock";
import { ApiResponseMetadata } from "../../../types/shared";
import { baseAPI } from "../../api";

/**
 * Stock ENDPOINTS
 * @author  Patrick TUNEZERWANE
 * @authorEmail tunezepatrick@awesomity.rw
 * @since sep 25
 */

const stockEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    stock: builder.query<
      ApiResponseMetadata<{ content: StockResponse }>,
      GetStock
    >({
      providesTags: ["Stock"],
      query: (DTO) => ({
        url: `/warehouse-items?page=${DTO?.page}&size=${DTO?.size}&start=${DTO?.start}&end=${DTO?.end}&depot=${DTO?.depot}&status=${DTO?.status}`,
        method: "GET"
      })
    }),
    stockCategories: builder.query<
      ApiResponseMetadata<{ content: StockResponse }>,
      void
    >({
      providesTags: ["Stock"],
      query: () => ({
        url: "/warehouse-items/categories",
        method: "GET"
      })
    }),
    postStock: builder.mutation<ApiResponseMetadata<Stock>, PostStockRequest>({
      invalidatesTags: ["Stock"],
      query: (DTO) => ({
        url: `/warehouse-items`,
        method: "POST",
        body: DTO
      })
    }),

    deleteStock: builder.mutation<
      ApiResponseMetadata<Stock>,
      DeleteStockRequest
    >({
      invalidatesTags: ["Stock"],
      query: (DTO) => ({
        url: `/warehouse-items/${DTO?.id}`,
        method: "DELETE"
      })
    }),
    editStock: builder.mutation<
      ApiResponseMetadata<Stock>,
      EditStockLocationRequest
    >({
      invalidatesTags: ["Stock"],
      query: (DTO) => ({
        url: `/warehouse-items/${DTO?.id}`,
        method: "PATCH",
        body: DTO
      })
    })
  })
});

export const {
  useStockQuery,
  usePostStockMutation,
  useDeleteStockMutation,
  useEditStockMutation,
  useLazyStockQuery,
  useStockCategoriesQuery
} = stockEndpoints;
