/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { ClientOrderHistoryTableTypes } from "../../../lib/types/pageTypes/Clients/ClientOrderHistoryTableTypes";
import RowsWrapper from "../RowsWrapper";
import { ClientOrderHistoryTableData } from "../Dummies/ClientOrderHistoryTableData";

const { Text } = Typography;

const ClientOrderHistoryTable = () => {
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
        record: ClientOrderHistoryTableTypes
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{record?.key}</Text>
            <Text className="normalText fowe900 underline">
              {record?.Order}
            </Text>
          </div>
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
          <Text className="normalText opacity_56">{record?.Date}</Text>
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
          <Text className="normalText fowe900">{record?.JobValue}</Text>
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
            ${record?.Payment === "HALF PAID" && "yellow_faded_text"}
             ${record?.Payment === "FULLY PAID" && "toggle_grey"}
              ${record?.Payment === "NOT PAID" && "red"}
            `}
            >
              {record?.Payment}
            </Text>
            {record?.Payment === "HALF PAID" && (
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
            ${record?.OrderStatus === "COMPLETED" && "toggle_grey"}
            ${record?.OrderStatus === "CANCELLED" && "red"}
               ${record?.OrderStatus === "PENDING" && "black"}
            `}
          >
            {record?.OrderStatus}
          </Text>
        </RowsWrapper>
      )
    }
  ];
  return (
    <Table
      className="data_table light_white_header light_white_table"
      columns={columns}
      dataSource={ClientOrderHistoryTableData}
      rowKey={(record) => record?.key}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
    />
  );
};

export default ClientOrderHistoryTable;
