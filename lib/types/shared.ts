export type ApiResponseMetadata<T> = {
  statusCode: number;
  message?: string;
  payload?: T | any;
};

export type GenericResponse = ApiResponseMetadata<void>;

export type BackendErrorTypes = {
  data: {
    message: string;
    payload: [
      {
        fieldName: string;
        messageError: string;
        rejectedValue: string;
      }
    ];
  };
  status: number;
};

export type PaymentStatus =
  | "FULL_PAID"
  | "HALF_PAID"
  | "PENDING"
  | "WRITTEN_OFF"
  | "ENQUEUE";

export type Order_Status =
  | "COMPLETED"
  | "CANCELLED"
  | "PENDING"
  | "WRITTEN_OFF";

export type Order_Status_Enums =
  | "PAYMENT_PENDING"
  | "PAYMENT_WRITTEN_OFF"
  | "PAYMENT_PAID"
  | "PAYMENT_HALD_PAID"
  | "ORDER_ENQUEUE"
  | "ORDER_STARTED"
  | "ORDER_COMPLETED"
  | "ORDER_CANCELLED";

export type EconomicStatus = "INDIVIDUAL" | "COMPANY" | "GROUP";
export type Payment_Plan = "PAY_PER_JOB" | "PAY_PER_KG";

export type Query = string | string[] | undefined;

export type Office = {
  id: number;
  location: string;
  names: string;
  type: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

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

export type GenericResponse = ApiResponseMetadata<void>;

export type BackendErrorTypes = {
  data: {
    message: string;
    payload: any;
  };
  status: number;
};
