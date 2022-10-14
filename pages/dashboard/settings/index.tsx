/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import { SettingsLinks } from "../../../components/Settings/SettingsLinks";
import { Row, Col, Typography } from "antd";
import PersonalInfo from "../../../components/PersonalInfo";
import OxApp from "../.././../components/OxApp";
import SettingsKPIsTable from "../../../components/Tables/Settings/SettingsKPIsTable";
import SettingsCardWrapper from "../../../components/Settings/SettingsCardWrapper";
import CustomButton from "../../../components/Shared/Button/button";
import SettingsTopNavigator from "../../../components/Settings/SettingsTopNavigator";
import {
  useGetKpisQuery,
  useAddKpiMutation,
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
import Content from "../../../components/Shared/Content";

const { Text } = Typography;

const Settings = () => {
  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [category, setCategory] = useState(null);
  const [categoryToEDit, setCategoryToEdit]: any = useState(null);
  const [targetPerDaykpi, setTargetPerDaykpi] = useState();
  const [targetPerKmkpi, setTargetPerKmkpi] = useState();
  const { data, isLoading: isKPIsLoading } = useGetKpisQuery();
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();
  const [addKpi, { isLoading: isAddingKPIs }] = useAddKpiMutation();
  const [addCategory, { isLoading: isAddingCategory }] =
    useAddCategoryMutation();
  const [deleteCategory, { isLoading: isDeletinCategory }] =
    useDeleteCategoryMutation();
  const [updateCategory, { isLoading: isUpdatingCategory }] =
    useUpdateCategoryMutation();
  const [makeCategoryParent, { isLoading: isParentingCategory }] =
    useMakeCategoryParentMutation();
  const [active, setActive] = useState<string>("preferences");
  const [pageSize, setPageSize] = useState(10);
  const [isId, setIsId] = useState(0);

  const handleLoadMore = () => {
    setPageSize(pageSize + 10);
  };

  const handlePostTargetPerDaykpi = (value: any) => {
    setTargetPerDaykpi(value);
  };

  const handlePostTargetPerKmykpi = (value: any) => {
    setTargetPerKmkpi(value);
  };

  const toggleActiveHandler = (id: string) => {
    setActive(id);
  };

  const handleAddKPIs = () => {
    addKpi({
      kpis: data?.payload?.map((item: any) => {
        return {
          targetPerDay: targetPerDaykpi ? +targetPerDaykpi : item?.targetPerDay,
          targetPerKm: targetPerKmkpi ? +targetPerKmkpi : item?.targetPerKm
        };
      })
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
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
      // parentCategoryId: categoryToEDit?.id ? categoryToEDit?.id : null,
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

  const PreferencesPane = () => (
    <>
      <SettingsCardWrapper>
        <div className="mb-4">
          <Text className="mediumText">KPIs (Daily target)</Text>
        </div>
        {isKPIsLoading ? (
          "loading..."
        ) : (
          <SettingsKPIsTable
            data={data?.payload}
            handlePostTargetPerDaykpi={handlePostTargetPerDaykpi}
            handlePostTargetPerKmykpi={handlePostTargetPerKmykpi}
          />
        )}

        {!isKPIsLoading && (
          <Row className="flex justify-end mt-4">
            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
              <CustomButton
                onClick={handleAddKPIs}
                loading={isAddingKPIs}
                type="primary"
              >
                SAVE
              </CustomButton>
            </Col>
          </Row>
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
        isDeletinCategory={isDeletinCategory}
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

  const AppPane = () => (
    <SettingsCardWrapper>
      <OxApp />
    </SettingsCardWrapper>
  );

  return (
    <Layout>
      <SettingsTopNavigator
        headerLinks={SettingsLinks}
        setActive={setActive}
        active={active}
        toggleActiveHandler={toggleActiveHandler}
      />

      <Content navType="FULL">
        <Row className="p-5  w-full" gutter={18}>
          <Col span={14} className="h-[82vh] overflow-y-scroll pb-12">
            {active === "preferences" ? <PreferencesPane /> : <AppPane />}
          </Col>

          <Col span={10} className="h-[82vh] overflow-y-scroll pb-12">
            <PersonalInfo />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default WithPrivateRoute(Settings);
