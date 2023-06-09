import { Col, Divider, Empty, Row } from "antd";
import React, { FC, useState } from "react";
import { OrderSummaryInfoWrapper } from "../Left/InfoWrapper";
import CustomButton from "../../../Shared/Button/button";
import PaymentStatusCard from "./PaymentStatusCard";
import PaymentHistoryTable from "../../../Tables/Warehouse/PaymentHistoryTable";
import { numbersFormatter } from "../../../../helpers/numbersFormatter";
import EditPaymentStatus from "../../../Forms/Orders/EditPaymentStatus";
import EmptyData from "../../../Shared/EmptyData";
import { PlusOutlined } from "@ant-design/icons";
import DocumentCard from "../../../Analytics/Trucks/TruckCard";
import NewTRuckDocumentModal from "../../../Modals/NewTruckDocumentModal";

type SingleOrderRightTypes = {
  sale: any;
  isFetching: boolean;
};

const SingleOrderRight: FC<SingleOrderRightTypes> = ({ sale, isFetching }) => {
  const [isEditPaymentStatus, setIsEditPaymentStatus] =
    useState<boolean>(false);
  const [isNewDocumentModalVisible, setIsNewDocumentModalVisible] =
    useState(false);

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
      <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] p-7 py-8">
        <div className="w-full mt-">
          <div className="mb-8">
            <span className="font-bold text-lg">ORDER SUMMARY</span>
          </div>
          <OrderSummaryInfoWrapper
            title="Price"
            infoItem={`${
              sale?.totalAmount &&
              numbersFormatter(
                sale?.totalAmount + (sale?.transportOrder?.totalAmount || 0)
              )
            } Rwf`}
          />
          <OrderSummaryInfoWrapper
            title="Payment status"
            infoItem={sale?.paymentStatus?.replace("_", " ")}
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
            } Rwf`}
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

      <div className="bg-white shadow-[0px_0px_19px_#00000008]">
        <div className="flex items-center justify-between mb-3 p-12 py-8 pb-3">
          <span className="text-lg font-bold text-ox-dark">
            ATTACH DOCUMENTS
          </span>

          <CustomButton
            onClick={() => setIsNewDocumentModalVisible(true)}
            type="secondary"
            size="icon"
            loading={false}
            icon={<PlusOutlined />}
          />
        </div>

        <Divider />

        <Row gutter={24} className="p-12">
          {sale?.documents?.length <= 0 ? (
            <div className="justify-center w-full">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          ) : (
            sale?.documents?.map((document: Document) => (
              <Col
                key={document.title}
                sm={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: 12 }}
                className="mb-8"
              >
                <DocumentCard
                  document={document}
                  truckData={sale}
                  isDocumentForSale
                  isDocumentForOrder={false}
                />
              </Col>
            ))
          )}
        </Row>
      </div>

      <EditPaymentStatus
        order={sale}
        closeModal={() => setIsEditPaymentStatus(false)}
        isEditPaymentStatus={isEditPaymentStatus}
        setIsEditPaymentStatus={setIsEditPaymentStatus}
        isSaleOrder={true}
      />

      <NewTRuckDocumentModal
        truckData={sale}
        isVisible={isNewDocumentModalVisible}
        setIsVisible={setIsNewDocumentModalVisible}
        isDocumentForSale
      />
    </Col>
  );
};

export default SingleOrderRight;
