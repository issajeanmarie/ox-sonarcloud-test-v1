/* eslint-disable react/no-unescaped-entities */
import { Col, Row } from "antd";
import React, { FC } from "react";
import InfoWrapper from "./InfoWrapper";
import moment from "moment";
import { numbersFormatter } from "../../../../helpers/numbersFormatter";

type SingleOrderLeftTypes = {
  sale: any;
};

const SingleOrderLeft: FC<SingleOrderLeftTypes> = ({ sale }) => {
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
          {sale?.client?.offices &&
            sale?.client?.offices?.map((item: any) => (
              <InfoWrapper
                key={item?.id}
                title={item?.type}
                infoItem={item?.names}
                isTransportOrder={false}
              />
            ))}
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
                  infoItem={item?.warehouseItem?.parentCategory?.name}
                  isTransportOrder={false}
                />
                <InfoWrapper
                  title="Type"
                  infoItem={item?.warehouseItem?.category?.name}
                  isTransportOrder={false}
                />
                <InfoWrapper
                  title="Weight"
                  infoItem={`${
                    numbersFormatter(item?.weight || 0) || 0
                  } KGs - ${
                    numbersFormatter(
                      item?.warehouseItem?.unitSellingPrice || 0
                    ) || 0
                  } Rwf/KG `}
                  isTransportOrder={false}
                />
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
