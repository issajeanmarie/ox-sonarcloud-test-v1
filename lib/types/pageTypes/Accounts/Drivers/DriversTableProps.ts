/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";

export type DriversTableProps = {
  isModalVisible: boolean;
  showModal: any;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  Drivers: any;
  isDriversFetching: boolean;
};
