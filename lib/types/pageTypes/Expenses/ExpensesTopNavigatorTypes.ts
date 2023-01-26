/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from "react";

export type ExpensesTopNavigatorTypes = {
  showModal: () => void;
  isWarningModalVisible: boolean;
  showWarningModal: () => void;
  setIsWarningModalVisible: React.Dispatch<SetStateAction<boolean>>;
  expenses: any;
  sort: object;
  setSort: React.Dispatch<SetStateAction<object>>;
  selectedRows: number[];
  approveSelected: () => void;
  isApproving: boolean;
};
