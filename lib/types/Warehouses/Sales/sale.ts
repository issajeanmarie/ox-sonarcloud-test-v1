/* eslint-disable @typescript-eslint/no-explicit-any */

import { Order_Status, PaymentStatus } from "../../shared";

export interface SalesResponse {
  message: string;
  payload: SalesPayloadPayload;
}

export interface SalesPayloadPayload {
  content: SingleSale[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  empty: boolean;
}

export interface SingleSale {
  id: number;
  saleDate: Date;
  totalAmount: number;
  paymentPlan: string;
  paymentStatus: PaymentStatus;
  status: Order_Status;
  client: Client;
  depot: Depot;
  transportOrder: Order | null;
  lhsOrder: null;
  saleItems: SaleItem[];
  createdAt: Date;
  lastEditedBy: string;
  totalWeight: number;
}

export interface Client {
  id: number;
  names: string;
  email: string;
  phone: string;
}

export interface Depot {
  id: number;
  coordinates: null | string;
  location: string;
  name: string;
}

export interface SaleItem {
  id: number;
  weight: number;
  batch: Batch;
  unitSellingPrice: number;
  unitBuyingPrice: number;
}

export interface Batch {
  id: number;
  inDate: Date;
  expiryDate: Date;
  supplier: Supplier;
  weight: number;
  unitBuyingPrice: number;
  unitSellingPrice: number;
  lhsOrder: Order;
  warehouseItem: WarehouseItem;
  supplierName: string;
  parentCategoryName: string;
  categoryName: string;
  expired: boolean;
}

export interface Order {
  id: number;
  totalAmount: number;
  office: TransportOrderOffice;
  totalWeight: number;
}

export interface TransportOrderOffice {
  id: number;
  names: string;
  location: string;
  coordinates: string;
  type: string;
  client: Client;
}

export interface Supplier {
  offices: OfficeElement[];
  tinNumber: string;
  economicStatus: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  email: string;
  names: string;
  phone: string;
  role: string;
  enabled: boolean;
  gender: null;
  profilePic: null;
}

export interface OfficeElement {
  names: string;
  location: string;
  coordinates: string;
  type: string;
  orders: any[];
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface WarehouseItem {
  id: number;
  parentCategoryName: null | string;
  weight: number;
  unitSellingPrice: number;
  categoryName: string;
  expiryDate: Date;
  depotName: string;
}

export interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export type PostSaleRequest = {
  depotId: number;
  date: string;
  clientId: number;
  items: [
    {
      id: number;
      weight: number;
    }
  ];
  marginCost: number;
  localTransportCost: number;
  truckId: number;
  driverId: number;
  destination: {
    name: string;
    location: string;
    coordinates: string;
  };
};

export type PostSalePaymentRequest = {
  amount: number;
  paymentDate: string;
  momoRefCode: string;
  isWaitTimeFee: boolean;
};

export type CancelSaleRequest = {
  id: any;
};

export type EditSaleLocationRequest = {
  depotId: number;
  warehouseId: number;
  date: string;
  clientId: number;
  items: [
    {
      id: number;
      weight: number;
    }
  ];
  marginCost: number;
  localTransportCost: number;
  truckId: number;
  driverId: number;
  destination: {
    name: string;
    location: string;
    coordinates: string;
  };
  id: number;
};

export type EditSaleTransactionRequest = {
  momoRefCode: string;
  createdAt: string;
  amount: number;
  id: number;
  transactionId: number;
};

export type GetSales = {
  page: number | string;
  size: number | string;
  filter: string;
  start: string;
  end: string;
  momoRefCode: string;
  truck: string;
  driver: string;
  depot: number | string;
};

export type GetSale = {
  id: string | string[] | undefined;
};
