import { Row, Col, Typography, Image } from "antd";
import AddCategory from "../../../components/Forms/Settings/AddCategory";
import SettingsCardWrapper from "../../../components/Settings/SettingsCardWrapper";
import { SettingsCategoriesTableLoader } from "../../../components/Shared/Loaders/Loaders";
import { useGetCategoriesQuery } from "../../../lib/api/endpoints/settings/settingsEndpoints";
import Input from "../../../components/Shared/Input";
import SettingsCategoriesTable from "../../../components/Tables/Settings/SettingsCategoriesTable";
import { useState } from "react";

const { Text } = Typography;

const CategoriesSection = ({
  isAddingCategory,
  onAddCategoryFinish,
  showModal,
  handleCancel,
  handleOk,
  isModalVisible,
  setIsModalVisible,
  handleDeleteCategory,
  isDeletingCategory,
  isUpdatingCategory,
  onUpdateCategoryFinish,
  showEditModal,
  handleEditOk,
  handleEditCancel,
  isEditModalVisible,
  form,
  handleMakeCategoryParent,
  isParentingCategory,
  isId,
  setIsEditModalVisible
}: any) => {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isFetching: categoriesFetching
  } = useGetCategoriesQuery();

  const [customCategories, setCustomCategories] = useState(null);

  const handleCategorySearch = (value: string) => {
    const filteredData = categories?.payload.filter(
      (entry: { [s: string]: unknown } | ArrayLike<unknown>) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(value.toLowerCase())
        )
    );
    setCustomCategories(filteredData);
  };

  return (
    <>
      <SettingsCardWrapper>
        <div className="mb-6">
          <Text className="mediumText">
            Categories ({categories?.payload?.length || 0})
          </Text>
        </div>

        <Row
          wrap={false}
          align="top"
          className="flex justify-between items-center mb-4 border-b pb-4 gap-4"
        >
          <Col>
            <Input
              allowClear
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
            data={customCategories || categories?.payload}
            onAddCategoryFinish={onAddCategoryFinish}
            isAddingCategory={isAddingCategory}
            showModal={showModal}
            handleOk={handleOk}
            handleCancel={handleCancel}
            isModalVisible={isModalVisible}
            handleDeleteCategory={handleDeleteCategory}
            isDeletingCategory={isDeletingCategory}
            isUpdatingCategory={isUpdatingCategory}
            onUpdateCategoryFinish={onUpdateCategoryFinish}
            showEditModal={showEditModal}
            handleEditOk={handleEditOk}
            handleEditCancel={handleEditCancel}
            isEditModalVisible={isEditModalVisible}
            setIsModalVisible={setIsModalVisible}
            setIsEditModalVisible={setIsEditModalVisible}
            form={form}
            categoriesFetching={categoriesFetching}
            handleMakeCategoryParent={handleMakeCategoryParent}
            isParentingCategory={isParentingCategory}
            isLoading={false}
            isId={isId}
          />
        )}
      </SettingsCardWrapper>
    </>
  );
};

export default CategoriesSection;
