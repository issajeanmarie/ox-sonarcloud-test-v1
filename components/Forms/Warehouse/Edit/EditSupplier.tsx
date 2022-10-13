/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Image, Row } from "antd";
import React, { FC } from "react";
import { requiredInput } from "../../../../lib/validation/InputValidations";
import Input from "../../../Shared/Input";
import Button from "../../../Shared/Button";
import { ECONOMIC_STATUS } from "../../../../config/constants";
import CustomPhoneInput from "../../../Shared/Custom/CustomPhoneInput";

type EditSupplierTypes = {
  onEditSupplierFinish: (values: any) => void;
  isLoading: boolean;
  form: any;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
};

const EditSupplier: FC<EditSupplierTypes> = ({
  onEditSupplierFinish,
  isLoading,
  form,
  phoneNumber,
  setPhoneNumber
}) => {
  return (
    <Form
      onFinish={onEditSupplierFinish}
      form={form}
      name="EditSupplier"
      layout="vertical"
      title=""
    >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
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
            placeholder="example@domain.com"
            // rules={requiredInput}
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
          <Input
            name="tinNumber"
            type="text"
            label="TIN"
            placeholder="Enter your TIN"
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

export default EditSupplier;
