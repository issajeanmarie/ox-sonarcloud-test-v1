/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { ClientOrderRecipientTableTypes } from "../../../lib/types/pageTypes/Clients/ClientOrderRecipientTypes";
import RowsWrapper from "../RowsWrapper";
import { ClientOrderRecipientData } from "../Dummies/ClientOrderRecipientData";

const { Text } = Typography;

const ClientOrderRecipientTable = () => {
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
        record: ClientOrderRecipientTableTypes
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{record?.key}</Text>
            <div className="flex flex-col">
              <Text className="normalText fowe900">{record?.name}</Text>
              <Text className="normalText opacity_56">{record?.telphone}</Text>
            </div>
          </div>
        </RowsWrapper>
      )
    },

    {
      title: "action",
      key: "action",
      render: () => <RowsWrapper>icon</RowsWrapper>
    }
  ];
  return (
    <Table
      className="data_table  noborder"
      columns={columns}
      dataSource={ClientOrderRecipientData}
      rowKey={(record) => record?.key}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
      showHeader={false}
    />
  );
};

export default ClientOrderRecipientTable;
