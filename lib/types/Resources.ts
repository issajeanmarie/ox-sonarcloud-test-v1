/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * AUTH TYPES
 * @author Elie K. Gashagaza
 * @authorEmail gashagaza@awesomity.rw
 * @since September 2022
 */

export type ResourceResponse = Resource[];
export type Resource = {
  id: number;
  title: string;
  link: string;
  createdAt: string;
};

export type GetResources = {
  id?: string | string[];
  page?: number | string;
  size?: number | string;
  status?: string;
  sort?: string | "";
  noPagination?: boolean | any;
};

export type PostResourceRquest = {
  title: string;
  link: string;
};

export type EditResourceRequest = {
  title: string;
  link: string;
  id: number;
};

export type DeleteResourceRequest = {
  id: any;
};
