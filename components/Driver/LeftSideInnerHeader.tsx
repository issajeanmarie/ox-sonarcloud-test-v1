/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import { FC } from "react";
import { abbreviateNumber } from "../../utils/numberFormatter";

interface Props {
  totalRevenue: number;
  ordersNumbers: number;
}

const LeftSideInnerHeader: FC<Props> = ({ totalRevenue, ordersNumbers }) => {
  return (
    <Row className="bg-white py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808] border-[1px_solid_#EAEFF2A1] flex justify-between sticky top-0 z-10">
      <Col className="flex items-center gap-6">
        <span className="font-bold">Orders ({ordersNumbers})</span>
      </Col>

      <Col className="flex items-center gap-4">
        <span className=" opacity_56">Sub Total:</span>
        <span className="font-bold yellow">
          {abbreviateNumber(totalRevenue)} Rwf
        </span>
      </Col>
    </Row>
  );
};

export default LeftSideInnerHeader;
