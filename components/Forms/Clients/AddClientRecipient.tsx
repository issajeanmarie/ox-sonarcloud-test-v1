import { Col, Form, Row } from "antd";
import React, { FC } from "react";
import { requiredInput } from "../../../lib/validation/InputValidations";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import { AddClientRecipientTypes } from "../../../lib/types/pageTypes/Clients/AddClientRecipientTypes";
import CustomPhoneInput from "../../Shared/Custom/CustomPhoneInput";

const AddClientRecipient: FC<AddClientRecipientTypes> = ({
  onAddClientRecipientFinish,
  isLoading,
  phoneNumber,
  setPhoneNumber
}) => {
  return (
    <Form
      onFinish={onAddClientRecipientFinish}
      name="AddClientRecipient"
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
          <CustomPhoneInput
            width="100%"
            name="phone"
            label="Phone number"
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            validatePhone
          />
        </Col>
      </Row>

      <Row justify="end" className="mt-7">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            ADD RECIPIENT
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddClientRecipient;
