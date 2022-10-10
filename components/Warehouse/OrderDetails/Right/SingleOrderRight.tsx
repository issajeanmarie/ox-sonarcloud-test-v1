import { Col, Divider, Row } from "antd";
import React, { FC } from "react";
import { OrderSummaryInfoWrapper } from "../Left/InfoWrapper";
import CustomButton from "../../../Shared/Button/button";
import PaymentStatusCard from "./PaymentStatusCard";
import PaymentHistoryTable from "../../../Tables/Warehouse/PaymentHistoryTable";
import { numbersFormatter } from "../../../../helpers/numbersFormatter";

type SingleOrderRightTypes = {
  sale: any;
};

const SingleOrderRight: FC<SingleOrderRightTypes> = ({ sale }) => {
  return (
    <Col className="h-[86vh] overflow-auto" flex="auto">
      <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] p-7">
        <div className="w-full mt-9">
          <div className="mb-8">
            <span className="font-bold text-lg">ORDER SUMMARY</span>
          </div>
          <OrderSummaryInfoWrapper
            title="Price"
            infoItem={`${
              sale?.transportOrder?.totalAmount &&
              numbersFormatter(sale?.transportOrder?.totalAmount)
            } Rwf`}
          />
          <OrderSummaryInfoWrapper
            title="Payment status:"
            infoItem={sale?.transportOrder?.paymentStatus}
          />
        </div>
      </Row>

      <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] mt-4">
        <Row justify="space-between" align="middle" className="w-full p-7">
          <Col>
            <span className="font-bold text-lg">PAYMENT STATUS</span>
          </Col>
          <Col>
            <CustomButton type="secondary">
              <span className="text-sm">UPDATE</span>
            </CustomButton>
          </Col>
        </Row>
        <Divider style={{ margin: 0, padding: 0 }} />
        <Row
          gutter={[16, 16]}
          justify="space-between"
          align="middle"
          className="w-full p-7"
        >
          <PaymentStatusCard
            title="Paid"
            count={`${
              sale?.transportOrder?.totalPaid &&
              numbersFormatter(sale?.transportOrder?.totalPaid)
            } RWF`}
          />
          <PaymentStatusCard
            title="Remaining"
            count={`${
              sale?.transportOrder?.remainingAmount &&
              numbersFormatter(sale?.transportOrder?.remainingAmount)
            } Rwf`}
          />
        </Row>
      </Row>

      <Row className="bg-[#FFFFFF] rounded  shadow-y-[0px_0px_19px_#00000008]">
        <Row justify="space-between" align="middle" className="w-full p-7">
          <Col className="mb-4">
            <span className="font-light">Payment history</span>
          </Col>
          <Col style={{ width: "100%" }}>
            <PaymentHistoryTable />
          </Col>
        </Row>
      </Row>
    </Col>
  );
};

export default SingleOrderRight;
