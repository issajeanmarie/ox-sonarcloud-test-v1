/* eslint-disable @typescript-eslint/no-explicit-any */
import { LatLng } from "use-places-autocomplete";

export type AddWarehouseOrderTypes = {
  sale?: any;
  setLocation: React.Dispatch<
    React.SetStateAction<
      | {
          name: string;
          coordinates: LatLng;
        }
      | undefined
    >
  >;
  location:
    | {
        name: string;
        coordinates: LatLng;
      }
    | undefined;
  createItems: () => void;
  setItems: React.Dispatch<React.SetStateAction<any>>;
  items: [
    {
      id: number;
      weight: string;
      type: string;
      stockItem: string;
    }
  ];
  onTransportChange: any;
  transport: any;
  onAddSaleFinish?: any;
  onEditSaleFinish?: any;
  form: any;
  handleChangeWarehouse: (value: string) => void;
  isPostingSale: boolean;
  handleChangeWeight: (value: number | null) => void;
  weight: number | null;
  warehouse: {
    id: number;
    weight: number;
    category: {
      id: number;
      name: string;
      parentCategory: {
        id: number;
        name: string;
      };
    };
  };
};

export type WarehouseItemsTableTypes = {
  id: number;
  weight: string;
  type: string;
  stockItem: string;
  category: string;
  parentCategory: string;
};

export type WarehouseItemsTableProps = {
  items: any;
  setItems: React.Dispatch<React.SetStateAction<any>>;
};

export type AddStockTypes = {
  onAddStockFinish: (values: any) => void;
  isAddingStock: boolean;
  form: any;
  categories: any;
  isCategoriesLoading: boolean;
  lhsOrders: any;
  isOrdersLoading: boolean;
  depots: any;
  isDepotsLoading: boolean;
  suppliers: any;
  isSuppliersLoading: boolean;
  checkbox: boolean;
  setCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditStockTypes = {
  onEditStockFinish: (values: any) => void;
  lhsOrders: any;
  form: any;
  categories: any;
  isCategoriesLoading: boolean;
  isOrdersLoading: boolean;
  depots: any;
  isDepotsLoading: boolean;
  suppliers: any;
  isSuppliersLoading: boolean;
  itemToEdit: {
    category: {
      unitBuyingPrice: number;
      unitSellingPrice: number;
      inDate: string;
      expiryDate: string;
      id: number;
      name: string;
      parentCategory: {
        id: number;
        name: string;
      };
    };
    lhsOrder: {
      id: number;
      depot: {
        id: number;
      };
    };
    supplierName: string;
  };
};

export type BatchesModalTypes = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  categoryInfo: any;
  batches: any;
  setStartDate: React.Dispatch<React.SetStateAction<any>>;
  setEndDate: React.Dispatch<React.SetStateAction<any>>;
  filter: any;
  setFilter: React.Dispatch<React.SetStateAction<any>>;
  setBatches: React.Dispatch<React.SetStateAction<any>>;
  getBatchesAction: any;
  filtersBasedLoader: boolean;
  currentPages: number;
  setCurrentPages: React.Dispatch<React.SetStateAction<number>>;
};
