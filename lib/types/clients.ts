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

export type DeleteClientRequest = {
  id: any;
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
