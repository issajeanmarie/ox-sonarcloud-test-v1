/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from "react";

export type ClientsTopNavigatorTypes = {
  isModalVisible: boolean;
  showModal: () => void;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  clients: any;
  handleSearch: (value: string) => void;
  categories: any;
  handleDownloadClients: () => void;
  isDownloadingClientsLoading: boolean;
  setDefaultSelected: React.Dispatch<SetStateAction<object | string>>;
  sort: object;
  setSort: React.Dispatch<SetStateAction<object>>;
  setCurrentPages: React.Dispatch<SetStateAction<number>>;
  setStart: React.Dispatch<SetStateAction<string>>;
  setEnd: React.Dispatch<SetStateAction<string>>;
};
