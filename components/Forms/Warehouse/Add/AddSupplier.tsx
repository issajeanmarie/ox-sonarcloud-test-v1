/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Image, Row } from "antd";
import React, { FC } from "react";
import {
  phoneValidation,
  requiredInput
} from "../../../../lib/validation/InputValidations";
import Input from "../../../Shared/Input";
import Button from "../../../Shared/Button";
import { LatLng } from "use-places-autocomplete";
import { ECONOMIC_STATUS } from "../../../../config/constants";

type AddSupplierTypes = {
  onAddSupplierFinish: (values: any) => void;
  isLoading: boolean;
  form: any;
  setLocation: React.Dispatch<
    React.SetStateAction<
      | {
          name: string;
          coordinates: LatLng;
        }
      | undefined
    >
  >;
  location:
    | {
        name: string;
        coordinates: LatLng;
      }
    | undefined;
};

const AddSupplier: FC<AddSupplierTypes> = ({
  onAddSupplierFinish,
  isLoading,
  form,
  setLocation,
  location
}) => {
  return (
    <Form
      onFinish={onAddSupplierFinish}
      form={form}
      name="AddSupplier"
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
            name="email"
            type="text"
            label="Email"
            placeholder="example@domain.com"
            rules={requiredInput}
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
            type="select"
            label="Economic status"
            placeholder="Select economic status"
            options={ECONOMIC_STATUS}
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
            name="tinNumber"
            type="text"
            label="TIN"
            placeholder="Enter your TIN"
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="ADDRESS"
            type="location"
            label="Address"
            placeholder="Search for location"
            setLocation={setLocation}
            location={location}
          />
        </Col>
      </Row>

      <Row justify="end" className="mt-7">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            ADD SUPPLIER
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddSupplier;
