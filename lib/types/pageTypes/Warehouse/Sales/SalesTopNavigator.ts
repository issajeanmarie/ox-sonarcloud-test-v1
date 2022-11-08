import { SetStateAction } from "react";

export type SalesTopNavigatorTypes = {
  isModalVisible: boolean;
  showModal: () => void;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  totalElements: number;
  isSalesLoading: boolean;
  setCurrentPages: React.Dispatch<SetStateAction<number>>;
  getSalesAction: any;
  isFetching: boolean;
  isFilterModalVisible: boolean;
  setIsFilterModalVisible: React.Dispatch<SetStateAction<boolean>>;
  isFiltered: boolean;
  setIsFiltered: React.Dispatch<SetStateAction<boolean>>;
};
