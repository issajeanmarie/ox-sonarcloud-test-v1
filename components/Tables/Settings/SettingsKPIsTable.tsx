import { Table } from "antd";
import Typography from "antd/lib/typography";
import { SettingsKPIsTableData } from "../Dummies/SettingsKPIsTableData";
import { SettingsKPIsTableTypes } from "../../../lib/types/pageTypes/Settings/SettingsKPIsTableTypes";
import RowsWrapper from "../RowsWrapper";
import CustomInput from "../../Shared/Input";

const { Text } = Typography;

const SettingsKPIsTable = () => {
  const columns = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>Depot</span>
        </div>
      ),
      key: "Depot",
      render: (
        text: SettingsKPIsTableTypes,
        record: SettingsKPIsTableTypes
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{record.key}</Text>
            <Text className="normalText fowe700">{record.depot}</Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Revenue",
      key: "Revenue",
      render: () => (
        <RowsWrapper>
          <CustomInput
            type="text"
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
      render: () => (
        <RowsWrapper>
          <CustomInput
            type="text"
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
      dataSource={SettingsKPIsTableData}
      rowKey={(record) => record.key}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
    />
  );
};

export default SettingsKPIsTable;
