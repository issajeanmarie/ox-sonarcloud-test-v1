/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { ClientOrderRecipientTableTypes } from "../../../lib/types/pageTypes/Clients/ClientOrderRecipientTypes";
import RowsWrapper from "../RowsWrapper";
import { Button } from "antd";
import { FC } from "react";

const { Text } = Typography;

type ClientOrderRecipientTableProps = {
  recipients: any;
};

const ClientOrderRecipientTable: FC<ClientOrderRecipientTableProps> = ({
  recipients
}) => {
  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>name</span>
        </div>
      ),
      key: "name",
      render: (
        text: ClientOrderRecipientTableTypes,
        record: ClientOrderRecipientTableTypes,
        index: number
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{index + 1}</Text>
            <div className="flex flex-col">
              <Text className="normalText fowe900">{record?.names}</Text>
              <Text className="normalText opacity_56">{record?.phone}</Text>
            </div>
          </div>
        </RowsWrapper>
      )
    },

    {
      title: "action",
      key: "action",
      render: () => (
        <RowsWrapper>
          <div className="flex justify-end items-center gap-4">
            <Button
              // onClick={() => showEditModal(record)}
              style={{ margin: 0, padding: 0 }}
              type="text"
            >
              edit
            </Button>
            <Button
              // onClick={() => showModal(record)}
              style={{ margin: 0, padding: 0 }}
              type="text"
            >
              del
            </Button>
          </div>
        </RowsWrapper>
      )
    }
  ];
  return (
    <Table
      className="data_table  noborder"
      columns={columns}
      dataSource={recipients}
      rowKey={(record) => record?.key}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
      showHeader={false}
    />
  );
};

export default ClientOrderRecipientTable;
