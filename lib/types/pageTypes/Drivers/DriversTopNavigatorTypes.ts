/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from "react";

export type DriversTopNavigatorTypes = {
  isModalVisible: boolean;
  showModal: () => void;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  Drivers: any;
  isDriversLoading: boolean;
  handleSearch: (value: string) => void;
  onFilterChange: (status: string) => void;
  onSortChange: (sorter: string) => void;
};
