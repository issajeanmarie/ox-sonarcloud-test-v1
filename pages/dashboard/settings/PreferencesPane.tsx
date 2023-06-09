import React, { useState } from "react";
import { Typography } from "antd";
import {
  useGetKPIsQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useMakeCategoryParentMutation,
  useAddRepairServiceMutation,
  useDeleteRepairServiceMutation,
  useUpdateRepairServiceMutation
} from "../../../lib/api/endpoints/settings/settingsEndpoints";
import { useForm } from "antd/lib/form/Form";
import CategoriesSection from "./CategoriesSection";
import SettingsKPIsTable from "../../../components/Tables/Settings/SettingsKPIsTable";
import SettingsCardWrapper from "../../../components/Settings/SettingsCardWrapper";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { SettingsKPILoader } from "../../../components/Shared/Loaders/Loaders";
import RepairServicesSection from "./RepairServicesSection";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import { useDispatch, useSelector } from "react-redux";
import ShiftPreferencesSection from "./ShiftPreferencesSection";

const { Text } = Typography;

const PreferencesPane = () => {
  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isEditRepairServiceModalVisible, setIsEditRepairServiceModalVisible] =
    useState(false);
  const [category, setCategory] = useState(null);
  const [categoryToEDit, setCategoryToEdit]: any = useState(null);

  const [addCategory, { isLoading: isAddingCategory }] =
    useAddCategoryMutation();
  const [addRepairService, { isLoading: isAddingRepairService }] =
    useAddRepairServiceMutation();

  const [deleteCategory, { isLoading: isDeletingCategory }] =
    useDeleteCategoryMutation();
  const [deleteRepairService, { isLoading: isDeletingRepairService }] =
    useDeleteRepairServiceMutation();
  const [updateCategory, { isLoading: isUpdatingCategory }] =
    useUpdateCategoryMutation();
  const [updateRepairService, { isLoading: isUpdatingRepairService }] =
    useUpdateRepairServiceMutation();

  const [makeCategoryParent, { isLoading: isParentingCategory }] =
    useMakeCategoryParentMutation();

  const [isId, setIsId] = useState(0);

  const dispatch = useDispatch();

  const AllRepairServices = useSelector(
    (state: { paginatedData: any }) => state.paginatedData.displayPaginatedData
  );

  // Working on KPIs
  const { data: KPIsList, isLoading: isGetKPIsLoading } = useGetKPIsQuery();

  const handleAddCategorySuccess = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleAddRepairServiceSuccess = ({ payload }: any) => {
    dispatch(displayPaginatedData({ payload }));
  };

  const onAddCategoryFinish = (values: any) => {
    handleAPIRequests({
      request: addCategory,
      name: values?.name,
      parentCategoryId: category ? category : null,
      showSuccess: true,
      handleSuccess: handleAddCategorySuccess
    });
  };

  const onAddRepairServiceFinish = (values: any) => {
    handleAPIRequests({
      request: addRepairService,
      name: values?.name,
      parentCategoryId: category ? category : null,
      showSuccess: true,
      handleSuccess: handleAddRepairServiceSuccess
    });
  };

  const handleUpdateCategorySuccess = () => {
    setIsEditModalVisible(false);
  };

  const onUpdateCategoryFinish = (values: any) => {
    handleAPIRequests({
      request: updateCategory,
      name: values?.name,
      id: categoryToEDit?.id,
      showSuccess: true,
      handleSuccess: handleUpdateCategorySuccess
    });
  };

  const handleUpdateRepairServiceSuccess = (res: any) => {
    setIsEditRepairServiceModalVisible(false);

    const newList: object[] = [];

    AllRepairServices?.payload?.content?.map((result: any) => {
      if (result.id !== res?.payload?.id) {
        newList.push(result);
      } else {
        newList.push(res?.payload);
      }
    });

    const newPayload = {
      payload: {
        totalElements: AllRepairServices?.payload?.totalElements,
        totalPages: AllRepairServices?.payload?.totalPages,
        content: newList
      }
    };

    dispatch(displayPaginatedData({ payload: newPayload, replace: true }));
  };

  const onUpdateRepairServiceFinish = (values: any) => {
    handleAPIRequests({
      request: updateRepairService,
      name: values?.name,
      id: categoryToEDit?.id,
      showSuccess: true,
      handleSuccess: handleUpdateRepairServiceSuccess
    });
  };

  const handleDeleteCategory = (id: number) => {
    setIsId(id);
    handleAPIRequests({
      request: deleteCategory,
      id,
      showSuccess: true
    });
  };

  const handleDeleteRepairServiceSuccess = ({ payload }: any) => {
    dispatch(displayPaginatedData({ deleted: true, payload: { id: payload } }));
  };

  const handleDeleteRepairService = (id: number) => {
    setIsId(id);
    handleAPIRequests({
      request: deleteRepairService,
      id,
      showSuccess: true,
      handleSuccess: handleDeleteRepairServiceSuccess
    });
  };

  const handleMakeCategoryParent = (id: number) => {
    setIsId(id);
    handleAPIRequests({
      request: makeCategoryParent,
      id,
      showSuccess: true
    });
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
    setIsEditModalVisible(false);
    setCategory(null);
  };

  //edit modal
  const showEditModal = (category: any) => {
    setIsEditModalVisible(true);
    setCategoryToEdit(category);
    form.setFieldsValue(category);
  };

  const showEditRepairServiceModal = (service: any) => {
    setIsEditRepairServiceModalVisible(true);
    setCategoryToEdit(service);

    form.setFieldsValue(service);
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
          <>
            {[...Array(4)].map((_, index) => (
              <SettingsKPILoader key={index} />
            ))}
          </>
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
        setIsModalVisible={setIsModalVisible}
        handleDeleteCategory={handleDeleteCategory}
        isDeletingCategory={isDeletingCategory}
        isUpdatingCategory={isUpdatingCategory}
        onUpdateCategoryFinish={onUpdateCategoryFinish}
        showEditModal={showEditModal}
        handleEditOk={handleEditOk}
        handleEditCancel={handleEditCancel}
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
        form={form}
        handleMakeCategoryParent={handleMakeCategoryParent}
        isParentingCategory={isParentingCategory}
        isId={isId}
      />

      <RepairServicesSection
        onAddRepairServiceFinish={onAddRepairServiceFinish}
        isAddingRepairService={isAddingRepairService}
        handleCancel={handleCancel}
        handleOk={handleOk}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleDeleteCategory={handleDeleteRepairService}
        isDeletingCategory={isDeletingRepairService}
        isUpdatingCategory={isUpdatingRepairService}
        onUpdateCategoryFinish={onUpdateRepairServiceFinish}
        showEditRepairServiceModal={showEditRepairServiceModal}
        handleEditOk={handleEditOk}
        handleEditCancel={handleEditCancel}
        isEditRepairServiceModalVisible={isEditRepairServiceModalVisible}
        setIsEditRepairServiceModalVisible={setIsEditRepairServiceModalVisible}
        form={form}
        isId={isId}
      />

      <ShiftPreferencesSection />
    </>
  );
};

export default PreferencesPane;
