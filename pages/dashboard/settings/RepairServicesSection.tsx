import { Row, Col, Typography, Image } from "antd";
import AddCategory from "../../../components/Forms/Settings/AddCategory";
import SettingsCardWrapper from "../../../components/Settings/SettingsCardWrapper";
import { SettingsCategoriesTableLoader } from "../../../components/Shared/Loaders/Loaders";
import { useGetRepairServicesQuery } from "../../../lib/api/endpoints/settings/settingsEndpoints";
import Input from "../../../components/Shared/Input";
import { useState } from "react";
import RepairServicesTable from "../../../components/Tables/Settings/RepairServicesTable";

const { Text } = Typography;

const RepairServicesSection = ({
  isAddingCategory,
  onAddCategoryFinish,
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
  isId,
  setIsEditModalVisible
}: any) => {
  const {
    data: repairServices,
    isLoading: isRepairServicesLoading,
    isFetching: repairServicesFetching
  } = useGetRepairServicesQuery();

  const [customRepairServices, setCustomRepairServices] = useState(null);

  const handleCategorySearch = (value: string) => {
    const filteredData = repairServices?.payload?.content?.filter(
      (entry: { [s: string]: unknown } | ArrayLike<unknown>) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(value.toLowerCase())
        )
    );
    setCustomRepairServices(filteredData);

    return null;
  };

  return (
    <>
      <SettingsCardWrapper>
        <div className="mb-6">
          <Text className="mediumText">
            Repair services ({repairServices?.payload?.totalElements || 0})
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
              placeholder="Search repair service"
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
            btnTitle="Add service"
          />
        </Row>

        {isRepairServicesLoading ? (
          <>
            {[...Array(10)].map((_, index) => (
              <SettingsCategoriesTableLoader key={index} />
            ))}
          </>
        ) : (
          <RepairServicesTable
            data={customRepairServices || repairServices?.payload?.content}
            onAddCategoryFinish={onAddCategoryFinish}
            isAddingCategory={isAddingCategory}
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
            categoriesFetching={repairServicesFetching}
            isLoading={false}
            isId={isId}
          />
        )}
      </SettingsCardWrapper>
    </>
  );
};

export default RepairServicesSection;
