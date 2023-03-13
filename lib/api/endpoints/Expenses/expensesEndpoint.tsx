import { buildQueryFromArray } from "../../../../utils/buildQuery";
import {
  GetAuthorizeResponse,
  ExpenseResponse,
  GetExpenses,
  Expense,
  DeleteExpenseRequest,
  EditExpenseRequest,
  PostExpenseRequest,
  QBSchema,
  ApproveExpenseRequest,
  DownloadExpenseRequest
} from "../../../types/expenses";
import { ApiResponseMetadata } from "../../../types/shared";
import { baseAPI } from "../../api";

/**
 * EXPENSES ENDPOINTS
 * @author Elvis Rugamba
 * @authorEmail elvisrugamba@awesomity.rw
 * @since Jan 2023
 */

const expensesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    authorize: builder.query<ApiResponseMetadata<GetAuthorizeResponse>, void>({
      query: () => ({
        providesTags: ["ExpensesAuthorize"],
        url: "/quickbooks-expenses/authorize",
        method: "GET"
      })
    }),
    expenses: builder.query<
      ApiResponseMetadata<{ content: ExpenseResponse }>,
      GetExpenses
    >({
      providesTags: ["Expenses"],
      query: ({ page, size, sort }) => ({
        url: `/quickbooks-expenses?page=${page || "0"}&size=${
          size || ""
        }&sort=${sort || ""}`,
        method: "GET"
      })
    }),
    postExpense: builder.mutation<
      ApiResponseMetadata<Expense>,
      PostExpenseRequest
    >({
      invalidatesTags: ["Expenses"],
      query: ({ formData }) => ({
        url: `/quickbooks-expenses`,
        method: "POST",
        body: formData
      })
    }),
    deleteExpense: builder.mutation<
      ApiResponseMetadata<Expense>,
      DeleteExpenseRequest
    >({
      invalidatesTags: ["Expenses"],
      query: ({ ids }) => ({
        url: `/quickbooks-expenses?${buildQueryFromArray("ids", ids)}`,
        method: "DELETE"
      })
    }),
    editExpense: builder.mutation<
      ApiResponseMetadata<Expense>,
      EditExpenseRequest
    >({
      invalidatesTags: ["Expenses"],
      query: ({ id, formData }) => ({
        url: `/quickbooks-expenses/${id || ""}`,
        method: "PATCH",
        body: formData
      })
    }),
    suppliers: builder.query<ApiResponseMetadata<{ content: QBSchema }>, void>({
      providesTags: ["QBSuppliers"],
      query: () => ({
        url: "/quickbooks-expenses/vendors",
        method: "GET"
      })
    }),
    trucks: builder.query<ApiResponseMetadata<{ content: QBSchema }>, void>({
      providesTags: ["QBTrucks"],
      query: () => ({
        url: "/quickbooks-expenses/classes",
        method: "GET"
      })
    }),
    locations: builder.query<ApiResponseMetadata<{ content: QBSchema }>, void>({
      providesTags: ["QBLocations"],
      query: () => ({
        url: "/quickbooks-expenses/locations",
        method: "GET"
      })
    }),
    paymentMethods: builder.query<
      ApiResponseMetadata<{ content: QBSchema }>,
      void
    >({
      providesTags: ["QBPaymentMethods"],
      query: () => ({
        url: "/quickbooks-expenses/payment-methods",
        method: "GET"
      })
    }),
    accounts: builder.query<ApiResponseMetadata<{ content: QBSchema }>, void>({
      providesTags: ["QBAccounts"],
      query: () => ({
        url: "/quickbooks-expenses/accounts",
        method: "GET"
      })
    }),
    categories: builder.query<ApiResponseMetadata<{ content: QBSchema }>, void>(
      {
        providesTags: ["QBCategories"],
        query: () => ({
          url: "/quickbooks-expenses/categories",
          method: "GET"
        })
      }
    ),
    approve: builder.mutation<
      ApiResponseMetadata<Expense>,
      ApproveExpenseRequest
    >({
      invalidatesTags: ["Expenses"],
      query: (DTO) => ({
        url: "/quickbooks-expenses/approve",
        method: "PATCH",
        body: DTO
      })
    }),
    downloadFromServer: builder.query<File, DownloadExpenseRequest>({
      query: ({ id }) => ({
        url: `quickbooks-expenses/${id}/attachable/server/download`,
        method: "GET",
        headers: {
          "content-type": "application/octet-stream"
        },
        responseHandler: (response) => response.blob()
      })
    }),
    downloadFromQB: builder.query<
      ApiResponseMetadata<string>,
      DownloadExpenseRequest
    >({
      query: ({ id }) => ({
        url: `quickbooks-expenses/${id}/attachable/qb/download`,
        method: "GET"
      })
    })
  })
});

export const {
  useLazyAuthorizeQuery,
  useLazyExpensesQuery,
  usePostExpenseMutation,
  useDeleteExpenseMutation,
  useEditExpenseMutation,
  useSuppliersQuery,
  useTrucksQuery,
  useLocationsQuery,
  usePaymentMethodsQuery,
  useAccountsQuery,
  useCategoriesQuery,
  useApproveMutation,
  useLazyDownloadFromServerQuery,
  useLazyDownloadFromQBQuery
} = expensesApi;
