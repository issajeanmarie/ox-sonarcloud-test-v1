import { SingleShift } from "../pageTypes/Accounts/Drivers/DriversTableTypes";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type DriverResponse = Driver[];

export interface DriverProfileResponse {
  message: string;
  payload: DriverProfile;
}

export interface SingleDriverResponse {
  message: string;
  payload: Driver;
}

export type DriverProfile = {
  totalRevenue: number;
  profileInfo: {
    enabled: true;
    role: string;
    names: string;
    shifts: SingleShift[];
    createdAt: string;
    ongoingShift: {
      id: number;
      startDateTime: string;
      endDateTime: string;
      distance: number;
      startingOdometer: number;
      coordinates: string;
      status: string;
    };
    email: string;
    drivingLicense: string;
    gender: string;
    phone: string;
    deletedAt: string;
    id: number;
  };
  ongoingOrders: number;
};

export type Driver = {
  enabled: boolean;
  role: string;
  names: string;
  email: string;
  gender: string;
  phone: string;
  drivingLicense: string;
  createdAt: string;
  deletedAt: string | null;
  id: number;
  ongoingShift: {
    id: number;
    startDateTime: string;
    endDateTime: string;
    distance: number;
    startingOdometer: number;
    coordinates: string;
    status: string;
  };
};

export type PostDriverRequest = {
  names: string;
  email: string;
  phone: string;
  drivingLicense: string;
  password: string;
  gender: string;
};

export type DeleteDriverRequest = {
  id: any;
};

export type EditDriverLocationRequest = {
  names: string;
  email: string;
  phone: string;
  gender: string;
  id: number;
};

export type GetDrivers = {
  page?: number | string;
  size?: number | string;
  status?: string;
  sort?: string;
  noPagination?: boolean | any;
  search?: string | undefined;
};

export type ToggleDriverRequest = {
  id: any;
};

export type MakeDriverDispatcherRequest = {
  id: any;
};

export type SeachDriverRequest = {
  search: string | undefined;
};

export type GetDriver = {
  id: number | string;
  page?: number;
  size?: number;
  status?: string;
};

export interface DriverShiftResponse {
  message: string;
  payload: Payload;
}

export interface Payload {
  content: Content[];
  pageable: Pageable;
  totalElements: number;
  last: boolean;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface Content {
  id: number;
  duration: string;
  distance: number;
  truck: Truck;
  startDateTime: Date;
  driver: { id: number; names: string };
  endDateTime: Date;
  endedBy: null;
}

export interface Truck {
  id: number;
  plateNumber: string;
  model: string;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface DriverLeftSideProps {
  selectedFilter: any;
  setSelectedFilter: React.Dispatch<React.SetStateAction<any>>;
  shifts: DriverShiftResponse | undefined;
  isLoading: boolean;
  showPagination: boolean;
  isLoadMoreLoading: boolean;
  handleLoadMore: () => void;
  driverData: DriverProfileResponse | undefined;
}

export interface DriverShiftSingleOrder {
  id: number;
  status: string;
  totalAmount: number;
  paymentStatus: string;
  startDateTime: string;
}

export interface DriverShiftOrders {
  message: string;
  payload: {
    orders: DriverShiftSingleOrder[];
    totalRevenue: number;
  };
}

export interface DriverOngoingShift {
  message: string;
  payload: {
    orders: DriverShiftSingleOrder[];
    totalRevenue: number;
  };
}
