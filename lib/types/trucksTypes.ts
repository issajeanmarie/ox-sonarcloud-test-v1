import React from "react";
import { Query } from "./shared";

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

export type DriverSchema = {
  id: number;
  names: string;
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
  content: any;
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
  id: number;
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

export interface DeleteTruckRepairLogRequest {
  repairId: number;
  id: number;
}

export interface DeleteMaintenanceCheckRequest {
  checkId: number;
  id: number;
}

export interface Payload {
  content: SingleMaintenanceInterface[];
  pageable: Pageable;
  totalElements: number;
  last: boolean;
  totalPages: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  empty: boolean;
}

export interface Main {
  message: string;
  payload: Payload;
}

export interface MaintenanceResponseTypes {
  content: SingleMaintenanceInterface[];
  pageable: Pageable;
  totalElements: number;
  last: boolean;
  totalPages: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  empty: boolean;
}

export interface SingleMaintenanceInterface {
  id: number;
  inspector: Inspector;
  mileage: number;
  observations: string;
  recommendations: string;
  overallCondition: OverallCondition;
  createdAt: Date;
  safeLoading: BrakeSystem;
  steeringMechanism: BrakeSystem;
  wheelsAndTires: BrakeSystem;
  windshieldAndAc: BrakeSystem;
  transmission: BrakeSystem;
  miscellaneous: BrakeSystem;
  brakeSystem: BrakeSystem;
  couplingDevices: BrakeSystem;
  engineOperation: BrakeSystem;
  exhaustSystem: BrakeSystem;
  fuelSystem: BrakeSystem;
  lightingDevices: BrakeSystem;
  suspension: BrakeSystem;
  safetyEquipment: BrakeSystem;
  date: string;
}

export interface BrakeSystem {
  additionalProp1: OverallCondition;
  additionalProp2: OverallCondition;
  additionalProp3: OverallCondition;
}

export enum OverallCondition {
  NeedsRepair = "NEEDS_REPAIR",
  Repaired = "Repaired"
}

export interface Inspector {
  names: string;
  id: number;
}

export interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface LastInspection {
  score: number;
  createdAt: string;
}

export interface SingleTruckTypes {
  id: number;
  plateNumber: string;
  lastInspection: LastInspection;
  model: string;
  capacity: number;
  active: boolean;
  minFuelPer100km: number | null;
  maxFuelPer100km: number | null;
}

export interface GetTruckNearByLocationsRequest {
  truckId: Query | number;
}

export interface GetTruckNearByLocationsResponse {
  message: string;
  payload: SingleNearByLocation[];
}

export interface SingleNearByLocation {
  name: string;
  distance: number;
}

export interface GetTruckNearByClientsResponse {
  message: string;
  payload: SingleNearByClient[];
}

export interface SingleNearByClient extends SingleNearByLocation {
  phone: string;
  coordinates: string;
  location: string;
  id: number;
}

export interface GetTruckMovementRequest {
  start: string | Date;
  end: string | Date;
  id: number | Query;
}

export interface GetTruckMovementResponse {
  message: string;
  payload: SingleMovement[];
}

export interface SingleMovement {
  latitude: number;
  longitude: number;
  deviceTime: Date | string;
  fixTime: Date | string;
  serverTime: Date | string;
}

export interface GetTruckOverviewRequest {
  id: number | Query | string;
  start: string;
  end: string;
}

export interface GetTruckOverviewResponse {
  message: string;
  payload: GetTruckOverviewResponse_Payload;
}

export interface GetTruckOverviewResponse_Payload {
  repairsDone: number;
  unresolvedIssues: number;
  outOfServiceDays: number;
  daysSinceLastRepair: number;
  kmsDriven: number;
  kmsSinceLastRepair: number;
  totalRepairCost: number;
  totalRevenues: number;
  totalFuelCost: number;
  totalKpis: number;
  ongoingOrder: GetTruckOverviewResponse_OngoingOrder;
  totalKGs: number;
}

export interface GetTruckOverviewResponse_OngoingOrder {
  status: string;
  paymentStatus: string;
  startDateTime: Date;
  endDateTime: Date;
  totalAmount: number;
  paymentPlan: string;
  originStop: GetTruckOverviewResponse_NStop;
  destinationStop: GetTruckOverviewResponse_NStop;
  id: number;
}

export interface GetTruckOverviewResponse_NStop {
  position: number;
  parsedCoordinates: GetTruckOverviewResponse_ParsedCoordinates;
  name: string;
  location: string;
  id: number;
  coordinates: string;
}

export interface GetTruckOverviewResponse_ParsedCoordinates {
  lat: number;
  lng: number;
}

export interface ViewTruckPassedProps_To_OverviewPane {
  truckOverViewData: GetTruckOverviewResponse_Payload | undefined;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
  endDate: string;
}

export interface GetTruckNoPaginationResponse {
  message: string;
  payload: GetTruckNoPaginationResponse_SingleTruck[];
}

export interface GetTruckNoPaginationResponse_SingleTruck {
  plateNumber: string;
  model: string;
  capacity: number;
  trackingLatitude: number;
  trackingLongitude: number;
  id: number;
}
