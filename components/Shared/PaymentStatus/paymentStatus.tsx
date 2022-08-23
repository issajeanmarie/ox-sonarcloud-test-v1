import { FC } from "react";
import { Order_Status, PaymentStatus } from "../../../lib/types/shared";
import { abbreviateNumber } from "../../../utils/numberFormatter";

interface PaymentStatusProps {
  amt?: number;
  status: PaymentStatus | Order_Status;
}

const textStyles = "font-bold nowrap";

const PaymentStatus: FC<PaymentStatusProps> = ({ amt, status }) => {
  const value =
    amt !== undefined ? (amt && abbreviateNumber(amt)) + " RWF" : status;
  switch (status) {
    case "PENDING":
      return <span className={`${textStyles} text-ox-red`}>{value}</span>;
    case "FULL_PAID":
      return <span className={`${textStyles} text-black`}>{value}</span>;
    case "CANCELLED":
      return <span className={`${textStyles} text-ox-red`}>{value}</span>;
    case "COMPLETED":
      return <span className={`${textStyles} text-gray-400`}>{value}</span>;
    case "CANCELLED":
      return <span className={`${textStyles} text-gray-400`}>{value}</span>;
    case "COMPLETED":
      return <span className={`${textStyles} text-ox-dark`}>{value}</span>;
    case "HALF_PAID":
      return <span className={`${textStyles} text-ox-orange`}>{value}</span>;
    case "WRITTEN_OFF":
      return <span className={`${textStyles} text-gray-400`}>{value}</span>;
    case "ENQUEUE":
      return <span className={`${textStyles} text-ox-dark`}>{value}</span>;
    default:
      return <span className={`${textStyles} text-ox-dark`}>{value}</span>;
  }
};

export default PaymentStatus;
