import { Col, Form, Image, Row } from "antd";
import React, { FC } from "react";
import {
  emailValidationNotRequired,
  requiredInput
} from "../../../../lib/validation/InputValidations";
import Input from "../../../Shared/Input";
import Button from "../../../Shared/Button";
import { AddDriverTypes } from "../../../../lib/types/pageTypes/Accounts/Drivers/AddDriverTypes";
import CustomPhoneInput from "../../../Shared/Custom/CustomPhoneInput";

const AddNewDriver: FC<AddDriverTypes> = ({
  onAddDriverFinish,
  isLoading,
  form,
  phoneNumber,
  setPhoneNumber
}) => {
  return (
    <Form
      onFinish={onAddDriverFinish}
      form={form}
      name="AddNewDriver"
      layout="vertical"
      title=""
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
            rules={requiredInput}
            type="select"
            label="Gender"
            placeholder="Select gender"
            options={[
              { label: "Male", value: "MALE" },
              { label: "Female", value: "FEMALE" }
            ]}
            name="gender"
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
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
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
      </Row>

      <Row justify="end" className="mt-7">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            ADD DRIVER
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddNewDriver;
