/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from "react";

export type DriversTopNavigatorTypes = {
  isModalVisible: boolean;
  showModal: () => void;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  Drivers: any;
  handleSearch: (value: string) => void;
  selectedFilter: any;
  setSelectedFilter: any;
  selectedSort: any;
  setSelectedSort: any;
};
