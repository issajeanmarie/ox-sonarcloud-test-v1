/* eslint-disable @typescript-eslint/no-explicit-any */

export type AdminResponse = Admin[];

export type Admin = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  email: string;
  names: string;
  phone: string;
  role: string;
  enabled: boolean;
  gender: null | string;
  profilePic: null | string;
};

export type PostAdminRequest = {
  names: string;
  email: string;
  isGuest: boolean;
  isSuperAdmin: boolean;
};

export type DeleteAdminRequest = {
  id: any;
};

export type EditAdminLocationRequest = {
  names: string;
  email: string;
  phone: string;
  isGuest: boolean;
  isSuperAdmin: boolean;
  id: number;
};

export type GetAdmins = {
  page: number | string;
  size: number | string;
};

export type ToggleAdminRequest = {
  id: any;
};

export type ResetPWDAdminRequest = {
  id: any;
};
