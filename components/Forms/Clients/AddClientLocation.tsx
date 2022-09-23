import { Col, Form, Popover, Row } from "antd";
import React, { FC } from "react";
import Input from "../../Shared/Input";
import { AddClientLocationTypes } from "../../../lib/types/pageTypes/Clients/AddClientLocationTypes";
import { requiredInput } from "../../../lib/validation/InputValidations";

const AddClientLocation: FC<AddClientLocationTypes> = ({
  onAddClientLocationFinish,
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
      id="AddClientLocation"
    >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Input
            name="location"
            type="location"
            label="Location"
            placeholder="Search for location"
            setLocation={setLocation}
            location={location}
          />
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Input
            name="names"
            type="text"
            label="Names"
            placeholder="Location name"
            rules={requiredInput}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default AddClientLocation;
