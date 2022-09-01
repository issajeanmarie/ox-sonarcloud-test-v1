/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Modal, Table, Typography } from "antd";
import CustomButton from "../../Shared/Button/button";
import { FC } from "react";
import { SettingsCategoriesTableProps } from "../../../lib/types/pageTypes/Settings/SettingsCategoriesTableProps";
import { SettingsCategoriesTableTypes } from "../../../lib/types/pageTypes/Settings/SettingsCategoriesTableTypes";
import AddSubCategory from "../../Forms/Settings/AddSubCategory";
import UpdateCategory from "../../Forms/Settings/UpdateCategory";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";

const { Text } = Typography;

const SettingsCategoriesTable: FC<SettingsCategoriesTableProps> = ({
  data,
  onAddCategoryFinish,
  isAddingCategory,
  showModal,
  handleOk,
  handleCancel,
  isModalVisible,
  handleDeleteCategory,
  isDeletinCategory,
  onUpdateCategoryFinish,
  isUpdatingCategory,
  showEditModal,
  handleEditOk,
  handleEditCancel,
  isEditModalVisible,
  form,
  categoriesFetching
}) => {
  //Change the subcategory keyname to children keyname
  const _data = data?.map(({ subCategories: children, ...rest }: any) => ({
    children,
    ...rest
  }));

  const columns = [
    {
      title: "id",
      key: "id",
      render: (
        text: SettingsCategoriesTableTypes,
        record: SettingsCategoriesTableTypes
      ) => <Text className="normalText fowe700">{record?.id}</Text>
    },
    {
      title: "Category",
      key: "Category",
      render: (
        text: SettingsCategoriesTableTypes,
        record: SettingsCategoriesTableTypes
      ) => <Text className="normalText fowe700">{record?.name}</Text>
    },
    {
      title: "action",
      key: "action",
      render: (
        text: SettingsCategoriesTableTypes,
        record: SettingsCategoriesTableTypes
      ) => (
        <div className="flex items-center gap-3 justify-end">
          <CustomButton
            onClick={() => showModal(record?.id)}
            type="secondary"
            size="icon"
            icon={
              <Image
                src="/icons/ic-actions-add-simple.svg"
                alt="OX Delivery Logo"
                width={12}
                preview={false}
              />
            }
          />

          <CustomButton
            onClick={() => showEditModal(record)}
            type="normal"
            size="icon"
            icon={
              <Image
                src="/icons/ic-contact-edit.svg"
                alt="OX Delivery Logo"
                width={12}
                preview={false}
              />
            }
          />

          <CustomButton
            onClick={() => handleDeleteCategory(record?.id)}
            loading={isDeletinCategory}
            type="danger"
            size="icon"
            icon={
              <Image
                src="/icons/ic-actions-remove.svg"
                alt="OX Delivery Logo"
                width={12}
                preview={false}
              />
            }
          />
        </div>
      )
    }
  ];
  return (
    <>
      <Table
        key="settingsCategoriesTable"
        pagination={false}
        showHeader={false}
        columns={columns}
        expandable={{
          childrenColumnName: "children",
          defaultExpandAllRows: true,
          expandIcon: () => null
        }}
        dataSource={_data}
        loading={TableOnActionLoading(categoriesFetching)}
      />
      <AddSubCategory
        onAddCategoryFinish={onAddCategoryFinish}
        isAddingCategory={isAddingCategory}
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalVisible={isModalVisible}
      />
      <Modal
        title="Edit category"
        visible={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        footer={false}
      >
        <UpdateCategory
          onUpdateCategoryFinish={onUpdateCategoryFinish}
          isUpdatingCategory={isUpdatingCategory}
          form={form}
        />
      </Modal>
    </>
  );
};

export default SettingsCategoriesTable;
