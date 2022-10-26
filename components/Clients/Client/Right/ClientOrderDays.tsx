import { Col, Divider, Row } from "antd";
import React, { FC } from "react";
import { STATIC_DAYS } from "../../../../config/constants";
import { ClientOrderDaysTypes } from "../../../../lib/types/pageTypes/Clients/ClientOrderDaysTypes";

const ClientOrderDays: FC<ClientOrderDaysTypes> = ({ orderDays }) => {
  return (
    <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] mt-4">
      <Row justify="space-between" align="middle" className="w-full p-8">
        <Col flex="auto">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">ORDER DAYS</span>
          </div>
        </Col>
      </Row>
      <Divider style={{ padding: 0, margin: 0 }} />

      <Row justify="space-between" className="w-full p-8">
        {STATIC_DAYS.map((day) => (
          <Col key={day.id}>
            <span
              className={`${
                orderDays?.indexOf(day.name) >= 0
                  ? "yellow_faded_bg text-white"
                  : "bg_white_input"
              }   day_circle cursor-pointer rounded-full`}
            >
              {day.name.charAt(0)}
            </span>
          </Col>
        ))}
      </Row>
    </Row>
  );
};

export default ClientOrderDays;
