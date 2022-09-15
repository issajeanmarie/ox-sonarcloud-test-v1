import React from "react";

/**
 * TRUCKS TYPES
 * @author Issa Jean Marie <jeanmarieissa@gmail.com>
 * @since August 2022
 */
export type LoadMoreTrucksResponse = {
  message: string;
  payload: string;
};

export type Inspection = {
  createdAt: string;
  dailyKms: number;
  id: number;
  odometer: number;
  score: number;
};

export type TruckSchema = {
  active: boolean;
  capacity: number;
  id: number;
  lastInspection?: Inspection;
  model: string;
  plateNumber: string;
  trackingOdometer?: number;
  trackingUnitSerialNumber: string;
};

export type CreateTruckRequest = {
  depotId: 0;
  model: string;
  plateNumber: string;
  capacity: 0;
  type: string;
  yearManufactured: 0;
  chassisNumber: string;
  engineNumber: string;
  fuelType: string;
  engineOilType: string;
  tireBrand: string;
  tireSize: string;
  trackingUnitSerialNumber: string;
  fuelCardAssigned: string;
};

export type LoadMoreTrucksRequest = {
  page?: number;
  size?: number;
  status?: string;
  sort?: string;
  search?: string;
};

export interface CreateTruckResponse {
  message: string;
  payload: string;
}

export type ToggleTruckRequest = {
  id: number;
};

export type ToggleTruckResponse = {
  message: string;
  payload: any;
};

export type SingleLogTypes = {
  odometer: string;
  images: [];
  inDate: string;
  outDate: string;
  serviceDone: [];
  spareParts: [];
  description: string;
  id: number;
  cost: number;
};

export type SingleTruckIssueTypes = {
  id: number;
  createdAt: string;
  description: string;
  status: string;
};

export interface TruckDataTypes extends CreateTruckRequest {
  truck: any;
  documents: any;
}

export interface CreateTruckIssueRequest {
  description: string;
  id: any;
}

export type TruckNewIssueProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ToggleTruckIssueRequest {
  truckId: number | any;
  issueId: number;
}

export interface ToogleTruckIssueResponse {
  message: string;
  payload: {
    payload: {
      createdAt: string;
      deletedAt: null;
      description: string;
      id: number;
      status: string;
      updatedAt: string;
    };
  };
}

export interface EditTruckRequest extends CreateTruckRequest {
  id: number;
}
