import { Order, OrdersResponse } from "../../../types/orders";
import { ApiResponseMetadata, Query } from "../../../types/shared";
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
        url: "/orders?page=0&size=40&depot=",
        method: "GET"
      })
    }),
    order: builder.query<Order | undefined, Query>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET"
      }),
      transformResponse: (response: ApiResponseMetadata<Order>) =>
        response.payload
    })
  })
});

export const { useLazyOrdersQuery, useLazyOrderQuery } = ordersApi;
