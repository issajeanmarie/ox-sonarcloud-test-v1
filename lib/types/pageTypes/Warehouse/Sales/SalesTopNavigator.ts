import { SetStateAction } from "react";

export type SalesTopNavigatorTypes = {
  isModalVisible: boolean;
  showModal: () => void;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
};
