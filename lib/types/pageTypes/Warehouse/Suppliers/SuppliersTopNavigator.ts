import { SetStateAction } from "react";

export type SuppliersTopNavigatorTypes = {
  isModalVisible: boolean;
  showModal: () => void;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  sort: object;
  setSort: React.Dispatch<SetStateAction<object>>;
  data: any;
};
