/* eslint-disable @typescript-eslint/no-explicit-any */
export type StockHistoryTableTypes = {
  id: number;
  enabled: boolean;
  category: any;
  inDate: string;
  parentCategoryName: string;
  categoryName: string;
  weight: number;
  expiryDate: string;
  lhsOrder: any;
  expired: boolean;
  supplierName: string;
  unitSellingPrice: number;
  unitBuyingPrice: number;
};
