import { Row, Col, Typography, Image } from "antd";
import AddCategory from "../../../components/Forms/Settings/AddCategory";
import SettingsCardWrapper from "../../../components/Settings/SettingsCardWrapper";
import {
  SettingsCategoriesTableLoader,
  SmallSpinLoader
} from "../../../components/Shared/Loaders/Loaders";
import { useGetCategoriesQuery } from "../../../lib/api/endpoints/settings/settingsEndpoints";
import Input from "../../../components/Shared/Input";
import SettingsCategoriesTable from "../../../components/Tables/Settings/SettingsCategoriesTable";
import { useEffect, useState } from "react";

const { Text } = Typography;

const CategoriesSection = ({
  isAddingCategory,
  onAddCategoryFinish,
  showModal,
  handleCancel,
  handleOk,
  isModalVisible,
  handleDeleteCategory,
  isDeletinCategory,
  isUpdatingCategory,
  onUpdateCategoryFinish,
  showEditModal,
  handleEditOk,
  handleEditCancel,
  isEditModalVisible,
  form,
  handleMakeCategoryParent,
  isParentingCategory,
  pageSize
}: any) => {
  const [state, setState] = useState("");

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isFetching: categoriesFetching
  } = useGetCategoriesQuery();

  useEffect(() => {
    if (categories) {
      setState(categories?.payload);
    }
  }, []);

  const handleCategorySearch = (value: string) => {
    const filteredData = categories?.payload.filter(
      (entry: { [s: string]: unknown } | ArrayLike<unknown>) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(value.toLowerCase())
        )
    );
    // const filteredData = categories?.payload?.filter((category) => category?.name?.toLowerCase().includes(value.toLowerCase()))
    setState(filteredData);
  };

  return (
    <SettingsCardWrapper>
      <div className="mb-4">
        <Text className="mediumText">
          Categories (
          {isCategoriesLoading || categoriesFetching ? (
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
            name="searchCategory"
            placeholder="Search category"
            onChange={handleCategorySearch}
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

      {isCategoriesLoading ? (
        <>
          {[...Array(10)].map((_, index) => (
            <SettingsCategoriesTableLoader key={index} />
          ))}
        </>
      ) : (
        <SettingsCategoriesTable
          data={state || categories?.payload}
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
          pageSize={pageSize}
        />
      )}
    </SettingsCardWrapper>
  );
};

export default CategoriesSection;
