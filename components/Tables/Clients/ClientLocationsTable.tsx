/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { ClientLocationsTableTypes } from "../../../lib/types/pageTypes/Clients/ClientLocationsTableTypes";
import RowsWrapper from "../RowsWrapper";
import { FC } from "react";

const { Text } = Typography;

type ClientLocationsTypes = {
  offices: any;
};

const ClientLocationsTable: FC<ClientLocationsTypes> = ({ offices }) => {
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
        record: ClientLocationsTableTypes,
        index: number
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{index + 1}</Text>
            <div className="flex flex-col">
              <Text className="normalText fowe900">
                {record?.names}{" "}
                {record?.type && (
                  <>
                    - <span className="yellow_faded_text">{record?.type}</span>
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
      dataSource={offices && offices}
      rowKey={(record) => record?.key}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
      showHeader={false}
    />
  );
};

export default ClientLocationsTable;
