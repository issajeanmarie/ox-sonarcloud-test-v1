import {
  LoginResponse,
  RegisterResponse,
  LoginPayLoad,
  RegisterPayload
} from "../types/auth";
import { ApiResponseMetadata } from "../types/shared";
import { baseApi } from "./api";

/**
 * @author Kundwa Bruno M <kundwabruno@gmail.com>
 * @since July 2022
 */

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponseMetadata<LoginResponse>, LoginPayLoad>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload
      })
    }),
    register: builder.mutation<
      ApiResponseMetadata<RegisterResponse>,
      RegisterPayload
    >({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload
      })
    })
  })
});

export const { useLoginMutation, useRegisterMutation } = authApi;
