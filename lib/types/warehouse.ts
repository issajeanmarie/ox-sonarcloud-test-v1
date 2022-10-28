/* eslint-disable @typescript-eslint/no-explicit-any */
import { LatLng } from "use-places-autocomplete";

export type AddWarehouseOrderTypes = {
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
  onAddSaleFinish: any;
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
  orders: any;
  isOrdersLoading: boolean;
  depots: any;
  isDepotsLoading: boolean;
  suppliers: any;
  isSuppliersLoading: boolean;
};

export type EditStockTypes = {
  onEditStockFinish: (values: any) => void;
  form: any;
  categories: any;
  isCategoriesLoading: boolean;
  orders: any;
  isOrdersLoading: boolean;
  depots: any;
  isDepotsLoading: boolean;
  suppliers: any;
  isSuppliersLoading: boolean;
  itemToEdit: {
    category: {
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
