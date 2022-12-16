/* eslint-disable @typescript-eslint/no-explicit-any */

export type SupplierResponse = Supplier[];

export type Supplier = {
  names: string;
  id: number;
  enabled: boolean;
  phone: string;
  tinNumber: null | string;
  offices: [
    {
      names: string;
      coordinates: string;
      location: string;
      id: number;
      type: string;
    }
  ];
};

export type PostSupplierRequest = {
  names: string;
  email: string;
  phone: string;
  location: string | undefined;
  coordinates: any;
  tinNumber: string;
  economicStatus: string;
};

export type GetSuppliers = {
  page: number | string;
  size: number | string;
  sort: string;
};

export type GetSupplier = {
  id: any;
};

export type DeleteSupplierRequest = {
  id: any;
};

export type ToggleSupplierRequest = {
  id: any;
};

export type EditSupplierRequest = {
  id: number | string | string[] | undefined;
  names: string;
  email: string;
  phone: string;
  tinNumber: string;
  economicStatus: string;
};
