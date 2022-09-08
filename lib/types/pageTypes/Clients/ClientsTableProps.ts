/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";

export type ClientsTableProps = {
  isModalVisible: boolean;
  showModal: any;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  clients: any;
  isClientsFetching: boolean;
};
