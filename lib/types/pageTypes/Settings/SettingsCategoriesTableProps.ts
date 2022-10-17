/* eslint-disable @typescript-eslint/no-explicit-any */
export type SettingsCategoriesTableProps = {
  data: any;
  onAddCategoryFinish: (values: any) => void;
  isAddingCategory: boolean;
  showModal: (category: any) => void;
  handleOk: () => void;
  handleCancel: () => void;
  isModalVisible: boolean;
  handleDeleteCategory: (id: number) => void;
  isDeletinCategory: boolean;
  isUpdatingCategory: boolean;
  onUpdateCategoryFinish: (values: any) => void;
  showEditModal: (cateory: any) => void;
  handleEditOk: () => void;
  handleEditCancel: () => void;
  isEditModalVisible: boolean;
  form: any;
  categoriesFetching: boolean;
  isParentingCategory: boolean;
  handleMakeCategoryParent: (id: number) => void;
  pageSize: number;
  setIsModalVisible: any;
  isLoading: boolean;
  isId: any;
};
