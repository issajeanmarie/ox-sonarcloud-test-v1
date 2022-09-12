import { Col, Form, Row } from "antd";
import React, { FC } from "react";
import { requiredInput } from "../../../lib/validation/InputValidations";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import { AddClientLocationTypes } from "../../../lib/types/pageTypes/Clients/AddClientLocationTypes";

const AddClientLocation: FC<AddClientLocationTypes> = ({
  onAddClientLocationFinish,
  isLoading,
  setLocation,
  location,
  form
}) => {
  return (
    <Form
      onFinish={onAddClientLocationFinish}
      form={form}
      name="AddClientLocation"
      layout="vertical"
      title=""
    >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="location"
            type="location"
            label="Location"
            placeholder="Search for location"
            setLocation={setLocation}
            location={location}
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
      </Row>

      <Row justify="end" className="mt-7">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Button
            disabled={
              !location || Object.keys(location).length === 0 ? true : false
            }
            loading={isLoading}
            type="primary"
            htmlType="submit"
          >
            ADD LOCATION
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddClientLocation;
