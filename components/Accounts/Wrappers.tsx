import React, { FC } from "react";

type TableWrapperTypes = {
  children: React.ReactNode;
};

export const TableWrapper: FC<TableWrapperTypes> = ({ children }) => {
  return <>{children}</>;
};
