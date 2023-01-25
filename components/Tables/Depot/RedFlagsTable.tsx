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
import { RedFlagResponse, SingleRedFlag } from "../../../lib/types/depots";

const { Text } = Typography;

type Types = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsJustifyFlagModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  flagsData: RedFlagResponse;
};

const RedFlagsTable: FC<Types> = ({
  setIsVisible,
  setIsJustifyFlagModalVisible,
  isLoading,
  flagsData
}) => {
  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>Red flag type</span>
        </div>
      ),
      key: "type",
      render: (text: string, record: SingleRedFlag, index: number) => (
        <div className="flex gap-10">
          <Text className="normalText opacity_56">{index + 1}</Text>
          <Text className="normalText fowe700 text_ellipsis">
            {record?.type}
          </Text>
        </div>
      )
    },

    {
      title: "Reported on",
      key: "date",
      render: (record: SingleRedFlag) => (
        <span className="normalText">{record?.date}</span>
      )
    },

    {
      title: "Truck",
      key: "plateNumber",
      render: (record: SingleRedFlag) => (
        <span className="normalText">
          {record?.lastRefuel?.truck?.plateNumber}
        </span>
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
      render: (record: SingleRedFlag) => (
        <Text className="normalText fowe700 text_ellipsis">
          {record?.status}
        </Text>
      )
    },

    {
      title: "Status",
      key: "status",
      width: "100px",
      render: (record: SingleRedFlag) => (
        <Row gutter={12} align="middle" wrap={false}>
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
      dataSource={flagsData?.payload?.content}
      rowKey={(record) => record?.id}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
      loading={TableOnActionLoading(isLoading)}
    />
  );
};

export default RedFlagsTable;
