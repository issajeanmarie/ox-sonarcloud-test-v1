export type ApiResponseMetadata<T> = {
  statusCode: number;
  message?: string;
  payload?: T | undefined;
};

export type GenericResponse = ApiResponseMetadata<void>;

export type BackendErrorTypes = {
  data: {
    message: string;
    payload: any;
  };
  status: number;
};
