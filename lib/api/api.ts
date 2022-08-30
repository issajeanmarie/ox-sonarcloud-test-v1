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
  tagTypes: ["Auth", "Analytics", "Settings"],
  endpoints: () => ({})
});
