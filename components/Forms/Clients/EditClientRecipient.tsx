import { Col, Form, Row } from "antd";
import React, { FC } from "react";
import {
  phoneValidation,
  requiredInput
} from "../../../lib/validation/InputValidations";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import { EditClientRecipientTypes } from "../../../lib/types/pageTypes/Clients/EditClientRecipientTypes";

const EditClientRecipient: FC<EditClientRecipientTypes> = ({
  onEditClientRecipientFinish,
  isLoading,
  form
}) => {
  return (
    <Form
      onFinish={onEditClientRecipientFinish}
      form={form}
      name="EditClientRecipient"
      layout="vertical"
      title=""
    >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Input
            name="names"
            type="text"
            label="Names"
            placeholder="Names"
            rules={requiredInput}
          />
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Input
            name="phone"
            type="text"
            label="Phone"
            placeholder="Phone"
            rules={phoneValidation}
          />
        </Col>
      </Row>

      <Row justify="end" className="mt-7">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            SAVE CHANGES
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default EditClientRecipient;
