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

const AddCategory: FC<AddCategoryTypes> = ({
  onAddCategoryFinish,
  isAddingCategory
}) => {
  return (
    <Form
      name="AddCategory"
      onFinish={onAddCategoryFinish}
      layout="vertical"
      title="AddCategory"
    >
      <Row className="flex items-center gap-4">
        <Col>
          <Input
            type="text"
            name="name"
            placeholder="Enter category name"
            rules={requiredInput}
          />
        </Col>
        <Col>
          <Button
            form=""
            loading={isAddingCategory}
            type="primary"
            htmlType="submit"
          >
            ADD CATEGORY
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddCategory;
