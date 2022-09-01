import { Col, Divider, Image, Row } from "antd";
import React from "react";
import CustomButton from "../../../Shared/Button/button";
import ClientLocationsTable from "../../../Tables/Clients/ClientLocationsTable";

const ClientLocations = () => {
  return (
    <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] mt-4">
      <Row justify="space-between" align="middle" className="w-full p-8">
        <Col flex="auto">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">LOCATIONS</span>
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
        <ClientLocationsTable />
      </div>
    </Row>
  );
};

export default ClientLocations;
