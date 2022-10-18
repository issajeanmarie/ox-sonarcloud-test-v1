import React, { FC } from "react";

type InfoWrapperTypes = {
  title: string;
  infoItem: string;
};

const InfoWrapper: FC<InfoWrapperTypes> = ({ title, infoItem }) => {
  return (
    <div className={`flex gap-4 mb-4`}>
      <div className="w-1/6">
        <span className="font-bold text-sm">{title}:</span>
      </div>
      <span
        className={`text-sm ${
          title === "Transport Ref"
            ? "font-bold text-[#E3B221] underline"
            : "opacity-50"
        }   `}
      >
        {infoItem}
      </span>
    </div>
  );
};

export const OrderSummaryInfoWrapper: FC<InfoWrapperTypes> = ({
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
