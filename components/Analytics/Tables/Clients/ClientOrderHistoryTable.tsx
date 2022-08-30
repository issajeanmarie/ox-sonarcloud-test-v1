/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { ClientsTableTypes } from "../../../../lib/types/pageTypes/Clients/ClientsTableTypes";
import RowsWrapper from "../RowsWrapper";
import { numbersFormatter } from "../../../../helpers/numbersFormatter";
import { ClientOrderHistoryTableData } from "../Dummies/ClientOrderHistoryTableData";

const { Text } = Typography;

const ClientOrderHistoryTable = () => {
  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>Name</span>
        </div>
      ),
      key: "Name",
      render: (text: ClientsTableTypes, record: ClientsTableTypes) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{record?.key}</Text>
            <Text className="normalText fowe700">
              {record?.firstName} {record?.lastName}
            </Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Phone number",
      key: "phoneNumber",
      render: (text: ClientsTableTypes, record: ClientsTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record?.phoneNumber}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "Email",
      key: "email",
      render: (text: ClientsTableTypes, record: ClientsTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record?.email}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "Location",
      key: "location",
      render: (text: ClientsTableTypes, record: ClientsTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record?.location}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "Pending payment",
      key: "pendingPayment",
      render: (text: ClientsTableTypes, record: ClientsTableTypes) => (
        <RowsWrapper>
          {record?.pendingPayment ? (
            <Text className=" text-sm font-bold red">
              {numbersFormatter(record?.pendingPayment)} Rwf
            </Text>
          ) : (
            <Text className="normalText opacity_56">...</Text>
          )}
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
