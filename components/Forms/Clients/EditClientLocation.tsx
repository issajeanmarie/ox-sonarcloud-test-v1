import { Col, Form, Popover, Row } from "antd";
import React, { FC } from "react";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import { EditClientLocationTypes } from "../../../lib/types/pageTypes/Clients/EditClientLocationTypes";

const EditClientLocation: FC<EditClientLocationTypes> = ({
  onEditClientLocationFinish,
  isLoading,
  form,
  setLocation,
  location,
  setLocationName,
  locationName
}) => {
  return (
    <Form
      form={form}
      onFinish={onEditClientLocationFinish}
      name="EditClientLocation"
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
            type="location"
            label="Names"
            placeholder="Search location name"
            setLocation={setLocationName}
            location={locationName}
          />
        </Col>
      </Row>

      <Row justify="end" className="mt-7">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          {!location || !locationName ? (
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
                SAVE CHANGES
              </Button>
            </Popover>
          ) : (
            <Button loading={isLoading} type="primary" htmlType="submit">
              SAVE CHANGES
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default EditClientLocation;
