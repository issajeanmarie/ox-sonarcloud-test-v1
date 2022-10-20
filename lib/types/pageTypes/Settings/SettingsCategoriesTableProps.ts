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
  isDeletingCategory: boolean;
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
  setIsModalVisible: any;
  isLoading: boolean;
  isId: any;
  setIsEditModalVisible: any;
};
