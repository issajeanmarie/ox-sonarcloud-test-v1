import { Dispatch, SetStateAction } from "react";

export type ClientsTableProps = {
  isModalVisible: boolean;
  showModal: () => void;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
};
