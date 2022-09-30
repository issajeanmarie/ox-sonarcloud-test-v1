/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from "react";

export type WarehouseHeaderTypes = {
  isModalVisible: boolean;
  showModal: () => void;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  query: any;
  sort: object;
  setSort: React.Dispatch<SetStateAction<object>>;
  data: any;
  dataLoading: boolean;
};
