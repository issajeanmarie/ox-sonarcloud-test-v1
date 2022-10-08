/* eslint-disable @typescript-eslint/no-explicit-any */

export type DriverResponse = Driver[];

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
  id: number;
};
