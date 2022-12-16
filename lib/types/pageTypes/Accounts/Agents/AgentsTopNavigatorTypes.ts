/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from "react";

export type AgentsTopNavigatorTypes = {
  isModalVisible: boolean;
  showModal: () => void;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  Agents: any;
};
