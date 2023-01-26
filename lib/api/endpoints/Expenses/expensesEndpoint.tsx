import {
  GetAuthorizeResponse,
  ExpenseResponse,
  GetExpenses,
  Expense,
  DeleteExpenseRequest,
  EditExpenseRequest,
  PostExpenseRequest
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
      query: (DTO) => ({
        url: `/quickbooks-expenses?page=${DTO?.page || "0"}&size=${
          DTO?.size || ""
        }&sort=${DTO?.sort || ""}`,
        method: "GET"
      })
    }),
    postExpense: builder.mutation<
      ApiResponseMetadata<Expense>,
      PostExpenseRequest
    >({
      invalidatesTags: [],
      query: (DTO) => ({
        url: `/quickbooks-expenses`,
        method: "POST",
        body: DTO
      })
    }),
    deleteExpense: builder.mutation<
      ApiResponseMetadata<Expense>,
      DeleteExpenseRequest
    >({
      invalidatesTags: ["Expenses"],
      query: (DTO) => ({
        url: `/quickbooks-expenses/${DTO?.id || ""}`,
        method: "DELETE"
      })
    }),
    editExpense: builder.mutation<
      ApiResponseMetadata<Expense>,
      EditExpenseRequest
    >({
      invalidatesTags: ["Expenses"],
      query: (DTO) => ({
        url: `/quickbooks-expenses/${DTO?.id || ""}`,
        method: "PATCH",
        body: DTO
      })
    })
  })
});

export const {
  useAuthorizeQuery,
  useLazyExpensesQuery,
  usePostExpenseMutation,
  useDeleteExpenseMutation,
  useEditExpenseMutation
} = expensesApi;
