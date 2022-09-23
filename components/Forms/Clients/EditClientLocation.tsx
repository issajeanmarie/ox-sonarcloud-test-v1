import { Col, Form, Popover, Row } from "antd";
import React, { FC } from "react";
import Input from "../../Shared/Input";
import { EditClientLocationTypes } from "../../../lib/types/pageTypes/Clients/EditClientLocationTypes";
import { requiredInput } from "../../../lib/validation/InputValidations";

const EditClientLocation: FC<EditClientLocationTypes> = ({
  onEditClientLocationFinish,
  form,
  setLocation,
  location
}) => {
  return (
    <Form
      form={form}
      onFinish={onEditClientLocationFinish}
      name="EditClientLocation"
      layout="vertical"
      title=""
      id="EditClientLocation"
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

export default EditClientLocation;
