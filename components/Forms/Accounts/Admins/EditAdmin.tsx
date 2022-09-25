import { Col, Form, Row } from "antd";
import React, { FC } from "react";
import {
  emailValidationNotRequired,
  requiredInput
} from "../../../../lib/validation/InputValidations";
import Input from "../../../Shared/Input";
import Button from "../../../Shared/Button";
import { EditAdminTypes } from "../../../../lib/types/pageTypes/Accounts/Admins/EditAdminTypes";
import CircleCheckbox from "../../../Shared/Custom/CircleCheckbox";

const EditAdmin: FC<EditAdminTypes> = ({
  onEditAdminFinish,
  isLoading,
  form,
  setCheckbox,
  checkbox
}) => {
  return (
    <Form
      onFinish={onEditAdminFinish}
      form={form}
      name="EditAdmin"
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

        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Input
            name="email"
            type="text"
            label="Email"
            placeholder="example@domain.rw"
            rules={emailValidationNotRequired}
          />
        </Col>
      </Row>

      <Row align="middle" className="mt-10">
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <div className="flex items-center gap-4">
            <span className="font-bold underline">Make a guest</span>
            <CircleCheckbox
              defaultValue={checkbox}
              checked={checkbox}
              setState={setCheckbox}
              state={checkbox}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            SAVE CHANGES
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default EditAdmin;
