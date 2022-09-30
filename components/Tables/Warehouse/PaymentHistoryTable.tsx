/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import RowsWrapper from "../RowsWrapper";
import { Image } from "antd";
import { PaymentHistoryTableData } from "../Dummies/PaymentHistoryTableData";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import CustomButton from "../../Shared/Button/button";

const { Text } = Typography;

type PaymentHistoryTableTypes = {
  key: number;
  amount: number;
  date: string;
  ref: string;
};
const PaymentHistoryTable = () => {
  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>amount</span>
        </div>
      ),
      key: "amount",
      render: (
        text: PaymentHistoryTableTypes,
        record: PaymentHistoryTableTypes
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{record?.key}</Text>
            <div className="flex flex-col">
              <Text className="normalText fowe900">
                {record?.amount && numbersFormatter(record?.amount)} Rwf
              </Text>
            </div>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "date",
      key: "date",
      render: (
        text: PaymentHistoryTableTypes,
        record: PaymentHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record?.date}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "ref",
      key: "ref",
      render: (
        text: PaymentHistoryTableTypes,
        record: PaymentHistoryTableTypes
      ) => (
        <RowsWrapper>
          <div className="flex items-center gap-2">
            <Text className="normalText fowe700">MoMo Ref:</Text>
            <Text className="normalText opacity_56">{record?.ref}</Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "action",
      key: "action",
      render: () => (
        <RowsWrapper>
          <div className="flex justify-end items-center">
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
          </div>
        </RowsWrapper>
      )
    }
  ];
  return (
    <Table
      className="data_table  noborder"
      columns={columns}
      dataSource={PaymentHistoryTableData}
      rowKey={(record) => record?.key}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
      showHeader={false}
    />
  );
};

export default PaymentHistoryTable;
