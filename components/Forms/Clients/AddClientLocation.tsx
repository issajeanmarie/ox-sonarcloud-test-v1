import { Col, Form, Popover, Row } from "antd";
import React, { FC } from "react";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import { AddClientLocationTypes } from "../../../lib/types/pageTypes/Clients/AddClientLocationTypes";
import { requiredInput } from "../../../lib/validation/InputValidations";

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

      <Row justify="end" className="mt-7">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          {!location ? (
            <Popover
              placement="left"
              content={
                <div className="flex flex-col">
                  <span className="font-light">Select location </span>
                  <span className="font-light">and names</span>
                </div>
              }
              title={false}
              trigger="click"
            >
              <Button type="primary" htmlType="submit">
                ADD LOCATION
              </Button>
            </Popover>
          ) : (
            <Button loading={isLoading} type="primary" htmlType="submit">
              ADD LOCATION
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default AddClientLocation;
