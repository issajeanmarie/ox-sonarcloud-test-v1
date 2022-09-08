import { Table } from "antd";
import Typography from "antd/lib/typography";
import { SettingsKPIsTableTypes } from "../../../lib/types/pageTypes/Settings/SettingsKPIsTableTypes";
import RowsWrapper from "../RowsWrapper";
import CustomInput from "../../Shared/Input";
import { FC } from "react";
import { SettingsKPIsTableProps } from "../../../lib/types/pageTypes/Settings/SettingsKPIsTableProps";

const { Text } = Typography;

const SettingsKPIsTable: FC<SettingsKPIsTableProps> = ({
  data,
  handlePostTargetPerDaykpi,
  handlePostTargetPerKmykpi
}) => {
  const columns = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>Depot</span>
        </div>
      ),
      key: "name",
      render: (
        text: SettingsKPIsTableTypes,
        record: SettingsKPIsTableTypes
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{record.depotId}</Text>
            <Text className="normalText fowe700">{record.depotName}</Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Revenue",
      key: "Revenue",
      render: (
        text: SettingsKPIsTableTypes,
        record: SettingsKPIsTableTypes
      ) => (
        <RowsWrapper>
          <CustomInput
            onChange={handlePostTargetPerDaykpi}
            defaultValue={record?.targetPerDay}
            type="text"
            inputType="number"
            placeholder="Type revenue..."
            name="revenue"
            suffixIcon={
              <span
                style={{ color: "#000000", opacity: 0.34, fontSize: "0.9rem" }}
              >
                Rwf
              </span>
            }
          />
        </RowsWrapper>
      )
    },
    {
      title: "Revenue/km",
      key: "Revenuekm",
      render: (
        text: SettingsKPIsTableTypes,
        record: SettingsKPIsTableTypes
      ) => (
        <RowsWrapper>
          <CustomInput
            onChange={handlePostTargetPerKmykpi}
            defaultValue={record?.targetPerKm}
            type="text"
            inputType="number"
            placeholder="Type revenue/km..."
            name="rperkm"
            suffixIcon={
              <span
                style={{ color: "#000000", opacity: 0.34, fontSize: "0.9rem" }}
              >
                Rwf
              </span>
            }
          />
        </RowsWrapper>
      )
    }
  ];
  return (
    <Table
      className="bordered_table"
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.depotId}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
    />
  );
};

export default SettingsKPIsTable;
