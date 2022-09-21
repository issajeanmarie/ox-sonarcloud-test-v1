/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Layout from "../../components/Shared/Layout";
import WithPrivateRoute from "../../components/Shared/Routes/WithPrivateRoute";
import { SettingsLinks } from "../../components/Settings/SettingsLinks";
import { Row, Col, Typography, Image } from "antd";
import PersonalInfo from "../../components/PersonalInfo";
import OxApp from "../../components/OxApp";
import SettingsKPIsTable from "../../components/Tables/Settings/SettingsKPIsTable";
import SettingsCardWrapper from "../../components/Settings/SettingsCardWrapper";
import CustomButton from "../../components/Shared/Button/button";
import SettingsCategoriesTable from "../../components/Tables/Settings/SettingsCategoriesTable";
import AddCategory from "../../components/Forms/Settings/AddCategory";
import SettingsTopNavigator from "../../components/Settings/SettingsTopNavigator";
import Input from "../../components/Shared/Input";
import {
  useGetKpisQuery,
  useAddKpiMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useMakeCategoryParentMutation
} from "../../lib/api/endpoints/settings/settingsEndpoints";
import { SuccessMessage } from "../../components/Shared/Messages/SuccessMessage";
import { BackendErrorTypes, GenericResponse } from "../../lib/types/shared";
import { ErrorMessage } from "../../components/Shared/Messages/ErrorMessage";
import { useForm } from "antd/lib/form/Form";
import { SmallSpinLoader } from "../../components/Shared/Loaders/Loaders";

const { Text } = Typography;

const Settings = () => {
  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [category, setCategory] = useState(null);
  const [categoryToEDit, setCategoryToEdit]: any = useState(null);
  const [targetPerDaykpi, setTargetPerDaykpi] = useState();
  const [targetPerKmkpi, setTargetPerKmkpi] = useState();
  const { data, isLoading } = useGetKpisQuery();
  const {
    data: categories,
    isLoading: categoriesLoading,
    isFetching: categoriesFetching
  } = useGetCategoriesQuery();
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
          depotId: item?.depotId,
          depotName: item?.depotName,
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
      parentCategoryId: categoryToEDit?.id ? categoryToEDit?.id : null,
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
    <Layout>
      <SettingsTopNavigator
        headerLinks={SettingsLinks}
        setActive={setActive}
        active={active}
        toggleActiveHandler={toggleActiveHandler}
      />

      <div className=" w-[100%] my-5">
        <Row className="p-5 mt-5" gutter={18}>
          {active === "preferences" && (
            <Col span={14}>
              <SettingsCardWrapper>
                <div className="mb-4">
                  <Text className="mediumText">KPIs (Daily target)</Text>
                </div>
                {isLoading ? (
                  "loading..."
                ) : (
                  <SettingsKPIsTable
                    data={data?.payload}
                    handlePostTargetPerDaykpi={handlePostTargetPerDaykpi}
                    handlePostTargetPerKmykpi={handlePostTargetPerKmykpi}
                  />
                )}

                {!isLoading && (
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

              <SettingsCardWrapper>
                <div className="mb-4">
                  <Text className="mediumText">
                    Categories (
                    {categoriesLoading || categoriesFetching ? (
                      <SmallSpinLoader />
                    ) : (
                      categories?.payload?.length
                    )}
                    )
                  </Text>
                </div>

                <Row className="flex justify-between items-center mb-4 border-b pb-4">
                  <Col>
                    <Input
                      type="text"
                      name="search"
                      placeholder="Search category"
                      suffixIcon={
                        <Image
                          width={14}
                          src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
                          preview={false}
                          alt=""
                        />
                      }
                    />
                  </Col>
                  <AddCategory
                    onAddCategoryFinish={onAddCategoryFinish}
                    isAddingCategory={isAddingCategory}
                  />
                </Row>

                {categoriesLoading ? (
                  "loading.."
                ) : (
                  <SettingsCategoriesTable
                    data={categories?.payload}
                    onAddCategoryFinish={onAddCategoryFinish}
                    isAddingCategory={isAddingCategory}
                    showModal={showModal}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
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
                    categoriesFetching={categoriesFetching}
                    handleMakeCategoryParent={handleMakeCategoryParent}
                    isParentingCategory={isParentingCategory}
                  />
                )}
              </SettingsCardWrapper>
            </Col>
          )}
          {active === "oxapp" && (
            <Col span={14}>
              <SettingsCardWrapper>
                <OxApp />
              </SettingsCardWrapper>
            </Col>
          )}
          <Col span={10}>
            <PersonalInfo />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(Settings);
