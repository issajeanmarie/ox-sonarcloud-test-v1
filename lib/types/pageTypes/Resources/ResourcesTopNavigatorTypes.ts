/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from "react";

export type ResourcesTopNavigatorTypes = {
  isModalVisible: boolean;
  showModal: () => void;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  resources: any;
  sort: object;
  setSort: React.Dispatch<SetStateAction<object>>;
};
