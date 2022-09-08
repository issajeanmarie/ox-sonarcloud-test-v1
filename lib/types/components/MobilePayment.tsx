import { Dispatch, SetStateAction } from "react";
import { Order } from "../orders";

export interface MobilePaymentProps {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  order: Order;
}
