import React, { useState } from "react";
import { Typography } from "antd";
import {
  useGetKPIsQuery,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useMakeCategoryParentMutation
} from "../../../lib/api/endpoints/settings/settingsEndpoints";
import { SuccessMessage } from "../../../components/Shared/Messages/SuccessMessage";
import { BackendErrorTypes, GenericResponse } from "../../../lib/types/shared";
import { ErrorMessage } from "../../../components/Shared/Messages/ErrorMessage";
import { useForm } from "antd/lib/form/Form";
import CategoriesSection from "./CategoriesSection";
import CustomButton from "../../../components/Shared/Button/button";
import SettingsKPIsTable from "../../../components/Tables/Settings/SettingsKPIsTable";
import SettingsCardWrapper from "../../../components/Settings/SettingsCardWrapper";

const { Text } = Typography;

const PreferencesPane = () => {
  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [category, setCategory] = useState(null);
  const [categoryToEDit, setCategoryToEdit]: any = useState(null);
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();
  const [addCategory, { isLoading: isAddingCategory }] =
    useAddCategoryMutation();
  const [deleteCategory, { isLoading: isDeletingCategory }] =
    useDeleteCategoryMutation();
  const [updateCategory, { isLoading: isUpdatingCategory }] =
    useUpdateCategoryMutation();
  const [makeCategoryParent, { isLoading: isParentingCategory }] =
    useMakeCategoryParentMutation();

  const [pageSize, setPageSize] = useState(10);
  const [isId, setIsId] = useState(0);

  // Working on KPIs
  const { data: KPIsList, isLoading: isGetKPIsLoading } = useGetKPIsQuery();

  const handleLoadMore = () => {
    setPageSize(pageSize + 10);
  };

  const onAddCategoryFinish = (values: any) => {
    addCategory({
      name: values?.name,
      parentCategoryId: category ? category : null
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  const onUpdateCategoryFinish = (values: any) => {
    updateCategory({
      name: values?.name,
      id: categoryToEDit?.id
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        setIsEditModalVisible(false);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  const handleDeleteCategory = (id: number) => {
    setIsId(id);
    deleteCategory({
      id: id
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  const handleMakeCategoryParent = (id: number) => {
    setIsId(id);
    makeCategoryParent({
      id: id
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  //modal
  const showModal = (category: any) => {
    setIsModalVisible(true);
    setCategory(category);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setCategory(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCategory(null);
  };

  //edit modal
  const showEditModal = (category: any) => {
    setIsEditModalVisible(true);
    setCategoryToEdit(category);
    form.setFieldsValue(category);
  };

  const handleEditOk = () => {
    setIsEditModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  return (
    <>
      <SettingsCardWrapper>
        <div className="mb-4">
          <Text className="mediumText">KPIs (Daily target)</Text>
        </div>
        {isGetKPIsLoading ? (
          "loading..."
        ) : (
          <SettingsKPIsTable data={KPIsList?.payload} />
        )}
      </SettingsCardWrapper>

      <CategoriesSection
        showModal={showModal}
        onAddCategoryFinish={onAddCategoryFinish}
        isAddingCategory={isAddingCategory}
        handleCancel={handleCancel}
        handleOk={handleOk}
        isModalVisible={isModalVisible}
        handleDeleteCategory={handleDeleteCategory}
        isDeletingCategory={isDeletingCategory}
        isUpdatingCategory={isUpdatingCategory}
        onUpdateCategoryFinish={onUpdateCategoryFinish}
        showEditModal={showEditModal}
        handleEditOk={handleEditOk}
        handleEditCancel={handleEditCancel}
        isEditModalVisible={isEditModalVisible}
        form={form}
        handleMakeCategoryParent={handleMakeCategoryParent}
        isParentingCategory={isParentingCategory}
        pageSize={pageSize}
        isLoading={isCategoriesLoading}
        isId={isId}
      />

      {pageSize < categories?.payload?.length && (
        <div style={{ width: "21%", margin: "32px auto" }}>
          <CustomButton
            loading={isCategoriesLoading}
            onClick={handleLoadMore}
            type="secondary"
          >
            Load more
          </CustomButton>
        </div>
      )}
    </>
  );
};

export default PreferencesPane;
