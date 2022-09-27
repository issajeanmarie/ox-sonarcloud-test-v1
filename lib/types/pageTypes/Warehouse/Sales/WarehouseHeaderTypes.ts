/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from "react";

export type WarehouseHeaderTypes = {
  isModalVisible: boolean;
  showModal: () => void;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  query: any;
};
