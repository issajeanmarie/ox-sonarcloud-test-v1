/* eslint-disable @typescript-eslint/no-explicit-any */

export type SaleResponse = Sale[];

export type Sale = {
  id: string;
};

export type PostSaleRequest = {
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
};

export type DeleteSaleRequest = {
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

export type GetSale = {
  page: number | string;
  size: number | string;
  start: string;
  end: string;
  depot: number | string;
  status: string;
};
