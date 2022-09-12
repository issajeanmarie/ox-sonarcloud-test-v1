import { Col, Form, Row } from "antd";
import React, { FC } from "react";
import {
  phoneValidation,
  requiredInput
} from "../../../lib/validation/InputValidations";
import Input from "../../Shared/Input";
import { AddClientRecipientTypes } from "../../../lib/types/pageTypes/Clients/AddClientRecipientTypes";
import CustomPhoneInput from "../../Shared/Custom/CustomPhoneInput";

const AddClientRecipient: FC<AddClientRecipientTypes> = ({
  onAddClientRecipientFinish,
  phoneNumber,
  setPhoneNumber
}) => {
  return (
    <Form
      onFinish={onAddClientRecipientFinish}
      name="AddClientRecipient"
      layout="vertical"
      title=""
      id="AddClientRecipient"
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
    </Form>
  );
};

export default AddClientRecipient;
