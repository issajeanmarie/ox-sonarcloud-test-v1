/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { ClientLocationsTableTypes } from "../../../lib/types/pageTypes/Clients/ClientLocationsTableTypes";
import RowsWrapper from "../RowsWrapper";
import { ClientLocationsData } from "../Dummies/ClientLocationsData";

const { Text } = Typography;

const ClientLocationsTable = () => {
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
        text: ClientLocationsTableTypes,
        record: ClientLocationsTableTypes
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{record?.key}</Text>
            <div className="flex flex-col">
              <Text className="normalText fowe900">
                {record?.office}{" "}
                {record?.Main && (
                  <>
                    - <span className="yellow_faded_text">{record?.Main}</span>
                  </>
                )}
              </Text>
              <Text className="normalText opacity_56">{record?.location}</Text>
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
      dataSource={ClientLocationsData}
      rowKey={(record) => record?.key}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
      showHeader={false}
    />
  );
};

export default ClientLocationsTable;
