import { Col, Form, Image, Row } from "antd";
import React from "react";
import { requiredInput } from "../../../lib/validation/InputValidations";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import OtherOfficesTable from "../../Tables/Clients/OtherOfficesTable";

const AddNewClient = () => {
  return (
    <Form name="AddNewClient" layout="vertical" title="">
      <Row justify="space-between" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="name"
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
            options={[
              { label: "1", value: "one" },
              { label: "2", value: "two" },
              { label: "3", value: "three" }
            ]}
            name="sort"
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
            type="select"
            label="Source"
            placeholder="Referral"
            options={[
              { label: "Item one", value: "one" },
              { label: "Item two", value: "two" },
              { label: "Item three", value: "three" }
            ]}
            name="select"
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
          <div className="mb-4">
            <OtherOfficesTable />
          </div>
        </Col>

        <Col flex="none">
          <Input
            name="name"
            type="text"
            label="Name"
            placeholder="Office name"
            rules={requiredInput}
          />
        </Col>

        <Col flex="none">
          <Input
            name="name"
            type="text"
            label="Location"
            placeholder="Search location"
            rules={requiredInput}
          />
        </Col>
        <Col flex="auto">
          <Button type="secondary">Icon</Button>
        </Col>
      </Row>

      <Row justify="end" className="mt-7">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Button type="primary" htmlType="submit">
            ADD CLIENT
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddNewClient;
