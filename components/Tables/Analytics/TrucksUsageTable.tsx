/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { TrucksUsageTableTypes } from "../../../lib/types/pageTypes/Analytics/TrucksUsageTableTypes";
import RowsWrapper from "../RowsWrapper";
import { truckTableTypes } from "../../../lib/types/pageTypes/Analytics/AnalyticTrucksTypes";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import { truckPacentageCalculator } from "../../../helpers/pacentageCalculators";

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
        index: TrucksUsageTableTypes
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{index && index}</Text>
            <Text className="normalText fowe700">{record?.plateNumber}</Text>
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
      title: "Revenue made",
      key: "RevenueMade",
      render: (text: TrucksUsageTableTypes, record: TrucksUsageTableTypes) => (
        <RowsWrapper>
          <div className="flex items-center gap-1">
            <Text className="normalText fowe700">
              {record?.totalRevenue && numbersFormatter(record?.totalRevenue)}{" "}
              Rwf
            </Text>
            <Text className="text-xs fowe700 italic">
              {record?.previousTotalRevenue &&
                truckPacentageCalculator(
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
              {record?.totalPaid && numbersFormatter(record?.totalPaid)} Rwf
            </Text>
            <Text className="text-xs fowe700 red">
              {record.totalPaid &&
                truckPacentageCalculator(
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
              {record?.totalDistance && numbersFormatter(record?.totalDistance)}{" "}
              KMs
            </Text>
            <Text className="text-xs fowe700 red">
              {record.totalDistance &&
                truckPacentageCalculator(
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
      title: "KG/KM",
      key: "KG/KM",
      render: (text: TrucksUsageTableTypes, record: TrucksUsageTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">
            {record?.kilogramKilometre &&
              numbersFormatter(record?.kilogramKilometre)}{" "}
            KGs
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
              {record?.totalWeight && numbersFormatter(record?.totalWeight)} KGs
            </Text>
            <Text className="text-xs fowe700 yellow">
              {record.totalWeight &&
                truckPacentageCalculator(
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
            <Text className="normalText fowe700">
              {record?.totalHours && numbersFormatter(record?.totalHours)} Hrs
            </Text>
            <Text className="text-xs fowe700 red">
              {record.totalHours &&
                truckPacentageCalculator(
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
            <Text className="normalText fowe700">
              {record?.totalFuel && numbersFormatter(record?.totalFuel)} ltr
            </Text>
            <Text className="text-xs fowe700 red">
              {record.totalFuel &&
                truckPacentageCalculator(
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
      className="data_table light_white_header light_white_table"
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
