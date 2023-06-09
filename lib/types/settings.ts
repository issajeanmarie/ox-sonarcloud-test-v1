/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * AUTH TYPES
 * @author Elie K. Gashagaza
 * @authorEmail gashagaza@awesomity.rw
 * @since Jul 2022
 */

export type ProfileResponse = {
  id: number;
  email: string;
  names: string;
  phone: string;
  role: string;
  enabled: boolean;
  gender: string;
  profilePic: string;
};
export type ProfileTypes = {
  names: string;
  phone: string;
  profilePic: string | null;
};

export type PasswordTypes = {
  currentPassword: string;
  newPassword: string;
};

export type KPIsResponse = {
  data: [];
  map: any;
};

export type CategoriesResponse = {
  data: [];
  map: any;
};

export type KPI = {
  targetPerDay: number;
  targetPerKm: number;
  kpi: [];
};

export type AddKPI = {
  kpis: {
    depotId: number;
    targetPerDay: number;
    targetPerKm: number;
  };
};

export type AddCategory = {
  name: string;
  parentCategoryId: string | null;
};

export type DeleteCategoryRequest = {
  id: number;
};

export type UpdateCategoryRequest = {
  id: number;
  name: string;
  // parentCategoryId: string | null;
};

export type UpdateRepairLogRequest = {
  id: number;
  repairId: number;
};

export type MakeCategoryParentRequest = {
  id: number;
};
export type OxAppReleaseResponse = {
  id: number;
  version: string;
  apkUrl: string;
  phone: string;
  releaseDateTime: string;
  size: boolean;
  changeLog: string;
};

export type GetRepairService = {
  page: number | undefined;
  size: number | undefined;
  query: string | undefined;
};
