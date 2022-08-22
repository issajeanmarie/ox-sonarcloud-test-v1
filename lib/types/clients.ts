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
