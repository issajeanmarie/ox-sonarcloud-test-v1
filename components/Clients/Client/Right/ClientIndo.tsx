import { Col, Divider, Row } from "antd";
import React from "react";
import MediumAvatar from "../../../Avatars/MediumAvatar";
import { YellowEditIcon } from "../../../Icons";
import CustomButton from "../../../Shared/Button/button";
import ClientInfoWrapper from "./ClientInfoWrapper";

const SingleClientRightCardWrapper = () => {
  return (
    <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008]">
      <Row justify="space-between" align="middle" className="w-full p-8">
        <Col flex="auto">
          <div className="flex items-center gap-4">
            <MediumAvatar>
              <span className="dark font-semibold text-lg opacity-90">YB</span>
            </MediumAvatar>
            <span className="font-bold text-lg">TWAGIRAYEZU Simeon</span>
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
        <ClientInfoWrapper title="Phone number" infoItem="+250 789 427 561" />
        <ClientInfoWrapper title="Source" infoItem="Referral" />
        <ClientInfoWrapper title="Economic class" infoItem="2" />
        <ClientInfoWrapper title="Email" infoItem="yveshonore14@gmail.com" />
      </div>
    </Row>
  );
};

export default SingleClientRightCardWrapper;
