/* eslint-disable @typescript-eslint/no-explicit-any */
import { EconomicStatus, Office } from "./shared";

export type ClientResponse = Client[];

export type Client = {
  id: number;
  createdAt: string;
  email: string;
  names: string;
  phone: string;
  source: string;
  economicStatus: EconomicStatus;
  tinNumber: string;
  offices: Office[];
  location: string;
};

export type PostClientRequest = {
  names: string;
  email: string;
  phone: string;
  source: string;
  offices: [
    {
      location: string;
      coordinates: string;
      names: string;
      type: string;
    }
  ];
  location: string;
  coordinates: string;
  tinNumber: string;
  economicStatus: string;
};

export type PostClientLocationRequest = {
  id: number;
  location: string;
  coordinates: string;
  names: string;
  type: string;
};

export type PostClientRecipientRequest = {
  id: number;
  names: string;
  phone: string;
};

export type DeleteClientRequest = {
  id: any;
};

export type DeleteClientLocationRequest = {
  clientId: any;
  officeId: number;
};

export type DeleteClientRecipientRequest = {
  id: any;
  affiliateId: number;
};

export type EditClientLocationRequest = {
  clientId: any;
  officeId: number;
  location: string;
  coordinates: string;
  names: string;
  type: string;
};

export type GetClients = {
  page: number | string;
  size: number | string;
  org: string;
  dest: string;
  hq: string;
  categoryId: number | string;
  q: string;
  sort: string;
  source: string;
};

export type GetClient = {
  id: any;
};

export type DownoadClients = {
  file_type: string;
  org: string;
  dest: string;
  hq: string;
  categoryId: number | string;
  q: string;
  sort: string;
  source: string;
};

export type GetClientOrders = {
  id: any;
  page: number | string;
  size: number | string;
};
