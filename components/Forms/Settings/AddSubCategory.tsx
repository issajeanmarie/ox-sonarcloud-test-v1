/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import React, { FC } from "react";
import AddSubCategoryForm from "./AddSubCategoryForm";

type addSubCategoryTypes = {
  isAddingCategory: boolean;
  onAddCategoryFinish: (values: any) => void;
  handleOk: () => void;
  handleCancel: () => void;
  isModalVisible: boolean;
};

const AddSubCategory: FC<addSubCategoryTypes> = ({
  isAddingCategory,
  onAddCategoryFinish,
  handleOk,
  handleCancel,
  isModalVisible
}) => {
  return (
    <Modal
      title="Add Sub category"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
    >
      <AddSubCategoryForm
        onAddCategoryFinish={onAddCategoryFinish}
        isAddingCategory={isAddingCategory}
      />
    </Modal>
  );
};

export default AddSubCategory;
