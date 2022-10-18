/* eslint-disable react/no-unescaped-entities */
import { Col, Row } from "antd";
import React, { FC } from "react";
import InfoWrapper from "./InfoWrapper";
import moment from "moment";
import { numbersFormatter } from "../../../../helpers/numbersFormatter";

type SingleOrderLeftTypes = {
  sale: any;
};

enum OfficeType {
  HQ = "HQ",
  BRANCH = "BRANCH"
}

const SingleOrderLeft: FC<SingleOrderLeftTypes> = ({ sale }) => {
  const hqBranch = sale?.client?.offices?.find(
    (office: { type: OfficeType }) => office.type === OfficeType.HQ
  );

  return (
    <Col
      className="h-[86vh] overflow-auto"
      xs={24}
      sm={24}
      md={14}
      lg={14}
      xl={14}
      xxl={14}
    >
      <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] p-14">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-lg">
            ORDER {sale?.transportOrder?.id}
          </span>
          <span className="text-sm">
            {sale?.createdAt && moment(sale?.saleDate).format("ll")}
          </span>
        </div>

        <div className="w-full mt-9">
          <div className="mb-4">
            <span className="text-base font-light">Client details</span>
          </div>

          <InfoWrapper
            title="Name"
            infoItem={sale?.client?.names}
            isTransportOrder={false}
          />

          {sale?.client?.offices && (
            <InfoWrapper
              key={hqBranch?.id}
              title={hqBranch?.type}
              infoItem={hqBranch?.names}
              isTransportOrder={false}
            />
          )}
        </div>

        <div className="w-full mt-9">
          <div className="mb-4">
            <span className="text-base font-light">Order details</span>
          </div>
          {sale?.saleItems &&
            sale?.saleItems?.map((item: any) => (
              <div key={item?.id} className="mb-10">
                <InfoWrapper
                  title="Item"
                  infoItem={item?.batch?.categoryName}
                  isTransportOrder={false}
                  batchId={item?.batch?.id}
                />

                <InfoWrapper
                  title="Type"
                  infoItem={item?.batch?.parentCategoryName}
                  isTransportOrder={false}
                />

                <InfoWrapper
                  title="Weight"
                  infoItem={`${numbersFormatter(
                    item?.weight || 0
                  )} KGs / ${Math.round(item?.weight / 50)} ${
                    item?.weight > 50 ? "Bags" : "Bag"
                  } - ${numbersFormatter(
                    item?.warehouseItem?.unitSellingPrice || 0
                  )} Rwf/Kg`}
                  isTransportOrder={false}
                />

                <InfoWrapper
                  title="Supplier"
                  infoItem={item?.batch?.supplierName}
                  isTransportOrder={false}
                />

                <InfoWrapper
                  title="Cost of goods sold"
                  infoItem={`${numbersFormatter(
                    item?.unitBuyingPrice * item?.weight
                  )} Rwf`}
                  isTransportOrder={false}
                />

                <InfoWrapper
                  title="Selling price"
                  infoItem={`${numbersFormatter(
                    item?.unitSellingPrice * item?.weight
                  )} Rwf`}
                  isTransportOrder={false}
                />
                {sale?.transportOrder?.id && (
                  <InfoWrapper
                    title="Transport Ref"
                    infoItem={sale?.transportOrder?.id}
                    isTransportOrder={true}
                  />
                )}
              </div>
            ))}

          {sale?.transportOrder?.id && (
            <InfoWrapper
              title="Transport Ref"
              infoItem={sale?.transportOrder?.id}
              isTransportOrder={true}
            />
          )}
        </div>
      </Row>
    </Col>
  );
};

export default SingleOrderLeft;
