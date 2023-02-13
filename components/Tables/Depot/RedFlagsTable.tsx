// eslint-disable-next-line no-unused-vars
import React, { FC, useState } from "react";
import Table from "antd/lib/table";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import Button from "../../Shared/Button";
import CustomButton from "../../Shared/Button";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { RedFlagResponse, SingleRedFlag } from "../../../lib/types/depots";
import { dateDisplay } from "../../../utils/dateFormatter";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { useResolveRedFlagMutation } from "../../../lib/api/endpoints/Depots/depotEndpoints";
import { useRouter } from "next/router";

const { Text } = Typography;

type Types = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsJustifyFlagModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  flagsData: RedFlagResponse;
  setActiveFlag: React.Dispatch<React.SetStateAction<SingleRedFlag | null>>;
};

const RedFlagsTable: FC<Types> = ({
  setIsVisible,
  setIsJustifyFlagModalVisible,
  isLoading,
  flagsData,
  setActiveFlag
}) => {
  const [flagToResolve, setFlagToResolve] = useState<number | null>(null);
  const handleShowRedFlagData = (record: SingleRedFlag) => {
    setActiveFlag(record);
    setIsVisible(true);
  };

  const handleShowJustifyModal = (record: SingleRedFlag) => {
    setActiveFlag(record);
    setIsJustifyFlagModalVisible(true);
  };

  const router = useRouter();
  const { id } = router.query;

  const [resolveRedFlag] = useResolveRedFlagMutation();

  const handleResolveFlagSuccess = () => {
    setFlagToResolve(null);
  };

  const handleResolveRedFlag = (redFlagId: number) => {
    setFlagToResolve(redFlagId);

    handleAPIRequests({
      request: resolveRedFlag,
      id,
      redFlagId,
      showSuccess: true,
      handleSuccess: handleResolveFlagSuccess
    });
  };

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
            {record?.type?.replaceAll("_", " ")}
          </Text>
        </div>
      )
    },

    {
      title: "Reported on",
      key: "date",
      render: (record: SingleRedFlag) => (
        <span className="normalText">{dateDisplay(record?.date)}</span>
      )
    },

    {
      title: "Truck",
      key: "plateNumber",
      render: (record: SingleRedFlag) => (
        <span className="normalText">
          {record?.fuelRefill?.truck?.plateNumber}
        </span>
      )
    },

    {
      title: "Red flag",
      key: "redFlag",
      render: (record: SingleRedFlag) => (
        <CustomButton
          onClick={() => handleShowRedFlagData(record)}
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
        <Row>
          <Col
            onClick={() =>
              record?.status === "JUSTIFIED" && handleShowJustifyModal(record)
            }
            className={`normalText fowe700 text_ellipsis ${
              record?.status === "RESOLVED"
                ? "text-gray-500"
                : record?.status === "OPEN"
                ? "text-ox-red"
                : "dark underline pointer"
            }`}
          >
            {record?.status}
          </Col>
        </Row>
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
              loading={record?.id === flagToResolve}
              onClick={() =>
                record.status === "OPEN" && handleResolveRedFlag(record?.id)
              }
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
              disabled={record?.status === "JUSTIFIED"}
              onClick={() => handleShowJustifyModal(record)}
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
