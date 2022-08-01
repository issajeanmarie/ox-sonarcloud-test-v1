import { OrdersResponse } from "../../../types/orders";
import { ApiResponseMetadata } from "../../../types/shared";
import { baseAPI } from "../../api";

/**
 * AUTH ENDPOINTS
 * @author Kundwa Bruno Materne (AWESOMITY LAB)
 * @authorEmail kundwabruno@awesomity.rw
 * @since Jul 19 2022
 */

const ordersApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    orders: builder.query<ApiResponseMetadata<OrdersResponse>, void>({
      query: () => ({
        url: "/orders?page=0&size=40&depot=3",
        method: "GET"
      })
    })
  })
});

export const { useLazyOrdersQuery } = ordersApi;
