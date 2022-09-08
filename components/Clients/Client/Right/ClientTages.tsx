import { Col, Divider, Image, Row, Tag } from "antd";
import React, { FC } from "react";
import { ClientTagesTypes } from "../../../../lib/types/pageTypes/Clients/ClientTagesTypes";
import CustomButton from "../../../Shared/Button/button";

type clientTags = {
  name: string | undefined;
  id: number | undefined;
};

const ClientTages: FC<ClientTagesTypes> = ({ client }) => {
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
        {client?.tags?.length < 1 ? (
          <span className="font-light">Tags will appear here</span>
        ) : (
          <>
            {client?.tags?.map((tag: clientTags) => (
              <Tag key={tag?.id} closable>
                {tag?.name}
              </Tag>
            ))}
          </>
        )}
      </div>
    </Row>
  );
};

export default ClientTages;
