// /* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { FC } from "react";
import Row from "antd/lib/row";
import RowsWrapper from "../Tables/RowsWrapper";
import { orderStatus } from "../../utils/orderStatus";
import { TableOnActionLoading } from "../Shared/Loaders/Loaders";
import {
  DriverShiftOrders,
  DriverShiftSingleOrder
} from "../../lib/types/Accounts/drivers";
import { abbreviateNumber } from "../../utils/numberFormatter";
import { useRouter } from "next/router";
import { routes } from "../../config/route-config";
import { dateDisplay } from "../../utils/dateFormatter";

const { Text } = Typography;

type ClientOrderHistoryTableProps = {
  isFetchingOrders: boolean;
  data: DriverShiftOrders;
};

const DriverShiftHistoryTable: FC<ClientOrderHistoryTableProps> = ({
  isFetchingOrders,
  data
}) => {
  const router = useRouter();

  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>Order</span>
        </div>
      ),
      key: "Order",
      render: (text: string, record: DriverShiftSingleOrder, index: number) => (
        <RowsWrapper>
          <Row className="flex gap-10 cursor-pointer">
            <Text className="normalText opacity_56">{index + 1}</Text>
            <Text
              className="normalText fowe900 underline"
              onClick={() =>
                router.push(`${routes.viewOrder.url}/${record.id}`)
              }
            >
              {record.id}
            </Text>
          </Row>
        </RowsWrapper>
      )
    },
    {
      title: "Date",
      key: "Date",
      render: (text: string, record: DriverShiftSingleOrder) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">
            {record?.startDateTime && dateDisplay(record?.startDateTime)}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "Job value",
      key: "JobValue",
      render: (text: string, record: DriverShiftSingleOrder) => (
        <RowsWrapper>
          <Text className="normalText fowe900">
            {abbreviateNumber(record?.totalAmount || 0)} Rwf
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "Order status",
      key: "OrderStatus",
      render: (text: string, record: DriverShiftSingleOrder) => {
        const { isCanceled, isComplete } = orderStatus(record?.status);

        return (
          <RowsWrapper>
            <Text
              className={`normalText fowe900
            ${isComplete && "toggle_grey"}
            ${isCanceled && "red"}
            `}
            >
              {record?.status?.replace("_", " ")}
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
      dataSource={data?.payload?.orders}
      rowKey={(record) => record?.id}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
      loading={TableOnActionLoading(isFetchingOrders)}
    />
  );
};

export default DriverShiftHistoryTable;
