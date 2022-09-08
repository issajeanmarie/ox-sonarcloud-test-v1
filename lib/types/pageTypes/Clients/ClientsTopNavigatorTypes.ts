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
  isCategoriesLoading: boolean;
  onCategoryChange: (categoryID: number) => void;
  onSortChange: (sorter: string) => void;
  handleDownloadClients: () => void;
  isDownloadingClientsLoading: boolean;
};
