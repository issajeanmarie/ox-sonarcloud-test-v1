/**
 * AUTH TYPES
 * @author Kundwa Bruno Materne (AWESOMITY LAB)
 * @authorEmail kundwabruno@awesomity.rw
 * @since Jul 19 2022
 */

import {
  Order_Status,
  Order_Status_Enums,
  PaymentStatus,
  Payment_Plan
} from "./shared";

export type OrderRequestBody = {
  officeId: number;
  clientId: number;
  depotId: number;
  stops: {
    name: string;
    location: string;
    coordinates: string;
    driverId: number;
    truckId: number;
    weight: number;
    position: number;
  }[];
  paymentPlan: Payment_Plan;
  amount: number;
  categoryId: number;
  startDateTime: string;
  atPickupLocation: boolean;
};

export type Order_Filter = {
  depot?: number | string;
  driver?: number | string;
  truck?: number | string;
  page?: number | string;
  size?: number | string;
  start?: string;
  end?: string;
  filter?: Order_Status_Enums | string;
  momoRefCode?: string;
};

export type OrdersResponse = {
  content: Order[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: false;
    };
    pageNumber: 0;
    pageSize: 10;
    offset: 0;
    paged: true;
    unpaged: false;
  };
  last: false;
  totalPages: 324;
  totalElements: 3237;
  sort: {
    sorted: true;
    unsorted: false;
    empty: false;
  };
  numberOfElements: 10;
  first: true;
  size: 10;
  number: 0;
  empty: false;
};

export type Order = {
  comment: null;
  momoRefCodes: "";
  isSupportOrder: false;
  waitTimeTransactions: [];
  duration: string;
  distance: string;
  status: Order_Status;
  depot: {
    coordinates?: string;
    name: string;
    location: string;
    id: number;
  };
  startDateTime: string;
  paymentStatus: PaymentStatus;
  deliveryCode: string;
  transactions: {
    amount: number;
    createdAt: string;
    id: number;
    momoRefCode: string;
    transactionType: string;
  }[];
  endDateTime: string;
  office: Office;
  totalAmount: number;
  paymentPlan: string;
  totalPaid: 0;
  category: {
    parentCategory?: any;
    subCategories: any[];
    name: string;
    id: 23;
  };
  trackingId: string;
  clientPhone: string;
  remainingAmount: number;
  stops: Stop[];
  id: number;
  lastEditedBy?: string;
  supportOrders: Order[];
};

export type Office = {
  names: string;
  coordinates: string;
  client: {
    names: string;
    phone: string;
    email: string;
    id: number;
  };
  location: string;
  id: number;
  type: string;
};

export type Stop = {
  position: number;
  truck: {
    active: boolean;
    model: string;
    plateNumber: string;
    capacity: number;
    trackingUnitSerialNumber: string;
    id: number;
  };
  coordinates: { lat: number; lng: number };
  arrivalDateTime?: string;
  odometer?: number;
  weight: number;
  departureDateTime: string;
  driver: {
    names: string;
    phone: string;
    email: string;
    id: number;
  };
  name: string;
  location: string;
  id: number;
};
