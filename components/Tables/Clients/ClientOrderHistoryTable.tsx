/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { ClientOrderHistoryTableTypes } from "../../../lib/types/pageTypes/Clients/ClientOrderHistoryTableTypes";
import RowsWrapper from "../RowsWrapper";
import moment from "moment";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import { FC } from "react";
import { routes } from "../../../config/route-config";
import Link from "next/link";

const { Text } = Typography;

type ClientOrderHistoryTableProps = {
  orders: any;
};

const ClientOrderHistoryTable: FC<ClientOrderHistoryTableProps> = ({
  orders
}) => {
  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>Order</span>
        </div>
      ),
      key: "Order",
      render: (
        text: ClientOrderHistoryTableTypes,
        record: ClientOrderHistoryTableTypes,
        index: number
      ) => (
        <RowsWrapper>
          <Link passHref href={routes.viewOrder.url + record.id}>
            <div className="flex gap-10 cursor-pointer">
              <Text className="normalText opacity_56">{index + 1}</Text>
              <Text className="normalText fowe900 underline">{record?.id}</Text>
            </div>
          </Link>
        </RowsWrapper>
      )
    },
    {
      title: "Date",
      key: "Date",
      render: (
        text: ClientOrderHistoryTableTypes,
        record: ClientOrderHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">
            {record?.startDateTime &&
              moment(record?.startDateTime).format("ll")}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "Job value",
      key: "JobValue",
      render: (
        text: ClientOrderHistoryTableTypes,
        record: ClientOrderHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText fowe900">
            {record?.totalAmount && numbersFormatter(record?.totalAmount)} Rwf
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "Payment",
      key: "Payment",
      render: (
        text: ClientOrderHistoryTableTypes,
        record: ClientOrderHistoryTableTypes
      ) => (
        <RowsWrapper>
          <div className="flex gap-4">
            <Text
              className={`normalText fowe900 
            ${record?.paymentStatus === "HALF_PAID" && "yellow_faded_text"}
             ${record?.paymentStatus === "FULL_PAID" && "toggle_grey"}
              ${record?.paymentStatus === "NOT_PAID" && "red"}
            `}
            >
              {record?.paymentStatus}
            </Text>
            {record?.paymentStatus === "HALF_PAID" && (
              <Text className="normalText opacity_56">
                {record?.paidAmount}
              </Text>
            )}
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Order status",
      key: "OrderStatus",
      render: (
        text: ClientOrderHistoryTableTypes,
        record: ClientOrderHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text
            className={`normalText fowe900 
            ${record?.status === "COMPLETED" && "toggle_grey"}
            ${record?.status === "CANCELLED" && "red"}
               ${record?.status === "PENDING" && "black"}
            `}
          >
            {record?.status}
          </Text>
        </RowsWrapper>
      )
    }
  ];
  return (
    <Table
      className="data_table light_white_header light_white_table"
      columns={columns}
      dataSource={orders}
      rowKey={(record) => record?.key}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
    />
  );
};

export default ClientOrderHistoryTable;
