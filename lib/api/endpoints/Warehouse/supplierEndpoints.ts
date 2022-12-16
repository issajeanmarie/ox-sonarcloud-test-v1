import {
  Supplier,
  SupplierResponse,
  DeleteSupplierRequest,
  EditSupplierRequest,
  GetSupplier,
  GetSuppliers,
  PostSupplierRequest,
  ToggleSupplierRequest
} from "../../../types/Warehouses/Suppliers/suppliers";
import { ApiResponseMetadata } from "../../../types/shared";
import { baseAPI } from "../../api";

/**
 * SupplierS ENDPOINTS
 * @author Patrick TUNEZERWANE
 * @authorEmail tunezepatrick@awesomity.rw
 * @since Sep 28 2022
 */

const supplierEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    suppliers: builder.query<
      ApiResponseMetadata<{ content: SupplierResponse }>,
      GetSuppliers
    >({
      providesTags: ["Suppliers"],
      query: (DTO) => ({
        url: `/suppliers?page=${DTO?.page || ""}&size=${DTO?.size || ""}&sort=${
          DTO?.sort || ""
        }`,
        method: "GET"
      })
    }),

    Supplier: builder.query<ApiResponseMetadata<Supplier>, GetSupplier>({
      providesTags: ["Suppliers"],
      query: (DTO) => ({
        url: `/Suppliers/${DTO?.id}`,
        method: "GET",
        cache: "no-cache"
      })
    }),
    postSupplier: builder.mutation<
      ApiResponseMetadata<Supplier>,
      PostSupplierRequest
    >({
      invalidatesTags: ["Suppliers"],
      query: (DTO) => ({
        url: `/suppliers`,
        method: "POST",
        body: DTO
      })
    }),

    deleteSupplier: builder.mutation<
      ApiResponseMetadata<Supplier>,
      DeleteSupplierRequest
    >({
      invalidatesTags: ["Suppliers"],
      query: (DTO) => ({
        url: `/suppliers/${DTO?.id}`,
        method: "DELETE"
      })
    }),
    toggleSupplier: builder.mutation<
      ApiResponseMetadata<Supplier>,
      ToggleSupplierRequest
    >({
      invalidatesTags: ["Suppliers"],
      query: (DTO) => ({
        url: `/suppliers/${DTO?.id}/toggle-active`,
        method: "PATCH"
      })
    }),
    editSupplier: builder.mutation<
      ApiResponseMetadata<Supplier>,
      EditSupplierRequest
    >({
      invalidatesTags: ["Suppliers"],
      query: (DTO) => ({
        url: `/suppliers/${DTO?.id}`,
        method: "PUT",
        body: DTO
      })
    })
  })
});

export const {
  useSuppliersQuery,
  useSupplierQuery,
  usePostSupplierMutation,
  useDeleteSupplierMutation,
  useEditSupplierMutation,
  useLazySuppliersQuery,
  useToggleSupplierMutation
} = supplierEndpoints;
