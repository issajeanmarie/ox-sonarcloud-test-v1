/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Divider, Row } from "antd";
import React, { FC } from "react";
import { abbreviator } from "../../../../helpers/abbreviator";
import { ClientInfoTypes } from "../../../../lib/types/pageTypes/Clients/ClientInfoTypes";
import MediumAvatar from "../../../Avatars/MediumAvatar";
import { YellowEditIcon } from "../../../Icons";
import CustomButton from "../../../Shared/Button/button";
import ClientInfoWrapper from "./ClientInfoWrapper";

const ClientInfo: FC<ClientInfoTypes> = ({ client }) => {
  return (
    <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008]">
      <Row justify="space-between" align="middle" className="w-full p-8">
        <Col flex="auto">
          <div className="flex items-center gap-4">
            <MediumAvatar>
              <span className="dark font-semibold text-lg opacity-90">
                {client?.names && abbreviator(client?.names)}
              </span>
            </MediumAvatar>
            <span className="font-bold text-lg">{client?.names}</span>
          </div>
        </Col>

        <Col flex="none">
          <CustomButton type="secondary" size="small">
            <span className="text-sm">{YellowEditIcon}</span>
          </CustomButton>
        </Col>
      </Row>
      <Divider style={{ padding: 0, margin: 0 }} />

      <div className="w-full p-8">
        <ClientInfoWrapper title="Phone number" infoItem={client?.phone} />
        <ClientInfoWrapper title="Source" infoItem={client?.source} />
        <ClientInfoWrapper title="Economic class" infoItem="-" />
        <ClientInfoWrapper title="Email" infoItem={client?.email} />
      </div>
    </Row>
  );
};

export default ClientInfo;
