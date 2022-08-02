import { FC } from "react";
import { PaymentStatus } from "../../../lib/types/shared";
import { abbreviateNumber } from "../../../utils/numberFormatter";

interface PaymentStatusProps {
  amt?: number;
  status: PaymentStatus;
}

const textStyles = "font-bold nowrap";

const PaymentStatus: FC<PaymentStatusProps> = ({ amt, status }) => {
  const value = amt ? abbreviateNumber(amt) + "RWF" : status;
  switch (status) {
    case "PENDING":
      return <span className={`${textStyles} text-ox-orange`}>{value}</span>;
    case "FULL_PAID":
      return <span className={`${textStyles} text-gray-400`}>{value}</span>;
    case "HALF_PAID":
      return <span className={textStyles}>{value}</span>;
    case "WRITTEN _OFF":
      return <span className={`${textStyles} text-ox-red`}>{value}</span>;
    default:
      return null;
  }
};

export default PaymentStatus;
