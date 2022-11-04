/* eslint-disable @typescript-eslint/no-explicit-any */

export type StockResponse = Stock[];

export type Stock = {
  id: number;
  inDate: string;
  expiryDate: string;
  weight: number;
  unitCost: number;
  category: {
    id: number;
    name: string;
    parentCategory: {
      id: number;
      name: string;
    };
    subCategories: [];
  };
  lhsOrder: {
    id: number;
    startDateTime: string;
    endDateTime: null | string;
    totalAmount: number;
    paymentPlan: string;
    paymentStatus: string;
    status: string;
    deliveryCode: string;
    category: {
      id: number;
      name: string;
      parentCategory: null | string;
      subCategories: [];
    };
    depot: {
      id: number;
      coordinates: null | string;
      location: string;
      name: string;
    };
    office: {
      id: number;
      names: string;
      location: string;
      coordinates: string;
      type: string;
      client: {
        id: number;
        names: string;
        email: null | string;
        phone: string;
      };
    };
    stops: [
      {
        id: number;
        name: string;
        location: string;
        coordinates: string;
        position: number;
        arrivalDateTime: null | string;
        departureDateTime: null | string;
        odometer: null | string;
        weight: number;
        driver: {
          id: number;
          names: string;
          email: string;
          phone: string;
        };
        truck: {
          id: number;
          model: string;
          plateNumber: string;
          trackingUnitSerialNumber: string;
          capacity: number;
          active: boolean;
        };
      },
      {
        id: number;
        name: string;
        location: string;
        coordinates: string;
        position: number;
        arrivalDateTime: null | string;
        departureDateTime: null | string;
        odometer: null | string;
        weight: number;
        driver: {
          id: number;
          names: string;
          email: string;
          phone: string;
        };
        truck: {
          id: number;
          model: string;
          plateNumber: string;
          trackingUnitSerialNumber: string;
          capacity: number;
          active: boolean;
        };
      }
    ];
    transactions: [
      {
        id: number;
        amount: number;
        momoRefCode: string;
        transactionType: string;
        createdAt: string;
        date: string;
      }
    ];
    lastEditedBy: null | string;
    createdBy: string;
    supportOrders: [];
    totalPaid: number;
    remainingAmount: number;
    clientPhone: string;
    momoRefCodes: string;
    isSupportOrder: boolean;
  };
  enabled: boolean;
  parentCategory: {
    id: number;
    name: string;
  };
  supplierName: string;
};

export type PostStockRequest = {
  depotId: number;
  categoryId: number;
  batches: {
    inDate: string;
    expiryDate: string;
    supplierId: number | string;
    weight: number | string;
    lhsOrderId: number | string;
    unitBuyingPrice: number | string;
    unitSellingPrice: number | string;
  };
};

export type DeleteBatchRequest = {
  id: number;
  batchId: number;
};

export type EditStockLocationRequest = {
  inDate: string;
  expiryDate: string;
  supplierId: number;
  weight: number;
  unitCost: number;
  depotId: number;
  categoryId: number;
  lhsOrderId: number;
  id: number;
  batchId: number;
};

export type GetStock = {
  page: number | string;
  size: number | string;
  start: string;
  end: string;
  depot: number | string;
  status: string;
  sort: string;
  id?: number;
  search?: string;
};
