/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from "react";

export type ExpensesTopNavigatorTypes = {
  showModal: () => void;
  isDeleteModalVisible: boolean;
  setIsDeleteModalVisible: React.Dispatch<SetStateAction<boolean>>;
  showDeleteModal: () => void;
  isApproveModalVisible: boolean;
  showApproveModal: () => void;
  setIsApproveModalVisible: React.Dispatch<SetStateAction<boolean>>;
  expenses: any;
  sort: object;
  setSort: React.Dispatch<SetStateAction<object>>;
  selectedRows: number[];
  approveSelected: () => void;
  isApproving: boolean;
  deleteSelected: () => void;
  isDeleting: boolean;
};
