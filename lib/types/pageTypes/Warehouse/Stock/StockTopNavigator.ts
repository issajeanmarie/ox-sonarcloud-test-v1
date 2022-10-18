import { SetStateAction } from "react";

export type StockTopNavigatorTypes = {
  isModalVisible: boolean;
  showModal: () => void;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  selectedSort: object;
  setSelectedSort: React.Dispatch<SetStateAction<object>>;
  stocksNumber: number | undefined;
};
