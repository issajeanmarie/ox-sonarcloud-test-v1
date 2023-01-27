import { Typography } from "antd";
import Link from "next/link";
import React, { FC } from "react";
import { routes } from "../../../../config/route-config";

const { Text } = Typography;

type InfoWrapperTypes = {
  title: string;
  infoItem: string;
  isTransportOrder: boolean;
  batchId?: number;
  isLink?: boolean;
  redirectTo?: string | number;
};

type OrderSummaryInfoWrapperTypes = {
  title: string;
  infoItem: string;
};

const InfoWrapper: FC<InfoWrapperTypes> = ({
  title,
  infoItem,
  isTransportOrder,
  batchId
}) => {
  return (
    <div className={`flex gap-12 mb-2`}>
      <div className="w-1/6">
        <span className="font-bold text-sm text_ellipsis">{title}:</span>
      </div>
      {isTransportOrder ? (
        <Link passHref href={routes.viewOrder.url + infoItem}>
          <span
            className={`text-sm cursor-pointer ${
              title === "Transport Ref"
                ? "font-bold text-[#E3B221] underline"
                : "opacity-50"
            }   `}
          >
            {infoItem}
          </span>
        </Link>
      ) : (
        <>
          <span
            className={`text-sm ${
              title === "Transport Ref"
                ? "font-bold text-[#E3B221] underline"
                : "opacity-50"
            }   `}
          >
            {infoItem}
          </span>

          <span className="text-sm font-bold text-[#E3B221]">
            {batchId ? `Batch #${batchId}` : ""}
          </span>
        </>
      )}
    </div>
  );
};

export const OrderSummaryInfoWrapper: FC<OrderSummaryInfoWrapperTypes> = ({
  title,
  infoItem
}) => {
  return (
    <div className={`flex gap-4 ${title !== "Email" && "mb-4"} items-center`}>
      <div className="w-1/4">
        <span className="font-bold text-sm">{title}:</span>
      </div>
      <Text
        className={`text-sm ${
          infoItem === "PENDING" ? "font-bold text-[#ED7818]" : "opacity-50"
        }   `}
      >
        {infoItem}
      </Text>
    </div>
  );
};

export default InfoWrapper;
