/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import RowsWrapper from "../RowsWrapper";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import { StockHistoryTableTypes } from "../../../lib/types/pageTypes/Warehouse/Stock/StockHistoryTableTypes";
import { StockHistoryTableData } from "../Dummies/StockHistoryTableData";
import { Image } from "antd";
import CustomButton from "../../Shared/Button";

const { Text } = Typography;

const StockHistoryTable = () => {
  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>Name</span>
        </div>
      ),
      key: "Name",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{record?.key}</Text>
            <Text
              className={`normalText ${
                record?.Status === "NOT EXPIRED" ? "fowe700" : "opacity_56"
              }`}
            >
              {record?.Name}
            </Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Date",
      key: "Date",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record?.Date}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "Supplier",
      key: "Supplier",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record?.Supplier}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "KGs",
      key: "KGs",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text
            className={`normalText  ${
              record?.Status === "NOT EXPIRED" ? "fowe700" : "opacity_56"
            } ${record?.KGs < 1 && "red"} `}
          >
            {record?.KGs}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "Type",
      key: "Type",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record?.Type}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "Exp. Date",
      key: "ExpDate",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record?.ExpDate}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "Transport",
      key: "Transport",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText fowe700 cursor-pointer">
            {record?.Transport ? (
              <span className="underline">{record?.Transport}</span>
            ) : (
              "-"
            )}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "Status",
      key: "Status",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text
            className={`normalText  ${
              record?.Status === "NOT EXPIRED" ? "fowe700" : "opacity_56"
            }`}
          >
            {record?.Status}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: (
        <div className="flex justify-start items-center">
          <span>Action</span>
        </div>
      ),
      width: "100px",
      key: "Action",
      render: () => (
        <RowsWrapper>
          <div className="flex justify-start items-center gap-4">
            <div className="h-1 flex items-center">
              <CustomButton
                type="normal"
                size="icon"
                icon={
                  <Image
                    src="/icons/ic-contact-edit.svg"
                    alt=""
                    width={16}
                    preview={false}
                  />
                }
              />
            </div>

            <div className="h-1 flex items-center">
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
            </div>
          </div>
        </RowsWrapper>
      )
    }
  ];
  return (
    <Table
      className="data_table light_white_header light_white_table@"
      columns={columns}
      dataSource={StockHistoryTableData}
      rowKey={(record) => record?.key}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
      loading={TableOnActionLoading(false)}
    />
  );
};

export default StockHistoryTable;
