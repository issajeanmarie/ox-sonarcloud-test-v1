/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";

export type AgentsTableProps = {
  isModalVisible: boolean;
  showModal: any;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  Agents: any;
  isAgentsFetching: boolean;
};
