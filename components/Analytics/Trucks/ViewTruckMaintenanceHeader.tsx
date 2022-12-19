import { Col, Image, Row, Typography } from "antd";
import React, { FC } from "react";
import Input from "../../Shared/Input";
import CustomButton from "../../Shared/Button/button";
import { TruckMaintenanceCheckListTypes } from "../../../lib/types/pageTypes/Analytics/TrucksUsageTableTypes";
import { useDownloadMaintenanceCheckMutation } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { handleDownloadFile } from "../../../utils/handleDownloadFile";

const { Text } = Typography;

const ViewTruckMaintenanceHeader: FC<TruckMaintenanceCheckListTypes> = ({
  onStartDateChange,
  onEndDateChange,
  maintenanceData,
  startDate,
  endDate,
  truckId
}) => {
  const [downloadMaintenanceCheck, { isLoading }] =
    useDownloadMaintenanceCheckMutation();

  const handleDownloadSuccess = (file: File) => {
    handleDownloadFile({
      file,
      name: "Maintenance Checklist Report",
      fileFormat: "CSV"
    });
  };

  const handleDownloadMaintenanceCheck = () => {
    handleAPIRequests({
      request: downloadMaintenanceCheck,
      successMessage: "File downloaded successfully!",
      handleSuccess: handleDownloadSuccess,
      fileType: "CSV",
      truckId: truckId,
      start: startDate,
      end: endDate
    });
  };

  return (
    <>
      <Row
        justify="space-between"
        className="bg-white py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808] mb-4"
      >
        <Col className="flex items-center gap-4">
          <Text className="heading2">
            {maintenanceData?.totalElements} Records
          </Text>

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
              <CustomButton
                disabled={false}
                type="secondary"
                loading={isLoading}
                onClick={handleDownloadMaintenanceCheck}
              >
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
