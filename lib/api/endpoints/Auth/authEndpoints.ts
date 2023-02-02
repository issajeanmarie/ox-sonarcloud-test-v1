import {
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest
} from "../../../types/auth";
import { GenericResponse } from "../../../types/shared";
import { baseAPI } from "../../api";

/**
 * AUTH ENDPOINTS
 * @author Patrick TUNEZERWANE (AWESOMITY LAB)
 * @authorEmail tunezepatrick@awesomity.rw
 * @since Jul 18 2022
 */

const authApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (DTO) => ({
        url: "/auth/login",
        method: "POST",
        body: DTO
      })
    }),

    forgotPassword: builder.mutation<GenericResponse, ForgotPasswordRequest>({
      query: (DTO) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: DTO
      })
    }),

    resetPassword: builder.mutation<GenericResponse, ResetPasswordRequest>({
      query: (DTO) => ({
        url: `/auth/reset-password/${DTO?.token}`,
        method: "POST",
        body: DTO
      })
    }),

    verifyAdmin: builder.mutation<GenericResponse, ResetPasswordRequest>({
      query: (DTO) => ({
        url: `/auth/register-agent`,
        method: "POST",
        body: DTO
      })
    })
  })
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyAdminMutation
} = authApi;
