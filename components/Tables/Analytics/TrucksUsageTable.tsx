/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { TrucksUsageTableTypes } from "../../../lib/types/pageTypes/Analytics/TrucksUsageTableTypes";
import RowsWrapper from "../RowsWrapper";
import { truckTableTypes } from "../../../lib/types/pageTypes/Analytics/AnalyticTrucksTypes";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import { truckPercentageCalculator } from "../../../helpers/pacentageCalculators";
import { abbreviateNumber } from "../../../utils/numberFormatter";

const { Text } = Typography;

const TrucksUsageTable = ({ truckData, truckFetching }: truckTableTypes) => {
  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>Truck</span>
        </div>
      ),
      key: "Truck",
      render: (
        text: TrucksUsageTableTypes,
        record: TrucksUsageTableTypes,
        index: number
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{index + 1}</Text>
            <Text className="normalText fowe700 text_ellipsis">
              {record?.plateNumber}
            </Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Model",
      key: "Model",
      render: (text: TrucksUsageTableTypes, record: TrucksUsageTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record?.truckModel}</Text>
        </RowsWrapper>
      )
    },
    {
      title: () => <span className="text_ellipsis">Revenue made</span>,
      key: "RevenueMade",
      render: (text: TrucksUsageTableTypes, record: TrucksUsageTableTypes) => (
        <RowsWrapper>
          <div className="flex items-center gap-1">
            <Text className="normalText fowe700">
              {abbreviateNumber(record?.totalRevenue || 0)} Rwf
            </Text>
            <Text className="text-xs fowe700 italic">
              {!!record?.previousTotalRevenue &&
                truckPercentageCalculator(
                  record?.totalRevenue,
                  record?.previousTotalRevenue
                )}
              %
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
            <Text className="normalText fowe700">
              {abbreviateNumber(record?.totalPaid || 0)} Rwf
            </Text>
            <Text className="text-xs fowe700 red">
              {!!record.totalPaid &&
                truckPercentageCalculator(
                  record?.totalPaid,
                  record?.previousTotalPaid
                )}
              %
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
            <Text className="normalText fowe700">
              {numbersFormatter(record?.totalDistance || 0)} KMs
            </Text>
            <Text className="text-xs fowe700 red">
              {!!record.totalDistance &&
                truckPercentageCalculator(
                  record?.totalDistance,
                  record?.previousTotalDistance
                )}
              %
            </Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: () => <span className="text_ellipsis">KGKM (Pot-Act)</span>,
      key: "KGKM",
      render: (text: TrucksUsageTableTypes, record: TrucksUsageTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">
            {numbersFormatter(record?.kilogramKilometer)} -{" "}
            {numbersFormatter(record?.actualKilogramKilometer)}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "Weight",
      key: "Weight",
      render: (text: TrucksUsageTableTypes, record: TrucksUsageTableTypes) => (
        <RowsWrapper>
          <div className="flex items-center gap-1">
            <Text className="normalText fowe700">
              {!!record?.totalWeight && numbersFormatter(record?.totalWeight)}{" "}
              KGs
            </Text>
            <Text className="text-xs fowe700 yellow">
              {!record.totalWeight &&
                truckPercentageCalculator(
                  record?.totalWeight,
                  record?.previousTotalWeight
                )}
              %
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
            <Text className="normalText fowe700 text_ellipsis">
              {numbersFormatter(record?.totalHours || 0)} Hrs
            </Text>
            <Text className="text-xs fowe700 red text_ellipsis">
              {!!record.totalHours &&
                truckPercentageCalculator(
                  record?.totalHours,
                  record?.previousTotalHours
                )}
              %
            </Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Fuel liters",
      key: "FuelLiters",
      render: (record: TrucksUsageTableTypes) => (
        <RowsWrapper>
          <div className="flex items-center gap-1">
            <Text className="normalText fowe700 text_ellipsis">
              {abbreviateNumber(record?.totalFuel || 0)} ltr
            </Text>
            <Text className="text-xs fowe700 red text_ellipsis">
              {!!record.totalFuel &&
                truckPercentageCalculator(
                  record?.totalFuel,
                  record?.previousTotalFuel
                )}
              %
            </Text>
          </div>
        </RowsWrapper>
      )
    }
  ];
  return (
    <Table
      className="data_table light_white_header light_white_table@"
      columns={columns}
      dataSource={truckData}
      rowKey={(record) => record?.index}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
      loading={TableOnActionLoading(truckFetching)}
    />
  );
};

export default TrucksUsageTable;
