/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import { abbreviateNumber } from "../../utils/numberFormatter";

const LeftSideInnerHeader = () => {
  return (
    <Row className="bg-white py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808] border-[1px_solid_#EAEFF2A1] flex justify-between sticky top-0 z-10">
      <Col className="flex items-center gap-6">
        <span className="font-bold">Orders (21)</span>
      </Col>

      <Col className="flex items-center gap-4">
        <span className=" opacity_56">Sub Total:</span>
        <span className="font-bold yellow">
          {abbreviateNumber(764787678)} Rwf
        </span>
      </Col>
    </Row>
  );
};

export default LeftSideInnerHeader;
