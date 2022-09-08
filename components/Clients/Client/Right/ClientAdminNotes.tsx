/* eslint-disable react/no-unescaped-entities */
import { Col, Form, Image, Row } from "antd";
import React, { FC } from "react";
import { ClientAdminNotesTypes } from "../../../../lib/types/pageTypes/Clients/ClientAdminNotesTypes";
import { requiredInput } from "../../../../lib/validation/InputValidations";
import Button from "../../../Shared/Button";
import Input from "../../../Shared/Input";

const ClientAdminNotes: FC<ClientAdminNotesTypes> = () => {
  return (
    <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] mt-4">
      <Row justify="space-between" align="middle" className="w-full p-8">
        <Col flex="auto">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">ADMIN'S NOTES</span>
          </div>
        </Col>

        <Col flex="none">
          <Button
            type="secondary"
            size="icon"
            icon={
              <Image
                src="/icons/ic-actions-add-simple.svg"
                alt="OX Delivery Logo"
                width={12}
                preview={false}
              />
            }
          />
        </Col>
      </Row>

      <div className="w-full p-8">
        <Form name="AddAdminNotes" layout="vertical" title="">
          <Row className="flex justify-end gap-8">
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Input
                type="text_area"
                name="note"
                label="Note"
                placeholder="Type something"
                rules={requiredInput}
              />
            </Col>
            <Col xs={24} sm={24} md={4} lg={4} xl={4} xxl={4}>
              <Button type="primary" htmlType="submit">
                SAVE NOTE
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Row>
  );
};

export default ClientAdminNotes;
