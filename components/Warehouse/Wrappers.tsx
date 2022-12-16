import { FC } from "react";

type StockTopContentWrapperTypes = {
  children: React.ReactNode;
};

//STOCK
export const StockTopContentWrapper: FC<StockTopContentWrapperTypes> = ({
  children
}) => {
  return <div className={`bg_light_white`}>{children}</div>;
};
