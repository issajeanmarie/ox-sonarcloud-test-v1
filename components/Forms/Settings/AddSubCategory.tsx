/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalWrapper from "../../Modals/ModalWrapper";
import React, { FC } from "react";
import AddSubCategoryForm from "./AddSubCategoryForm";
import Button from "../../Shared/Button";

type addSubCategoryTypes = {
  isAddingCategory: boolean;
  onAddCategoryFinish: (values: any) => void;
  handleOk: () => void;
  handleCancel: () => void;
  isModalVisible: boolean;
  setIsModalVisible: any;
  isLoading: boolean;
};

const AddSubCategory: FC<addSubCategoryTypes> = ({
  isAddingCategory,
  onAddCategoryFinish,
  handleCancel,
  isModalVisible,
  setIsModalVisible,
  isLoading
}) => {
  return (
    <ModalWrapper
      title="ADD SUB-CATEGORY"
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      onCancel={handleCancel}
      loading={isLoading}
      destroyOnClose
      footerContent={
        <Button
          form="AddSubCategoryForm"
          loading={isAddingCategory}
          type="primary"
          htmlType="submit"
        >
          ADD SUB CATEGORY
        </Button>
      }
    >
      <AddSubCategoryForm
        onAddCategoryFinish={onAddCategoryFinish}
        isAddingCategory={isAddingCategory}
      />
    </ModalWrapper>
  );
};

export default AddSubCategory;
