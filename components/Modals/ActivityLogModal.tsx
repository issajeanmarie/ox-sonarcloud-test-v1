import React, { FC, useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { Order as OrderType, SingleEditRecord } from "../../lib/types/orders";
import { Col, Empty, Row } from "antd";
import { useLazyOrderQuery } from "../../lib/api/endpoints/Orders/ordersEndpoints";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import moment from "moment";
import Spin from "antd/lib/spin";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 16, color: "black" }} spin />
);

type Props = {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isModalVisible: boolean;
  order: OrderType;
  activityLog?: SingleEditRecord[];
};

export const ActivityLogModal: FC<Props> = ({
  setIsModalVisible,
  isModalVisible,
  order,
  activityLog
}) => {
  const [getOrder, { isLoading }] = useLazyOrderQuery();
  const [records, setRecords] = useState<SingleEditRecord[]>([]);

  const handleGetSingleOrderSuccess = (res: OrderType) => {
    setRecords(res.orderEditRecords);
  };

  useEffect(() => {
    if (isModalVisible && !activityLog) {
      handleAPIRequests({
        request: getOrder,
        orderId: order.id,
        handleSuccess: handleGetSingleOrderSuccess
      });
    }
  }, [getOrder, order, isModalVisible, activityLog]);

  useEffect(() => {
    if (activityLog) {
      setRecords(activityLog);
    }
  }, [activityLog]);

  return (
    <ModalWrapper
      setIsModalVisible={setIsModalVisible}
      isModalVisible={isModalVisible}
      title="ACTIVITY LOG"
      subTitle="Order ID: 5467"
      loading={isLoading}
    >
      {isLoading ? (
        <div className="flex justify-center">
          <Spin indicator={antIcon} />
        </div>
      ) : records.length > 0 ? (
        records.map((record) => (
          <Row
            gutter={32}
            align="middle"
            className="text-gray-400 mb-6"
            key={record.id}
          >
            <Col span={2}>1</Col>
            <Col span={10}>
              {moment(record.createdAt).format("DD MMM YYYY - hh:mm")}
            </Col>
            <Col span={12}>
              <span className="text-black font-semibold">
                {record.editedBy}
              </span>{" "}
              edited{" "}
              <span className="text-black font-semibold">{`${record.editedFields.map(
                (field) =>
                  `${field} ${record.editedFields.length > 1 ? "," : ""}`
              )}`}</span>
            </Col>
          </Row>
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </ModalWrapper>
  );
};
