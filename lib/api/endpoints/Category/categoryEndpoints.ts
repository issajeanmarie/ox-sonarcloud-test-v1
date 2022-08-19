import { CategoryResponse } from "../../../types/categories";
import { ApiResponseMetadata } from "../../../types/shared";
import { baseAPI } from "../../api";

/**
 * CATEGORY ENDPOINTS
 * @author Kundwa Bruno Materne (AWESOMITY LAB)
 * @authorEmail kundwabruno@awesomity.rw
 * @since Jul 19 2022
 */

const ordersApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    categories: builder.query<ApiResponseMetadata<CategoryResponse>, void>({
      providesTags: ["Categories"],
      query: () => ({
        url: "/categories",
        method: "GET"
      })
    })
  })
});

export const { useCategoriesQuery } = ordersApi;
