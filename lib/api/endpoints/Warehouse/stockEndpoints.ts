import {
  Stock,
  StockResponse,
  EditStockLocationRequest,
  GetStock,
  PostStockRequest,
  DeleteBatchRequest
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
      providesTags: [],
      query: (DTO) => ({
        url: `/warehouse-items/batches?page=${DTO?.page || ""}&size=${
          DTO?.size || ""
        }&start=${DTO?.start || ""}&end=${DTO?.end || ""}&depot=${
          DTO?.depot || ""
        }&status=${DTO?.status || ""}&sort=${DTO?.sort || "DATE_DESC"}`,
        method: "GET"
      })
    }),

    warehouseItems: builder.query<
      ApiResponseMetadata<{ content: StockResponse }>,
      GetStock
    >({
      providesTags: ["CreateStock", "EditStock"],
      query: (DTO) => ({
        url: `/warehouse-items/batches?page=${DTO?.page || ""}&size=${
          DTO?.size || ""
        }&start=${DTO?.start || ""}&end=${DTO?.end || ""}&depot=${
          DTO?.depot || ""
        }&status=${DTO?.status || ""}&sort=${DTO?.sort || ""}`,
        method: "GET"
      })
    }),

    warehouseItems: builder.query<
      ApiResponseMetadata<{ content: StockResponse }>,
      GetStock
    >({
      providesTags: ["CreateStock", "EditStock"],
      query: (DTO) => ({
        url: `/warehouse-items?page=${DTO?.page || ""}&size=${
          DTO?.size || ""
        }&start=${DTO?.start || ""}&end=${DTO?.end || ""}&depot=${
          DTO?.depot || ""
        }&status=${DTO?.status || ""}&sort=${DTO?.sort || "DATE_DESC"}&search=${
          DTO?.search || ""
        }`,
        method: "GET"
      })
    }),

    warehouseItemBatches: builder.query<
      ApiResponseMetadata<{ content: StockResponse }>,
      GetStock
    >({
      providesTags: [],
      query: (DTO) => ({
        url: `/warehouse-items/${DTO.id}/batches?page=${DTO?.page || ""}&size=${
          DTO?.size || ""
        }&start=${DTO?.start || ""}&end=${DTO?.end || ""}&depot=${
          DTO?.depot || ""
        }&status=${DTO?.status || ""}&sort=${DTO?.sort || "DATE_DESC"}&search=${
          DTO?.search || ""
        }`,
        method: "GET"
      })
    }),

    warehouseItemBatches: builder.query<
      ApiResponseMetadata<{ content: StockResponse }>,
      GetStock
    >({
      providesTags: [],
      query: (DTO) => ({
        url: `/warehouse-items/${DTO.id}/batches?page=${DTO?.page || ""}&size=${
          DTO?.size || ""
        }&start=${DTO?.start || ""}&end=${DTO?.end || ""}&depot=${
          DTO?.depot || ""
        }&status=${DTO?.status || ""}&sort=${DTO?.sort || "DATE_DESC"}`,
        method: "GET"
      })
    }),
    postStock: builder.mutation<ApiResponseMetadata<Stock>, PostStockRequest>({
      invalidatesTags: ["CreateStock"],
      query: (DTO) => ({
        url: `/warehouse-items`,
        method: "POST",
        body: DTO
      })
    }),

    deleteBatch: builder.mutation<
      ApiResponseMetadata<Stock>,
      DeleteBatchRequest
    >({
      invalidatesTags: ["Stock"],
      query: (DTO) => ({
        url: `/warehouse-items/${DTO?.id}/batches/${DTO?.batchId}`,
        method: "DELETE"
      })
    }),
    editStock: builder.mutation<
      ApiResponseMetadata<Stock>,
      EditStockLocationRequest
    >({
      invalidatesTags: ["EditStock"],
      query: (DTO) => ({
        url: `/warehouse-items/${DTO?.id}/batches/${DTO?.batchId}`,
        method: "PATCH",
        body: DTO
      })
    })
  })
});

export const {
  useStockQuery,
  usePostStockMutation,
  useDeleteBatchMutation,
  useEditStockMutation,
  useLazyStockQuery,
  useLazyWarehouseItemsQuery,
  useLazyWarehouseItemBatchesQuery,
  useWarehouseItemsQuery
} = stockEndpoints;
