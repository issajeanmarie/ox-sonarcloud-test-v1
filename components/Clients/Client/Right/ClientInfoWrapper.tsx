import React, { FC } from "react";

type ClientInfoWrapperTypes = {
  title: string;
  infoItem: string;
};

const ClientInfoWrapper: FC<ClientInfoWrapperTypes> = ({ title, infoItem }) => {
  return (
    <div className={`flex gap-4 ${title !== "Email" && "mb-4"}`}>
      <div className="w-1/6">
        <span className="font-bold dark">{title}:</span>
      </div>
      <span className="font-normal opacity-50 dark">{infoItem}</span>
    </div>
  );
};

export default ClientInfoWrapper;
