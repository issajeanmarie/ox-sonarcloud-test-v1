import { Col, Divider, Row } from "antd";
import React, { FC, useState } from "react";
import { OrderSummaryInfoWrapper } from "../Left/InfoWrapper";
import CustomButton from "../../../Shared/Button/button";
import PaymentStatusCard from "./PaymentStatusCard";
import PaymentHistoryTable from "../../../Tables/Warehouse/PaymentHistoryTable";
import { numbersFormatter } from "../../../../helpers/numbersFormatter";
import EditPaymentStatus from "../../../Forms/Orders/EditPaymentStatus";
import EmptyData from "../../../Shared/EmptyData";

type SingleOrderRightTypes = {
  sale: any;
  isFetching: boolean;
};

const SingleOrderRight: FC<SingleOrderRightTypes> = ({ sale, isFetching }) => {
  const [isEditPaymentStatus, setIsEditPaymentStatus] =
    useState<boolean>(false);

  return (
    <Col
      className="h-[86vh] overflow-auto"
      xs={24}
      sm={24}
      md={10}
      lg={10}
      xl={10}
      xxl={10}
    >
      <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] p-7">
        <div className="w-full mt-9">
          <div className="mb-8">
            <span className="font-bold text-lg">ORDER SUMMARY</span>
          </div>
          <OrderSummaryInfoWrapper
            title="Price"
            infoItem={`${sale?.amount && numbersFormatter(sale?.amount)} Rwf`}
          />
          <OrderSummaryInfoWrapper
            title="Payment status"
            infoItem={sale?.paymentStatus}
          />
        </div>
      </Row>

      <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] mt-4">
        <Row justify="space-between" align="middle" className="w-full p-7">
          <Col>
            <span className="font-bold text-lg">PAYMENT STATUS</span>
          </Col>
          {sale?.status !== "CANCELLED" && (
            <Col>
              <CustomButton
                form=""
                disabled={isFetching}
                onClick={() => setIsEditPaymentStatus(true)}
                type="secondary"
              >
                <span className="text-sm">UPDATE</span>
              </CustomButton>
            </Col>
          )}
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
              sale?.totalPaid && numbersFormatter(sale?.totalPaid)
            } RWF`}
          />
          <PaymentStatusCard
            title="Remaining"
            count={`${
              sale?.remainingAmount && numbersFormatter(sale?.remainingAmount)
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
            {sale?.transactions?.length === 0 ? (
              <EmptyData text="There are no transactions tied to this order yet." />
            ) : (
              <PaymentHistoryTable
                saleId={sale?.id}
                transactions={sale?.transactions}
                isFetching={isFetching}
              />
            )}
          </Col>
        </Row>
      </Row>
      <EditPaymentStatus
        order={sale}
        closeModal={() => setIsEditPaymentStatus(false)}
        isEditPaymentStatus={isEditPaymentStatus}
        setIsEditPaymentStatus={setIsEditPaymentStatus}
        isSaleOrder={true}
      />
    </Col>
  );
};

export default SingleOrderRight;
