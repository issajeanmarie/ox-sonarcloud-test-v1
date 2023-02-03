/* eslint-disable @typescript-eslint/no-explicit-any */
import { depotTypes } from "./depots";

export type GetAuthorizeResponse = any;

export type ExpenseResponse = {
  content: Expense[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: false;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: true;
    unpaged: false;
  };
  last: false;
  totalPages: number;
  totalElements: number;
  sort: {
    sorted: true;
    unsorted: false;
    empty: false;
  };
  numberOfElements: number;
  first: true;
  size: number;
  number: number;
  empty: false;
};

export type ExpenseStatus = "APPROVED" | "PENDING";

export type Expense = {
  date: string;
  amount: number;
  attachmentUrl: string;
  description: string;
  status: ExpenseStatus;
  qbId: string | null;
  qbDocNumber: string;
  qbAccountId: string;
  qbAccountName: string | null;
  qbCategoryId: string;
  qbCategoryName: string | null;
  qbSupplierId: string;
  qbSupplierName: string | null;
  qbTruckId: string;
  qbTruckName: string;
  qbPaymentMethodId: string;
  qbPaymentMethodName: string | null;
  qbLocationId: string;
  qbLocationName: string | null;
  qbTaxCalculation: string;
  qbPaymentType: string;
  hasEbm: boolean;
  id: number;
  depot: depotTypes;
};

export type PostExpenseRequest = {
  qbAccountId: string;
  qbCategoryId: string;
  qbSupplierId: string;
  qbSupplierName: string;
  qbTruckId: string;
  qbTruckName: string;
  qbPaymentMethodId: string;
  description: string;
  depotId: number;
  date: string;
  amount: number;
  attachmentUrl: string;
  qbPaymentType: string;
  qbLocationId: string;
  hasEbm: boolean;
};

export type EditExpenseRequest = {
  id: number;
  qbAccountId: string;
  qbCategoryId: string;
  qbSupplierId: string;
  qbSupplierName: string;
  qbTruckId: string;
  qbTruckName: string;
  qbPaymentMethodId: string;
  description: string;
  depotId: number;
  date: string;
  amount: number;
  attachmentUrl: string;
  qbPaymentType: string;
  qbLocationId: string;
  hasEbm: boolean;
};

export type DeleteExpenseRequest = {
  ids: number[];
};

export type ApproveExpenseRequest = {
  ids: number[];
};

export type GetExpenses = {
  page?: number | string;
  size?: number | string;
  sort?: string;
};

export type QBSchema = {
  Id: string;
  Name: string;
};
