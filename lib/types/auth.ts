export type RefreshResponse = {
  statusCode: number;
  payload: {
    refreshToken: string;
  };
};

export type LoginPayLoad = { value: any };

export type RegisterPayload = { value: any };

export type LoginResponse = { value: any };

export type RegisterResponse = { value: any };
