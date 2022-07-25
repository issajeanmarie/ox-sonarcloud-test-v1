/**
 * AUTH TYPES
 * @author Kundwa Bruno Materne (AWESOMITY LAB)
 * @authorEmail kundwabruno@awesomity.rw
 * @since Jul 19 2022
 */

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
  duration: "N/A";
  distance: "N/A";
  status: "ENQUEUE";
  depot: {
    coordinates: null;
    name: "Kayove Depot";
    location: "Kayove";
    id: 2;
  };
  startDateTime: "2022-07-19T15:40:00";
  paymentStatus: "PENDING";
  deliveryCode: "ROQD6";
  transactions: [];
  endDateTime: null;
  office: Office;
  totalAmount: 50000;
  paymentPlan: "PAY_BY_JOB";
  totalPaid: 0;
  category: {
    parentCategory?: {};
    subCategories: [];
    name: "Butter / Amavuta y'ubuto";
    id: 23;
  };
  trackingId: "3a8e1e15-f6ec-4976-8b37-3b94b7fe0ce1";
  clientPhone: "0784824295";
  remainingAmount: 50000;
  stops: Stop[];
  id: number;
  lastEditedBy?: string;
  supportOrders: [];
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
