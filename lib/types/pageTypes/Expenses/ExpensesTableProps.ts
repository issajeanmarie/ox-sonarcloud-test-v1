/* eslint-disable @typescript-eslint/no-explicit-any */
import { Expense } from "../../expenses";

export type ExpensesTableProps = {
  expenses: any;
  isExpensesFetching: boolean;
  onSelectRows?: (rows: number[]) => void;
  showEditModal: (record: Expense) => void;
};
