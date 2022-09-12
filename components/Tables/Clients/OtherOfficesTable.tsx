/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { OtherOfficesTableTypes } from "../../../lib/types/pageTypes/Clients/OtherOfficesTableTypes";
import RowsWrapper from "../RowsWrapper";
import { FC } from "react";
import { CloseIcon } from "../../Icons";
import { Button } from "antd";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { limitStringLengthSmall } from "../../../helpers/limitStringLength";

const { Text } = Typography;

type OtherOfficesTableProps = {
  offices: any;
  setOffices: React.Dispatch<React.SetStateAction<any>>;
};
const OtherOfficesTable: FC<OtherOfficesTableProps> = ({
  offices,
  setOffices
}) => {
  const deleteOffice = (id: number) => {
    setOffices(offices.filter((item: any) => item?.id !== id));
    SuccessMessage("Office was removed");
  };

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
            <Text className="normalText opacity_56">{record?.id}</Text>
            <div className="flex flex-col">
              <Text className="normalText fowe900">{record?.names}</Text>
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
          <Text className="normalText opacity_56">
            {record?.location && limitStringLengthSmall(record?.location)}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "action",
      key: "action",
      render: (
        text: OtherOfficesTableTypes,
        record: OtherOfficesTableTypes
      ) => (
        <RowsWrapper>
          <div className="flex justify-end items-center">
            <Button
              onClick={() => deleteOffice(record?.id)}
              style={{ margin: 0, padding: 0 }}
              type="text"
            >
              {CloseIcon}
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
      dataSource={offices}
      rowKey={(record) => record?.key}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
      showHeader={false}
    />
  );
};

export default OtherOfficesTable;
