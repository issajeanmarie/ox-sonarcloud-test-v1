import { Col, Form, Image, Row } from "antd";
import React, { FC } from "react";
import {
  emailValidationNotRequired,
  phoneValidation,
  requiredInput
} from "../../../lib/validation/InputValidations";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import { AddDriverTypes } from "../../../lib/types/pageTypes/Drivers/AddDriverTypes";

const AddNewDriver: FC<AddDriverTypes> = ({
  onAddDriverFinish,
  isLoading,
  form
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
            name="email"
            type="text"
            label="Email"
            placeholder="example@domain.rw"
            rules={emailValidationNotRequired}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="phone"
            type="text"
            label="Phone number"
            placeholder="- - - - - - - -"
            rules={phoneValidation}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            type="select"
            label="Driving License"
            placeholder="Select driving license"
            options={[
              { label: "Category A", value: "A" },
              { label: "Category B", value: "B" }
            ]}
            name="drivingLicense"
            suffixIcon={
              <Image
                preview={false}
                src="/icons/expand_more_black_24dp.svg"
                alt=""
                width={10}
              />
            }
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
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="*************"
            rules={requiredInput}
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
