/* eslint-disable react/no-unescaped-entities */
import { Col, Form, Row, Typography } from "antd";
import React from "react";
import InfoWrapper from "./InfoWrapper";
import Button from "../../../Shared/Button";
import Input from "../../../Shared/Input";
import { requiredInput } from "../../../../lib/validation/InputValidations";

const { Text } = Typography;

const SingleOrderLeft = () => {
  return (
    <Col
      className="h-[86vh] overflow-auto"
      xs={24}
      sm={24}
      md={14}
      lg={14}
      xl={14}
      xxl={14}
    >
      <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] p-14">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-lg">ORDER WH123456789</span>
          <span className="text-sm">14 Feb 2022</span>
        </div>

        <div className="w-full mt-9">
          <div className="mb-4">
            <span className="text-base font-light">Client details</span>
          </div>
          x
          <InfoWrapper title="Name" infoItem="NIYONZIMA Philbert" />
          <InfoWrapper title="Branch" infoItem="Ruhango, Rwanda (Gafunzo)" />
        </div>

        <div className="w-full mt-9">
          <div className="mb-4">
            <span className="text-base font-light">Order details</span>
          </div>
          <InfoWrapper title="Item" infoItem="Animal feed" />
          <InfoWrapper title="Type" infoItem="Type 1" />
          <InfoWrapper title="Weight" infoItem="400 KGs - 20Rwf/KG" />
          <InfoWrapper title="Transport Ref" infoItem="123456789" />
        </div>

        <div className="w-full mt-9">
          <div className="mb-4">
            <span className="text-base font-light">Admin's comment</span>
          </div>
          <Form name="AddAdminComment" layout="vertical" title="">
            <Row className="flex justify-end gap-8">
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Input
                  type="text_area"
                  name="comment"
                  label="Comment"
                  placeholder="Type something"
                  rules={requiredInput}
                />
              </Col>
            </Row>
            <div className="flex items-center justify-end py-4 gap-2">
              <Text className="text-sm opacity_56  nowrap font-bold">
                Order created by:
              </Text>
              <Text className="text-sm opacity_56 nowrap">Yves Honore</Text>
            </div>

            <Row className="flex justify-end gap-8">
              <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                <Button type="primary" htmlType="submit">
                  ADD COMMENT
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Row>
    </Col>
  );
};

export default SingleOrderLeft;
