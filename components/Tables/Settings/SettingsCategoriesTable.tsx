/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Table, Typography } from "antd";
import CustomButton from "../../Shared/Button/button";
import { FC } from "react";
import { SettingsCategoriesTableProps } from "../../../lib/types/pageTypes/Settings/SettingsCategoriesTableProps";
import { SettingsCategoriesTableTypes } from "../../../lib/types/pageTypes/Settings/SettingsCategoriesTableTypes";
import AddSubCategory from "../../Forms/Settings/AddSubCategory";
import UpdateCategory from "../../Forms/Settings/UpdateCategory";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import ModalWrapper from "../../Modals/ModalWrapper";
import Button from "../../Shared/Button";

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
  isDeletingCategory,
  onUpdateCategoryFinish,
  isUpdatingCategory,
  showEditModal,
  isEditModalVisible,
  setIsEditModalVisible,
  form,
  categoriesFetching,
  handleMakeCategoryParent,
  isParentingCategory,
  isLoading,
  setIsModalVisible,
  isId
}) => {
  //Change the subcategory keyname to children keyname
  const _data =
    data &&
    data?.slice(0).map(({ subCategories: children, ...rest }: any) => ({
      children,
      ...rest
    }));

  const columns = [
    {
      title: "id",
      key: "id",
      render: (
        text: SettingsCategoriesTableTypes,
        record: SettingsCategoriesTableTypes,
        index: number
      ) => <Text className="normalText fowe700">{index + 1}</Text>
    },
    {
      title: "Category",
      key: "Category",
      render: (
        text: SettingsCategoriesTableTypes,
        record: SettingsCategoriesTableTypes
      ) => <span className="black">{record?.name}</span>
    },
    {
      title: "action",
      key: "action",
      render: (
        text: SettingsCategoriesTableTypes,
        record: SettingsCategoriesTableTypes
      ) => {
        return (
          <div className="flex items-center gap-3 justify-end">
            {record?.children && (
              <CustomButton
                form=""
                className="add_category"
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
            )}

            {!record.children && (
              <CustomButton
                form=""
                className="make_parent_category"
                onClick={() => handleMakeCategoryParent(record?.id)}
                type="normal"
                size="icon"
                loading={isParentingCategory && record.id == isId}
                icon={
                  <Image
                    src="/icons/movement.svg"
                    alt="OX Delivery Logo"
                    width={18}
                    preview={false}
                  />
                }
              />
            )}

            <CustomButton
              form=""
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
              form=""
              onClick={() => handleDeleteCategory(record?.id)}
              loading={isDeletingCategory && record.id == isId}
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
        );
      }
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
        setIsModalVisible={setIsModalVisible}
        isLoading={false}
      />
      <ModalWrapper
        title="Edit category"
        isModalVisible={isEditModalVisible}
        setIsModalVisible={setIsEditModalVisible}
        onCancel={handleCancel}
        loading={isLoading}
        destroyOnClose
        footerContent={
          <Button
            form="UpdateCategory"
            loading={isUpdatingCategory}
            type="primary"
            htmlType="submit"
          >
            UPDATE CATEGORY
          </Button>
        }
      >
        <UpdateCategory
          onUpdateCategoryFinish={onUpdateCategoryFinish}
          isUpdatingCategory={isUpdatingCategory}
          form={form}
        />
      </ModalWrapper>
    </>
  );
};

export default SettingsCategoriesTable;
