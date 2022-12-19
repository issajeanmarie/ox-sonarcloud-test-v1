/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row } from "antd";
import React from "react";
import { FC } from "react";
import { requiredInput } from "../../../lib/validation/InputValidations";
import Input from "../../Shared/Input";

type AddCategoryTypes = {
  onUpdateCategoryFinish: (values: any) => void;
  isUpdatingCategory: boolean;
  form: any;
};

const UpdateCategory: FC<AddCategoryTypes> = ({
  onUpdateCategoryFinish,
  form
}) => {
  return (
    <Form
      name="UpdateCategory"
      onFinish={onUpdateCategoryFinish}
      layout="vertical"
      title="UpdateCategory"
      form={form}
      id="UpdateCategory"
    >
      <Row className="flex items-center gap-4">
        <Col flex="auto">
          <Input
            rules={requiredInput}
            type="text"
            name="name"
            placeholder="Enter category name"
          />
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateCategory;
