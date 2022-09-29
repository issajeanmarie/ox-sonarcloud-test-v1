/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Image, Row } from "antd";
import React, { FC } from "react";
import {
  phoneValidation,
  requiredInput
} from "../../../../lib/validation/InputValidations";
import Input from "../../../Shared/Input";
import Button from "../../../Shared/Button";

type EditSupplierTypes = {
  onEditSupplierFinish: (values: any) => void;
  isLoading: boolean;
  form: any;
};

const EditSupplier: FC<EditSupplierTypes> = ({
  onEditSupplierFinish,
  isLoading,
  form
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
            label="Economic status"
            placeholder="Select economic status"
            options={[
              { label: "INDIVIDUAL", value: "INDIVIDUAL" },
              { label: "COMPANY", value: "COMPANY" },
              { label: "GROUP", value: "GROUP" },
              { label: "UBUDEHE CATEGORY A", value: "UBUDEHE_CATEGORY_A" },
              { label: "UBUDEHE CATEGORY B", value: "UBUDEHE_CATEGORY_B" },
              { label: "UBUDEHE CATEGORY C", value: "UBUDEHE_CATEGORY_C" },
              { label: "UBUDEHE CATEGORY D", value: "UBUDEHE_CATEGORY_D" },
              { label: "UBUDEHE CATEGORY E", value: "UBUDEHE_CATEGORY_E" },
              { label: "WAREHOUSE", value: "WAREHOUSE" }
            ]}
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
