import { CheckboxChangeEvent } from "antd/es/checkbox";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnalyticMapTypes = {
  active: string;
  isCategoriesLoading: boolean;
  categories: any;
  onCategoryChange: (e: CheckboxChangeEvent) => void;
  mapData: any;
  mapLoading: boolean;
  mapFetching: boolean;
};
