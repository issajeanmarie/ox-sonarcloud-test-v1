import React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type RepairServicesTableProps = {
  data: any;
  handleCancel: () => void;
  handleDeleteCategory: (id: number) => void;
  isDeletingCategory: boolean;
  isUpdatingCategory: boolean;
  onUpdateCategoryFinish: (values: any) => void;
  showEditRepairServiceModal: (service: any) => void;
  handleEditOk: () => void;
  handleEditCancel: () => void;
  form: any;
  categoriesFetching: boolean;
  isLoading: boolean;
  isId: any;
  isEditRepairServiceModalVisible: boolean;
  setIsEditRepairServiceModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};
