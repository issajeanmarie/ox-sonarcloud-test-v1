import { OrderRequestBody } from "../orders";

export interface AddEditProps {
  mode: "edit" | "add";
  title: string;
  form: any;
  addOrderAction: (payload: OrderRequestBody) => void;
}
