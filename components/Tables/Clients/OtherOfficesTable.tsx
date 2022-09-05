/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { OtherOfficesTableTypes } from "../../../lib/types/pageTypes/Clients/OtherOfficesTableTypes";
import RowsWrapper from "../RowsWrapper";
import { OtherOfficesTableData } from "../Dummies/OtherOfficesTableData";

const { Text } = Typography;

const OtherOfficesTable = () => {
  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>office</span>
        </div>
      ),
      key: "office",
      render: (
        text: OtherOfficesTableTypes,
        record: OtherOfficesTableTypes
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{record?.key}</Text>
            <div className="flex flex-col">
              <Text className="normalText fowe900">{record?.office}</Text>
            </div>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Cordinates",
      key: "Cordinates",
      render: (
        text: OtherOfficesTableTypes,
        record: OtherOfficesTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record?.cordinates}</Text>
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
      dataSource={OtherOfficesTableData}
      rowKey={(record) => record?.key}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
      showHeader={false}
    />
  );
};

export default OtherOfficesTable;
