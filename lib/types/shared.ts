export type ApiResponseMetadata<T> = {
  statusCode: number;
  message?: string[] | string;
  payload?: T | undefined;
};
