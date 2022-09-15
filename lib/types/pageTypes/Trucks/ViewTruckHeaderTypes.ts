import { Query } from "../../shared";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ViewTruckHeaderTypes = {
  truckId: Query | number | undefined;
  truckData: any;
  isPageLoading: boolean;
};
