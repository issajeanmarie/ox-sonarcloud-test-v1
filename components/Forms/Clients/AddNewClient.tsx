import { Col, Form, Image, Popover, Row } from "antd";
import React, { FC } from "react";
import {
  emailValidationNotRequired,
  phoneValidation,
  requiredInput
} from "../../../lib/validation/InputValidations";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import OtherOfficesTable from "../../Tables/Clients/OtherOfficesTable";
import { AddClientTypes } from "../../../lib/types/pageTypes/Clients/AddClientTypes";
import { YellowCheckIcon } from "../../Icons";
const AddNewClient: FC<AddClientTypes> = ({
  onAddClientFinish,
  createOffices,
  onOfficeNameChange,
  offices,
  setOffices,
  isLoading,
  setLocation,
  location,
  officeName,
  form
}) => {
  return (
    <Form
      onFinish={onAddClientFinish}
      form={form}
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
            name="phone"
            type="text"
            label="Phone number"
            placeholder="- - - - - - - -"
            rules={phoneValidation}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="email"
            type="text"
            label="Email"
            placeholder="example@domain.rw"
            rules={emailValidationNotRequired}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            rules={requiredInput}
            type="select"
            label="Source"
            placeholder="Select source"
            options={[
              { label: "REFERRAL", value: "REFERRAL" },
              { label: "DRIVER PLUS", value: "DRIVER_PLUS" },
              { label: "SHORT CODE", value: "SHORT_CODE" },
              { label: "OTHER", value: "OTHER" }
            ]}
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

      <Row className="mt-12 ">
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
      </Row>

      <Row
        justify="space-between"
        gutter={[16, 16]}
        align="bottom"
        className="mt-4"
      >
        <Col xs={24} sm={24} md={10} lg={10} xl={10} xxl={10}>
          <Input
            onChange={onOfficeNameChange}
            name="officeName"
            type="text"
            label="Name"
            placeholder="Office name"
          />
        </Col>

        <Col xs={24} sm={24} md={10} lg={10} xl={10} xxl={10}>
          <Input
            name="officeLocation"
            type="location"
            label="Location"
            placeholder="Search location"
            setLocation={setLocation}
            location={location}
          />
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4} xxl={4}>
          {!location ||
          Object.keys(location).length === 0 ||
          officeName === "" ? (
            <Popover
              placement="left"
              content={
                <div className="flex flex-col">
                  <span className="font-light">Select office name </span>
                  <span className="font-light">and location</span>
                </div>
              }
              title={false}
              trigger="click"
            >
              <Button type="secondary">{YellowCheckIcon}</Button>
            </Popover>
          ) : (
            <Button onClick={() => createOffices()} type="secondary">
              {YellowCheckIcon}
            </Button>
          )}
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
