/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row } from "antd";
import React from "react";
import { FC } from "react";
import Button from "../../Shared/Button";
import Input from "../../Shared/Input";

type AddCategoryTypes = {
  onUpdateCategoryFinish: (values: any) => void;
  isUpdatingCategory: boolean;
  form: any;
};

const UpdateCategory: FC<AddCategoryTypes> = ({
  onUpdateCategoryFinish,
  isUpdatingCategory,
  form
}) => {
  return (
    <Form
      name="UpdateCategory"
      onFinish={onUpdateCategoryFinish}
      layout="vertical"
      title="UpdateCategory"
      form={form}
    >
      <Row className="flex items-center gap-4">
        <Col flex="auto">
          <Input type="text" name="name" placeholder="Enter category name" />
        </Col>
        <Col flex="none">
          <Button loading={isUpdatingCategory} type="primary" htmlType="submit">
            UPDATE CATEGORY
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateCategory;
