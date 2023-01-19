// eslint-disable-next-line no-unused-vars
import React, { FC } from "react";
import Table from "antd/lib/table";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import Button from "../../Shared/Button";
import CustomButton from "../../Shared/Button";
import Row from "antd/lib/row";
import Col from "antd/lib/col";

const { Text } = Typography;

type Types = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsJustifyFlagModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

interface SingleTruckTypes {
  index: number;
  plateNumber: string;
  reported: string;
  truck: string;
  status: string;
}

const truckData = [
  {
    index: 0,
    plateNumber: "Fuel usage",
    reported: "2022-10-10",
    truck: "RAB 355 J",
    status: "RESOLVED"
  },

  {
    index: 1,
    plateNumber: "Fuel usage",
    reported: "2022-10-10",
    truck: "RAB 355 J",
    status: "OPEN"
  },

  {
    index: 2,
    plateNumber: "Fuel usage",
    reported: "2022-10-10",
    truck: "RAB 355 J",
    status: "JUSTIFIED"
  }
];

const RedFlagsTable: FC<Types> = ({
  setIsVisible,
  setIsJustifyFlagModalVisible
}) => {
  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>Red flag type</span>
        </div>
      ),
      key: "plateNumber",
      render: (text: any, record: SingleTruckTypes, index: number) => (
        <div className="flex gap-10">
          <Text className="normalText opacity_56">{index + 1}</Text>
          <Text className="normalText fowe700 text_ellipsis">
            {record?.plateNumber}
          </Text>
        </div>
      )
    },

    {
      title: "Reported on",
      key: "reportedOn",
      render: (record: SingleTruckTypes) => (
        <span className="normalText">{record.reported}</span>
      )
    },

    {
      title: "Truck",
      key: "truck",
      render: (record: SingleTruckTypes) => (
        <span className="normalText">{record.truck}</span>
      )
    },

    {
      title: "Red flag",
      key: "redFlag",
      render: () => (
        <CustomButton
          onClick={() => setIsVisible(true)}
          type="danger"
          size="icon"
          icon={
            <Image
              src="/icons/alert-triangle-outline.svg"
              alt="OX Delivery Logo"
              width={14}
              preview={false}
            />
          }
        />
      )
    },

    {
      title: "Status",
      key: "status",
      render: (record: SingleTruckTypes) => (
        <Text className="normalText fowe700 text_ellipsis">
          {record.status}
        </Text>
      )
    },

    {
      title: "Status",
      key: "status",
      width: "150px",
      render: (record: SingleTruckTypes) => (
        <Row gutter={12} align="middle">
          <Col>
            <CustomButton
              type={record.status === "OPEN" ? "green" : "normal"}
              size="icon"
              loading={false}
              icon={
                <Image
                  src={`/icons/${
                    record.status === "OPEN"
                      ? "check"
                      : record.status === "RESOLVED"
                      ? "double-check"
                      : "check-grey"
                  }.svg`}
                  alt=""
                  width={record.status === "RESOLVED" ? 20 : 14}
                  preview={false}
                />
              }
            />
          </Col>

          <Col>
            <Button
              type="view"
              transform="none"
              onClick={() => setIsJustifyFlagModalVisible(true)}
            >
              Justify
            </Button>
          </Col>
        </Row>
      )
    }
  ];

  return (
    <Table
      className="data_table light_white_header light_white_table depot_profile_table"
      columns={columns}
      dataSource={truckData}
      rowKey={(record) => record?.index}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
      loading={TableOnActionLoading(false)}
    />
  );
};

export default RedFlagsTable;
