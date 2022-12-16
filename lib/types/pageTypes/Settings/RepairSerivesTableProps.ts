/* eslint-disable @typescript-eslint/no-explicit-any */
export type RepairServicesTableProps = {
  data: any;
  onAddCategoryFinish: (values: any) => void;
  isAddingCategory: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  isModalVisible: boolean;
  handleDeleteCategory: (id: number) => void;
  isDeletingCategory: boolean;
  isUpdatingCategory: boolean;
  onUpdateCategoryFinish: (values: any) => void;
  showEditModal: (cateory: any) => void;
  handleEditOk: () => void;
  handleEditCancel: () => void;
  isEditModalVisible: boolean;
  form: any;
  categoriesFetching: boolean;
  setIsModalVisible: any;
  isLoading: boolean;
  isId: any;
  setIsEditModalVisible: any;
};
