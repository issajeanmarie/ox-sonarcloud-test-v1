/**
 * AUTH TYPES
 * @author Patrick TUNEZERWANE (AWESOMITY LAB)
 * @authorEmail tunezepatrick@awesomity.rw
 * @since Jul 18 2022
 */

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  payload: string;
};

export type ForgotPasswordRequest = {
  username: string;
  fromFinance: boolean;
  fromApp: boolean;
};

export type ResetPasswordRequest = {
  password: string;
  token: string | string[] | undefined;
};
