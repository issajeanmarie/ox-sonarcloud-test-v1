/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from "react";

export type AdminsTopNavigatorTypes = {
  isModalVisible: boolean;
  showModal: () => void;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  Admins: any;
};
