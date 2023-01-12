import React from "react";
import { Query } from "../../shared";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ViewTruckHeaderTypes = {
  truckId: Query | number | undefined;
  truckData: any;
  isPageLoading: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentTruckData?: any;
};
