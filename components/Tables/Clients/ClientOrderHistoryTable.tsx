/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { ClientOrderHistoryTableTypes } from "../../../lib/types/pageTypes/Clients/ClientOrderHistoryTableTypes";
import RowsWrapper from "../RowsWrapper";
import moment from "moment";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import { FC } from "react";
import Row from "antd/lib/row";
import { routes } from "../../../config/route-config";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import { useRouter } from "next/router";
import { orderStatus, paymentStatus } from "../../../utils/orderStatus";

const { Text } = Typography;

type ClientOrderHistoryTableProps = {
  orders: any;
  isClientOrdersFetching: boolean;
};

const ClientOrderHistoryTable: FC<ClientOrderHistoryTableProps> = ({
  orders,
  isClientOrdersFetching
}) => {
  const router = useRouter();
  const { depotId, depotName } = router.query;

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
          <Row
            className="flex gap-10 cursor-pointer"
            onClick={() =>
              router.push({
                pathname: `${routes.viewOrder.url}/${record?.id}`,
                query: {
                  depotId: depotId || 0,
                  depotName: depotName || "All depots"
                }
              })
            }
          >
            <Text className="normalText opacity_56">{index + 1}</Text>
            <Text className="normalText fowe900 underline">{record?.id}</Text>
          </Row>
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
      ) => {
        const { isFullPaid, isHalfPaid, isPending } = paymentStatus(
          record?.paymentStatus
        );

        return (
          <RowsWrapper>
            <div className="flex gap-4">
              <Text
                className={`normalText fowe900 
            ${isHalfPaid && "yellow_faded_text"}
             ${isFullPaid && "toggle_grey"}
              ${isPending && "red"}
            `}
              >
                {record?.paymentStatus}
              </Text>
              {isHalfPaid && (
                <Text className="normalText opacity_56">
                  {record?.paidAmount}
                </Text>
              )}
            </div>
          </RowsWrapper>
        );
      }
    },
    {
      title: "Order status",
      key: "OrderStatus",
      render: (
        text: ClientOrderHistoryTableTypes,
        record: ClientOrderHistoryTableTypes
      ) => {
        const { isPending } = paymentStatus(record?.paymentStatus);
        const { isCanceled, isComplete } = orderStatus(record?.status);

        return (
          <RowsWrapper>
            <Text
              className={`normalText fowe900 
            ${isComplete && "toggle_grey"}
            ${isCanceled && "red"}
               ${isPending && "black"}
            `}
            >
              {record?.status}
            </Text>
          </RowsWrapper>
        );
      }
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
      loading={TableOnActionLoading(isClientOrdersFetching)}
    />
  );
};

export default ClientOrderHistoryTable;
