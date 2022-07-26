import { FC } from "react";
import { PaymentStatus } from "../../../lib/types/shared";
import { abbreviateNumber } from "../../../utils/numberFormatter";

interface PaymentStatusProps {
  amt: number;
  status: PaymentStatus;
}

const textStyles = "font-bold nowrap";

const PaymentStatus: FC<PaymentStatusProps> = ({ amt, status }) => {
  switch (status) {
    case "PENDING":
      return (
        <span className={`${textStyles} text-ox-orange`}>
          {abbreviateNumber(amt)} Rwf
        </span>
      );
    case "FULL_PAID":
      return (
        <span className={`${textStyles} text-gray-400`}>
          {abbreviateNumber(amt)} Rwf
        </span>
      );
    case "HALF_PAID":
      return <span className={textStyles}>{abbreviateNumber(amt)} Rwf</span>;
    case "WRITTEN _OFF":
      return (
        <span className={`${textStyles} text-ox-red`}>
          {abbreviateNumber(amt)} Rwf
        </span>
      );
    default:
      return null;
  }
};

export default PaymentStatus;
