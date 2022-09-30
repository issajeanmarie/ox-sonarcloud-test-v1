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
      names: string | undefined;
      type: string;
    }
  ];
  location: string | undefined;
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
export type PostClientTagRequest = {
  id: number | string | string[] | undefined;
  name: string;
};

export type PostClientRecipientRequest = {
  id: number;
  names: string;
  phone: string;
};

export type PostClientNoteRequest = {
  id: number;
  comment: string;
};

export type DeleteClientRequest = {
  id: any;
};

export type DeleteClientTagRequest = {
  id: any;
  tagId: number | undefined;
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

export type EditClientRecipientRequest = {
  id: number | string | string[] | undefined;
  affiliateId: number;
  names: string;
  phone: string;
};

export type EditClientRequest = {
  id: number | string | string[] | undefined;
  names: string;
  email: string;
  phone: string;
  source: string;
  tinNumber: string;
  economicStatus: string;
};

export type GetClients = {
  page?: number | string;
  size?: number | string;
  org?: string;
  dest?: string;
  hq?: string;
  categoryId?: number | string;
  q?: string;
  sort?: string;
  source?: string;
  noPagination?: boolean;
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

export type DownoadInvoice = {
  id: string | string[] | undefined | number;
};

export type GetClientOrders = {
  id: any;
  page: number | string;
  size: number | string;
  paymentStatus: string;
};
