import { Driver } from "./Accounts/drivers";
import { Query } from "./shared";
import { SingleTruckTypes } from "./trucksTypes";

export interface DepotResponse {
  status: number;
  message: string;
  payload: [
    {
      id: number;
      name: string;
      location: string;
      coordinates: string | null;
    }
  ];
}

export type depotTypes = {
  id: number;
  name: string;
  location?: string;
  coordinates?: string | null;
};

export interface CreateDepotRequest {
  name: string;
  location: string;
  coordinates: string;
}

export interface EditDepotRequest extends CreateDepotRequest {
  id: number | Query;
}

export interface ResolveRedFlagRequest {
  id: number | Query;
  redFlagId: number | string;
}

export type SelectedDepotTypes = {
  depotName: string | undefined;
  depotId: number | undefined;
};

export type DepotAlertModalTypes = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsJustifyFlagModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveFlag?: React.Dispatch<React.SetStateAction<any>>;
  activeFlag: SingleRedFlag | null;
};

export interface GetDepotProfileRequest {
  id: number;
  start?: string;
  end?: string;
}

export interface GetFlagsRequest extends GetDepotProfileRequest {
  search: string;
  page: number;
  size: number;
}

export interface GetSingleFlagRequest {
  id: number;
  redFlagId: number;
}

export interface GetDepotProfileResponse {
  message: string;
  payload: GetDepotProfilePayload;
}

export interface GetDepotProfilePayload {
  depot: SingleDepot;
  revenue: number;
  cashCollected: number;
  trucksAvailable: number;
  clients: number;
}

export interface SingleDepot {
  name: string;
  location: string;
  coordinates: null;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface DepotPageProps {
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  isDateCustom: boolean;
  setIsDateCustom: React.Dispatch<React.SetStateAction<boolean>>;
  depotsState: { depotId: number | undefined; depotName: string | undefined };
  selectedDay: any;
  setSelectedDay: React.Dispatch<React.SetStateAction<any>>;
  form: any;
}

export interface RedFlagResponse {
  message: string;
  payload: RedFlagPayload;
}

export interface RedFlagPayload {
  content: SingleRedFlag[];
  pageable: Pageable;
  totalPages: number;
  last: boolean;
  totalElements: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  empty: boolean;
}

export interface SingleRedFlagResponse {
  message: string;
  payload: SingleRedFlag;
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

export interface SingleRedFlag {
  id: number;
  status: string;
  type: string;
  date: Date;
  depot: SingleDepot;
  fuelRefill: {
    id: number;
    truck: SingleTruckTypes;
    date: Date;
    pos: string;
    receiptNumber: string;
    type: string;
    litres: number;
    amount: number;
    distance: number;
    odometer: number;
    shift: {
      id: number;
      driver: Driver;
      truck: SingleTruckTypes;
    };
  };
  lastRefuel: {
    id: number;
    truck: SingleTruckTypes;
    date: Date;
    pos: string;
    receiptNumber: string;
    type: string;
    litres: number;
    amount: number;
    distance: number;
    odometer: number;
    shift: {
      id: number;
      driver: Driver;
      truck: SingleTruckTypes;
    };
  };
}
