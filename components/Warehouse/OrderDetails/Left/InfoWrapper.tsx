import Link from "next/link";
import React, { FC } from "react";
import { routes } from "../../../../config/route-config";

type InfoWrapperTypes = {
  title: string;
  infoItem: string;
  isTransportOrder: boolean;
};

type OrderSummaryInfoWrapperTypes = {
  title: string;
  infoItem: string;
};

const InfoWrapper: FC<InfoWrapperTypes> = ({
  title,
  infoItem,
  isTransportOrder
}) => {
  return (
    <div className={`flex gap-4 mb-4`}>
      <div className="w-1/6">
        <span className="font-bold text-sm">{title}:</span>
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
        <span
          className={`text-sm ${
            title === "Transport Ref"
              ? "font-bold text-[#E3B221] underline"
              : "opacity-50"
          }   `}
        >
          {infoItem}
        </span>
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
      <div className="w-1/6">
        <span className="font-bold text-sm">{title}:</span>
      </div>
      <span
        className={`text-sm ${
          infoItem === "PENDING" ? "font-bold text-[#ED7818]" : "opacity-50"
        }   `}
      >
        {infoItem}
      </span>
    </div>
  );
};

export default InfoWrapper;
