/* eslint-disable @typescript-eslint/no-explicit-any */

export type RecordExpenseTypes = {
  onRecordExpenseFinish: (values: any) => void;
  isLoading: boolean;
  editExpenseData?: any;
};
