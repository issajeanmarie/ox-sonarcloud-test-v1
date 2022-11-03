import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../config/constants";

export const baseAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => {
      const localToken = localStorage.getItem("_ox_tkn_");
      if (localToken) headers.set("authorization", `Bearer ${localToken}`);
      return headers;
    }
  }),
  tagTypes: [
    "Auth",
    "Analytics",
    "Orders",
    "Categories",
    "Clients",
    "Order",
    "Depot",
    "Trucks",
    "Settings",
    "Tags",
    "Drivers",
    "Agents",
    "Admins",
    "Resources",
    "Stock",
    "Suppliers",
    "Sales",
    "CreateDepot",
    "DeleteClient",
    "CreateStock"
  ],
  endpoints: () => ({})
});
