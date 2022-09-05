import { Col, Divider, Image, Row, Tag } from "antd";
import React from "react";
import CustomButton from "../../../Shared/Button/button";
import { ClientTags } from "../../Dummies/ClientTags";

const ClientTages = () => {
  return (
    <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] mt-4">
      <Row justify="space-between" align="middle" className="w-full p-8">
        <Col flex="auto">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">TAGS</span>
          </div>
        </Col>

        <Col flex="none">
          <CustomButton
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
      <Divider style={{ padding: 0, margin: 0 }} />

      <div className="w-full p-8">
        {ClientTags?.map((tag) => (
          <Tag key={tag?.id} closable>
            {tag?.name}
          </Tag>
        ))}
      </div>
    </Row>
  );
};

export default ClientTages;
