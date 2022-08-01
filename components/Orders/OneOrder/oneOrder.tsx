/* eslint-disable no-unsafe-optional-chaining */
import { FC } from "react";
import Table from "antd/lib/table";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import CustomButton from "../../Shared/Button";
import { Order, Order as OrderType } from "../../../lib/types/orders";
import { dateFormatterNth } from "../../../utils/dateFormatter";
import { abbreviateNumber } from "../../../utils/numberFormatter";
import PaymentStatus from "../../Shared/PaymentStatus";

const { Column } = Table;
const { Text } = Typography;

interface OrderProps {
  order: OrderType;
}

type Types = {
  key: number;
  plate: string;
  driver: string;
  weight: string;
  unitPrice: string;
  from: string;
  to: string;
  price: string;
  supporting: string;
};

const Order: FC<OrderProps> = ({ order }) => {
  return (
    <div className="shadow w-full my-5">
      {/* TOP ROW */}
      <div className="p-5 border-b flex items-center justify-between bg-white">
        {/* TOP ROW RIGHT SIDE */}
        <div className="flex-1">
          <Row align="middle" gutter={32}>
            <Col>
              <Image
                width={16}
                src="/icons/ic-actions-user-yellow.svg"
                preview={false}
                alt=""
              />
            </Col>

            <Col>
              <Text className="heading2">{order?.office?.client?.names}</Text>
            </Col>
            <Col>
              <Text className="normalText opacity_56">{order.clientPhone}</Text>
            </Col>
          </Row>
        </div>

        {/* TOP ROW RIGHT SIDE */}
        <div className="flex gap-10 ">
          <div className="text-right">
            <PaymentStatus
              amt={order.totalAmount}
              status={order.paymentStatus}
            />
          </div>

          <div className="flex justify-end flex-1 items-center gap-4">
            <Text className="captionText">Order status:</Text>
            <Text className="normalText fowe700">{order.status}</Text>
          </div>
        </div>
      </div>

      {/* MIDDLE ROW */}
      <Table
        className="data_table"
        dataSource={[order, ...order?.supportOrders]}
        rowKey={(record) => record.id}
        pagination={false}
        showHeader={false}
        bordered={false}
        scroll={{ x: "100%" }}
        tableLayout="auto"
      >
        <Column
          key="key"
          title="Name"
          render={(text, record: Order) => {
            const child = (
              <div className="flex items-center gap-3">
                <Image
                  width={22}
                  src="/icons/ic-ecommerce-delivery-yellow.svg"
                  preview={false}
                  alt=""
                />

                <div className="flex items-center gap-3">
                  {record?.stops[0]?.truck?.plateNumber ? (
                    <Text className="heading2 nowrap">
                      {record?.stops[0]?.truck?.plateNumber}
                    </Text>
                  ) : (
                    <span className=" text-gray-300">Truck unavailable</span>
                  )}
                  <span className="nowrap opacity_56 text-xs">
                    {record?.stops[0]?.driver?.names}
                  </span>
                </div>
              </div>
            );
            return { children: child, props: { "data-label": "Name" } };
          }}
        />

        <Column
          key="name"
          title="Weight"
          render={(text: Types, record: Order) => {
            let totalWeight = 0;
            record?.stops?.forEach((stop) => {
              totalWeight = totalWeight + stop.weight;
            });
            const child = (
              <div className="flex items-center gap-3">
                <Text className="heading2 nowrap">
                  {abbreviateNumber(totalWeight)} KG
                </Text>

                <span className="text-xs opacity_56 nowrap">20 Rwf / Kg</span>
              </div>
            );
            return { children: child, props: { "data-label": "Name" } };
          }}
        />

        <Column
          key="from"
          title="From"
          render={(text, record: Order) => {
            const child = (
              <div className="flex items-center gap-4">
                <Text className="heading2">From</Text>
                <Text className="font-extralight text-xs">
                  {record.stops[0]?.location?.split(" ")[0] || "---"}
                </Text>
              </div>
            );
            return { children: child, props: { "data-label": "Phone number" } };
          }}
        />

        <Column
          key="key"
          title="To"
          render={(text, record: Order) => {
            const child = (
              <div className="flex items-center gap-4">
                <Text className="heading2">To</Text>
                <Text className="font-extralight text-xs">
                  {record?.stops[record?.stops?.length - 1]?.location?.split(
                    " "
                  )[0] || "---"}
                </Text>
                {record.isSupportOrder && (
                  <Text className="captionText ml-5">Supporting order</Text>
                )}
              </div>
            );
            return { children: child, props: { "data-label": "Email" } };
          }}
        />

        <Column
          key="key"
          title="Supporting"
          render={(text: Types, record: Types) => {
            const child = (
              <Text className="captionText opacity_56 italic nowrap mb0">
                {record.supporting}
              </Text>
            );
            return { children: child, props: { "data-label": "Status" } };
          }}
        />
        <Column
          width={160}
          render={() => (
            <PaymentStatus amt={order.totalAmount} status="HALF_PAID" />
          )}
        />

        <Column
          key="key"
          title="Action"
          render={() => {
            const child = (
              <div className="flex items-center gap-3 justify-end">
                <CustomButton
                  type="normal"
                  size="icon"
                  icon={
                    <Image
                      src="/icons/ic-ecommerce-invoice.svg"
                      alt="OX Delivery Logo"
                      width={12}
                      preview={false}
                    />
                  }
                />

                <CustomButton
                  type="danger"
                  size="icon"
                  icon={
                    <Image
                      src="/icons/ic-actions-remove.svg"
                      alt="OX Delivery Logo"
                      width={12}
                      preview={false}
                    />
                  }
                />

                <CustomButton type="view" size="small">
                  View
                </CustomButton>
              </div>
            );
            return { children: child, props: { "data-label": "Status" } };
          }}
        />
      </Table>

      {/* BOTTOM ROW */}
      <Row
        justify="space-between"
        style={{
          borderTop: "1px solid #eaeff2",
          padding: "16px 24px"
        }}
        className="bg-white"
      >
        {/* TOP ROW RIGHT SIDE */}
        <Col>
          <Row gutter={12} align="middle">
            <Col>
              <Text className="text-xs opacity_56 nowrap">
                Created: {dateFormatterNth(order.startDateTime)}
              </Text>
            </Col>

            <Col>
              {order.lastEditedBy && (
                <Text className="normalText opacity_56 italic nowrap ">
                  - Edited by {order.lastEditedBy}
                </Text>
              )}
            </Col>
          </Row>
        </Col>

        <Col>
          <Text className="text-xs opacity_56 italic nowrap mb0">
            {order.depot.name}
          </Text>
        </Col>
      </Row>
    </div>
  );
};

export default Order;
