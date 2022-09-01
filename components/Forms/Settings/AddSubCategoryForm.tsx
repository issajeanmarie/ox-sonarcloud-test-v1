/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row } from "antd";
import React from "react";
import { FC } from "react";
import { requiredInput } from "../../../lib/validation/InputValidations";
import Button from "../../Shared/Button";
import Input from "../../Shared/Input";

type AddCategoryTypes = {
  onAddCategoryFinish: (values: any) => void;
  isAddingCategory: boolean;
};

const AddSubCategoryForm: FC<AddCategoryTypes> = ({
  onAddCategoryFinish,
  isAddingCategory
}) => {
  return (
    <Form
      name="AddSubCategoryForm"
      onFinish={onAddCategoryFinish}
      layout="vertical"
      title="AddSubCategory"
    >
      <Row className="flex items-center gap-4">
        <Col flex="auto">
          <Input
            type="text"
            name="name"
            placeholder="Enter category name"
            rules={requiredInput}
          />
        </Col>
        <Col flex="none">
          <Button loading={isAddingCategory} type="primary" htmlType="submit">
            ADD SUB CATEGORY
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddSubCategoryForm;
