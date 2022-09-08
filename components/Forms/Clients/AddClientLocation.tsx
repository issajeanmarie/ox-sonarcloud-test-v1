import { Col, Form, Image, Row } from "antd";
import React, { FC } from "react";
import { requiredInput } from "../../../lib/validation/InputValidations";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import { AddClientLocationTypes } from "../../../lib/types/pageTypes/Clients/AddClientLocationTypes";

const AddClientLocation: FC<AddClientLocationTypes> = ({
  onAddClientLocationFinish,
  isLoading
}) => {
  return (
    <Form
      onFinish={onAddClientLocationFinish}
      name="AddClientLocation"
      layout="vertical"
      title=""
    >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="location"
            type="text"
            label="Location"
            placeholder="Search for location"
            rules={requiredInput}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
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
            rules={requiredInput}
            type="select"
            label="Type"
            placeholder="Type"
            options={[{ label: "HQ", value: "HQ" }]}
            name="type"
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
      </Row>

      <Row justify="end" className="mt-7">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            ADD LOCATION
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddClientLocation;
