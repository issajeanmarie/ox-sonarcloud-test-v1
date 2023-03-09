import { Expense } from "../../expenses";

export type ViewExpenseTypes = {
  expense: Expense;
  onQBAuthFailure: () => void;
};
