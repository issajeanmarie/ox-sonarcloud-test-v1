import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { TrucksUsageTableData } from "./Dummies/TrucksUsageTableData";
import { TrucksUsageTableTypes } from "../../../lib/types/pageTypes/Analytics/TrucksUsageTableTypes";
import RowsWrapper from "./RowsWrapper";

const { Text } = Typography;

const TrucksUsageTable = () => {
  const columns = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>Truck</span>
        </div>
      ),
      key: "Truck",
      render: (text: TrucksUsageTableTypes, record: TrucksUsageTableTypes) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{record.key}</Text>
            <Text className="normalText fowe700">{record.Truck}</Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Model",
      key: "Model",
      render: (text: TrucksUsageTableTypes, record: TrucksUsageTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record.Model}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "Revenue made",
      key: "RevenueMade",
      render: (text: TrucksUsageTableTypes, record: TrucksUsageTableTypes) => (
        <RowsWrapper>
          <div className="flex items-center gap-1">
            <Text className="normalText fowe700">{record.RevenueMade}</Text>
            <Text className="text-xs fowe700">
              {record.RevenueMadePercentage}
            </Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Cash paid",
      key: "CashPaid",
      render: (text: TrucksUsageTableTypes, record: TrucksUsageTableTypes) => (
        <RowsWrapper>
          <div className="flex items-center gap-1">
            <Text className="normalText fowe700">{record.CashPaid}</Text>
            <Text className="text-xs fowe700 red">
              {record.CashPaidPercentage}
            </Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Distance",
      key: "Distance",
      render: (text: TrucksUsageTableTypes, record: TrucksUsageTableTypes) => (
        <RowsWrapper>
          <div className="flex items-center gap-1">
            <Text className="normalText fowe700">{record.Distance}</Text>
            <Text className="text-xs fowe700 red">
              {record.DistancePercentage}
            </Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "KG/KM",
      key: "KG/KM",
      render: (text: TrucksUsageTableTypes, record: TrucksUsageTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record.KGPerKM}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "Weight",
      key: "Weight",
      render: (text: TrucksUsageTableTypes, record: TrucksUsageTableTypes) => (
        <RowsWrapper>
          <div className="flex items-center gap-1">
            <Text className="normalText fowe700">{record.Weight}</Text>
            <Text className="text-xs fowe700 yellow">
              {record.WeightPercentage}
            </Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Hours used",
      key: "HoursUsed",
      render: (text: TrucksUsageTableTypes, record: TrucksUsageTableTypes) => (
        <RowsWrapper>
          <div className="flex items-center gap-1">
            <Text className="normalText fowe700">{record.HoursUsed}</Text>
            <Text className="text-xs fowe700 red">
              {record.HoursUsedPercentage}
            </Text>
          </div>
        </RowsWrapper>
      )
    }
  ];
  return (
    <Table
      className="data_table light_white_header light_white_table"
      columns={columns}
      dataSource={TrucksUsageTableData}
      rowKey={(record) => record.key}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
    />
  );
};

export default TrucksUsageTable;
