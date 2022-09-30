import { FC } from "react";

type WarehouseMenusNavigatorWrapperTypes = {
  children: React.ReactNode;
};

type StockTopContentWrapperTypes = {
  children: React.ReactNode;
};

//WAREHOUSE IN GENERAL
export const WarehoueMenusNavigatorWrapper: FC<
  WarehouseMenusNavigatorWrapperTypes
> = ({ children }) => {
  return (
    <div className="p-5 sticky top-16 right-0 left-0 z-30 bg-[#f8f8f8]">
      {children}
    </div>
  );
};

//STOCK
export const StockTopContentWrapper: FC<StockTopContentWrapperTypes> = ({
  children
}) => {
  return (
    <div className={`bg_light_white  sticky top-44 z-10 `}>{children}</div>
  );
};
