import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../config/constants";
import { removeCredentials, setCredentials } from "../redux/slices/authSlice";
import { RefreshResponse } from "../types/auth";
import Router from "next/router";

/**
 * @author Kundwa Bruno M <kundwabruno@gmail.com>
 * @since July 2022
 */

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  credentials: "include"
});

const baseQueryWithRefresh: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "GET",
        credentials: "include"
      },
      api,
      extraOptions
    );

    if ((refreshResult.data as RefreshResponse)?.statusCode === 200) {
      api.dispatch(
        setCredentials({
          refreshToken: (refreshResult.data as RefreshResponse).payload
            ?.refreshToken as string
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(removeCredentials());
      Router.push("/");
    }
  }
  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithRefresh,
  tagTypes: [],
  endpoints: () => ({})
});
