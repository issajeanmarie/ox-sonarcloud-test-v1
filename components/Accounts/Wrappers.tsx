import React, { FC } from "react";

type AccountsMenusNavigatorWrapperTypes = {
  children: React.ReactNode;
};

type TableWrapperTypes = {
  children: React.ReactNode;
};

export const AccountsMenusNavigatorWrapper: FC<
  AccountsMenusNavigatorWrapperTypes
> = ({ children }) => {
  return (
    <div className="p-5 sticky top-16 right-0 left-0 z-30 bg-[#f8f8f8]">
      {children}
    </div>
  );
};

export const TableWrapper: FC<TableWrapperTypes> = ({ children }) => {
  return <div className="px-5">{children}</div>;
};
