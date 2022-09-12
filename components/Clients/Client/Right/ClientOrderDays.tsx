import { Col, Divider, Image, Row } from "antd";
import React, { FC } from "react";
import { ClientOrderDaysTypes } from "../../../../lib/types/pageTypes/Clients/ClientOrderDaysTypes";
import CustomButton from "../../../Shared/Button/button";

const ClientOrderDays: FC<ClientOrderDaysTypes> = ({ orderDays }) => {
  return (
    <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] mt-4">
      <Row justify="space-between" align="middle" className="w-full p-8">
        <Col flex="auto">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">ORDER DAYS</span>
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

      <Row justify="space-between" className="w-full p-8">
        {orderDays?.length === 0 ? (
          <span className="font-light">Oder days will appear here</span>
        ) : (
          <>
            {orderDays?.map((day: string, index: number) => (
              <Col key={`${index * 2}-${day}`}>
                <span
                  className={`rounded-full ${
                    day === "M" || day === "F"
                      ? "yellow_faded_bg text-white"
                      : "bg_white_input"
                  }  day_circle cursor-pointer`}
                >
                  {day?.charAt(0)}
                </span>
              </Col>
            ))}
          </>
        )}
      </Row>
    </Row>
  );
};

export default ClientOrderDays;
