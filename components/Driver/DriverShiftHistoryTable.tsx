// /* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import moment from "moment";
import { FC } from "react";
import Row from "antd/lib/row";
import RowsWrapper from "../Tables/RowsWrapper";
import { numbersFormatter } from "../../helpers/numbersFormatter";
import { orderStatus, paymentStatus } from "../../utils/orderStatus";
import { TableOnActionLoading } from "../Shared/Loaders/Loaders";

const { Text } = Typography;

const dumpData = [
  {
    id: 0,
    startDateTime: "12-04-2022",
    totalAmount: 765657,
    paymentStatus: "PENDING",
    status: "FULL_PAID"
  },

  {
    id: 1,
    startDateTime: "12-04-2022",
    totalAmount: 765657,
    paymentStatus: "PENDING",
    status: "FULL_PAID"
  }
];

type ClientOrderHistoryTableProps = {
  isClientOrdersFetching: boolean;
};

const DriverShiftHistoryTable: FC<ClientOrderHistoryTableProps> = ({
  isClientOrdersFetching
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
      render: (text: any, record: any, index: number) => (
        <RowsWrapper>
          <Row className="flex gap-10 cursor-pointer">
            <Text className="normalText opacity_56">{index + 1}</Text>
            <Text className="normalText fowe900 underline">{record?.id}</Text>
          </Row>
        </RowsWrapper>
      )
    },
    {
      title: "Date",
      key: "Date",
      render: (text: any, record: any) => (
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
      render: (text: any, record: any) => (
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
      render: (text: any, record: any) => {
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
      render: (text: any, record: any) => {
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
      dataSource={dumpData}
      rowKey={(record) => record?.id}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
      loading={TableOnActionLoading(isClientOrdersFetching)}
    />
  );
};

export default DriverShiftHistoryTable;
