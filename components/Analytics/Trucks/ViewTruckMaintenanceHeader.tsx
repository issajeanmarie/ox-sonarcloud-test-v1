import { Col, Image, Row, Typography } from "antd";
import React, { FC } from "react";
import Input from "../../Shared/Input";
import CustomButton from "../../Shared/Button/button";
import { TruckMaintenanceCheckListTypes } from "../../../lib/types/pageTypes/Analytics/TrucksUsageTableTypes";

const { Text } = Typography;

const ViewTruckMaintenanceHeader: FC<TruckMaintenanceCheckListTypes> = ({
  onStartDateChange,
  onEndDateChange
}) => {
  return (
    <>
      <Row
        justify="space-between"
        className="bg-white py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808] mb-4"
      >
        <Col className="flex items-center gap-4">
          <Text className="heading2">22 Records</Text>

          <Input
            onDateChange={onStartDateChange}
            defaultValue={localStorage.getItem("ox_startDate")}
            type="date"
            name="Start"
            placeholder="Start"
            suffixIcon={
              <Image
                preview={false}
                src="/icons/ic-actions-calendar.svg"
                alt=""
                width={18}
              />
            }
          />

          <Input
            onDateChange={onEndDateChange}
            defaultValue={localStorage.getItem("ox_endDate")}
            type="date"
            name="End"
            placeholder="End"
            suffixIcon={
              <Image
                preview={false}
                src="/icons/ic-actions-calendar.svg"
                alt=""
                width={18}
              />
            }
          />
        </Col>

        <Col>
          <Row gutter={12} align="middle" justify="end">
            <Col>
              <CustomButton disabled={false} type="secondary">
                Download report
              </CustomButton>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ViewTruckMaintenanceHeader;
