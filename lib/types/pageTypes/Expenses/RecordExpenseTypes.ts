/* eslint-disable @typescript-eslint/no-explicit-any */

import { SetStateAction } from "react";
import { Expense } from "../../expenses";

export type RecordExpenseTypes = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  onRecordExpenseFinish: () => void;
  onEditExpenseFinish: (res: any) => void;
  isEdit?: boolean;
  editExpenseData?: Expense | null;
  onCancel: () => void;
  onQBAuthFailure: () => void;
};
