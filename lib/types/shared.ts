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

export type PaymentStatus =
  | "FULL_PAID"
  | "HALF_PAID"
  | "PENDING"
  | "WRITTEN _OFF"
  | "ENQUEQUE";

export type Query = string | string[] | undefined;

export type Pagination = {
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  empty: boolean;
};
