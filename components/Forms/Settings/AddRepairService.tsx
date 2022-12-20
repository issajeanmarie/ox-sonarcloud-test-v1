/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row } from "antd";
import React from "react";
import { FC } from "react";
import { requiredInput } from "../../../lib/validation/InputValidations";
import Button from "../../Shared/Button";
import Input from "../../Shared/Input";

type AddRepairServiceTypes = {
  onAddRepairServiceFinish: (values: any) => void;
  isAddingRepairService: boolean;
  btnTitle?: string;
};

const AddRepairService: FC<AddRepairServiceTypes> = ({
  onAddRepairServiceFinish,
  isAddingRepairService,
  btnTitle
}) => {
  return (
    <Form
      name="AddRepairService"
      onFinish={onAddRepairServiceFinish}
      layout="vertical"
      title="AddRepairService"
    >
      <Row className="flex items-center gap-4" wrap={false} align="top">
        <Col>
          <Input
            type="text"
            name="name"
            placeholder={
              btnTitle ? "Enter service name" : "Enter category name"
            }
            rules={requiredInput}
          />
        </Col>
        <Col>
          <Button
            loading={isAddingRepairService}
            type="primary"
            htmlType="submit"
          >
            {btnTitle || "ADD CATEGORY"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddRepairService;
