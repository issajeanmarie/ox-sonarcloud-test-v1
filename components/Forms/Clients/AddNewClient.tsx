import { Col, Form, Image, Row } from "antd";
import React, { FC } from "react";
import { requiredInput } from "../../../lib/validation/InputValidations";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import OtherOfficesTable from "../../Tables/Clients/OtherOfficesTable";
import { AddClientTypes } from "../../../lib/types/pageTypes/Clients/AddClientTypes";

const AddNewClient: FC<AddClientTypes> = ({
  onAddClientFinish,
  createOffices,
  onOfficeNameChange,
  onOfficeLocationChange,
  offices,
  setOffices,
  isLoading
}) => {
  return (
    <Form
      onFinish={onAddClientFinish}
      name="AddNewClient"
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
            type="select"
            label="Economic status"
            placeholder="2"
            options={[{ label: "INDIVIDUAL", value: "INDIVIDUAL" }]}
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
            name="phone"
            type="text"
            label="Phone number"
            placeholder="- - - - - - - -"
            rules={requiredInput}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="email"
            type="text"
            label="Email"
            placeholder="example@domain.rw"
            rules={requiredInput}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            rules={requiredInput}
            type="select"
            label="Source"
            placeholder="Select source"
            options={[{ label: "REFERRAL", value: "REFERRAL" }]}
            name="source"
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
            name="location"
            type="text"
            label="Main location"
            placeholder="Search for location"
            rules={requiredInput}
          />
        </Col>
      </Row>

      <Row className="mt-12 flex justify-between items-end gap-4">
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <div className="mb-4">
            <span className="font-light">Add other offices</span>
          </div>
          {offices.length > 0 && (
            <div className="mb-4">
              <OtherOfficesTable offices={offices} setOffices={setOffices} />
            </div>
          )}
        </Col>

        <Col flex="none">
          <Input
            onChange={onOfficeNameChange}
            name="officeName"
            type="text"
            label="Name"
            placeholder="Office name"
            rules={requiredInput}
          />
        </Col>

        <Col flex="auto">
          <Input
            onChange={onOfficeLocationChange}
            name="officeLocation"
            type="text"
            label="Location"
            placeholder="Search location"
            rules={requiredInput}
          />
        </Col>
        <Col flex="none">
          <Button onClick={() => createOffices()} type="secondary">
            Icon
          </Button>
        </Col>
      </Row>

      <Row justify="end" className="mt-7">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            ADD CLIENT
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddNewClient;
