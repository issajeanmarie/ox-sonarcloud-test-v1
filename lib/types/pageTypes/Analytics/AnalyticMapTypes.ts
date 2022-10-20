import { CheckboxValueType } from "antd/lib/checkbox/Group";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnalyticMapTypes = {
  active: string | string[] | undefined;
  isCategoriesLoading: boolean;
  categories: any;
  onCategoryChange: (e: CheckboxValueType[], id: number) => void;
  mapData: any;
  mapLoading: boolean;
  mapFetching: boolean;
};
