/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from "react";

export type ClientsTopNavigatorTypes = {
  isModalVisible: boolean;
  showModal: () => void;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  clients: any;
  isClientsLoading: boolean;
  handleSearch: (value: string) => void;
  categories: any;
  handleDownloadClients: () => void;
  isDownloadingClientsLoading: boolean;
  defaultSelected: object;
  setDefaultSelected: React.Dispatch<SetStateAction<object>>;
  sort: object;
  setSort: React.Dispatch<SetStateAction<object>>;
};
