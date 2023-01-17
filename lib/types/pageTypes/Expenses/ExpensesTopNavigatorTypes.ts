/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from "react";

export type ExpensesTopNavigatorTypes = {
  isModalVisible: boolean;
  showModal: () => void;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  expenses: any;
  defaultSelected: object;
  setDefaultSelected: React.Dispatch<SetStateAction<object>>;
  sort: object;
  setSort: React.Dispatch<SetStateAction<object>>;
  setCurrentPages: React.Dispatch<SetStateAction<number>>;
};
