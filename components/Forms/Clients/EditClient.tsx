import { Col, Form, Image, Row } from "antd";
import React, { FC } from "react";
import {
  emailValidationNotRequired,
  requiredInput
} from "../../../lib/validation/InputValidations";
import Input from "../../Shared/Input";
import { EditClientTypes } from "../../../lib/types/pageTypes/Clients/EditClientTypes";
import { ECONOMIC_STATUS } from "../../../config/constants";
import CustomPhoneInput from "../../Shared/Custom/CustomPhoneInput";

const EditClient: FC<EditClientTypes> = ({
  onEditClientFinish,
  form,
  phoneNumber,
  setPhoneNumber
}) => {
  return (
    <Form
      onFinish={onEditClientFinish}
      form={form}
      name="EditClient"
      layout="vertical"
      title=""
      id="EditClient"
    >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="names"
            type="text"
            label="Full name"
            placeholder="Enter full name"
            rules={requiredInput}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            type="select"
            label="Economic status"
            placeholder="Select economic status"
            options={ECONOMIC_STATUS}
            name="economicStatus"
            suffixIcon={
              <Image
                preview={false}
                src="/icons/expand_more_black_24dp.svg"
                alt=""
                width={10}
              />
            }
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <CustomPhoneInput
            width="100%"
            name="phone"
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            validatePhone
            label="Phone number"
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="email"
            type="text"
            label="Email"
            placeholder="example@domain.rw"
            rules={emailValidationNotRequired}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            rules={requiredInput}
            type="select"
            label="Source"
            placeholder="Select source"
            options={[
              { label: "REFERRAL", value: "REFERRAL" },
              { label: "DRIVER PLUS", value: "DRIVER_PLUS" },
              { label: "SHORT CODE", value: "SHORT_CODE" },
              { label: "OTHER", value: "OTHER" }
            ]}
            name="source"
            suffixIcon={
              <Image
                preview={false}
                src="/icons/expand_more_black_24dp.svg"
                alt=""
                width={10}
              />
            }
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="tinNumber"
            type="text"
            label="TIN Number"
            placeholder="Enter TIN Number"
          />
        </Col>
      </Row>
    </Form>
  );
};

export default EditClient;
