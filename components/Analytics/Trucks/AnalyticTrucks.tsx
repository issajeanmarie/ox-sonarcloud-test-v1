/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from "react";
import AnalyticTopContentWrapper from "../Wrappers/AnalyticTopContentWrapper";
import CardColWrapper from "../../Cards/CardColWrapper";
import CardRowWrapper from "../../Cards/CardRowWrapper";
import MediumCard from "../../Cards/MediumCard";
import TrucksUsageTable from "../../Tables/Analytics/TrucksUsageTable";
import TrucksUsage from "./TrucksUsage";
import { AnalyticTrucksTypes } from "../../../lib/types/pageTypes/Analytics/AnalyticTrucksTypes";
import {
  StockCardsLoader,
  AnalyticsTruckLoader
} from "../../Shared/Loaders/Loaders";
import { useUploadFuelReportMutation } from "../../../lib/api/endpoints/Trucks/truckEndpoints";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { UploadProps } from "antd";
import { useTruckAnalyticsQuery } from "../../../lib/api/endpoints/Analytics/analyticEndpoints";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";

const AnalyticTrucks: FC<AnalyticTrucksTypes> = ({
  active,
  sorter,
  onStartDateChange,
  onEndDateChange,
  handleSearch,
  handleDownloadClients,
  isDownloadingTruckReport,
  isDownloadFetching,
  selectedSort,
  setSelectedSort,
  depotsState,
  startDate,
  endDate,
  searchQuery
}) => {
  const formData = new FormData();
  const [uploadResponse, setUploadResponse] = useState("");
  const [uploadFuelReport, { isLoading: uploadingFuelReport }] =
    useUploadFuelReportMutation();

  const {
    data: truckData,
    isLoading: truckLoading,
    isFetching: truckFetching
  } = useTruckAnalyticsQuery({
    depot: depotsState?.depotId,
    start: startDate,
    end: endDate,
    sortBy: sorter?.value || "",
    direction: "",
    search: searchQuery
  });

  const handleUploadFileSuccess = (res: any) => {
    setUploadResponse(res.message);
  };

  const uploadFileProps: UploadProps = {
    name: "report",
    showUploadList: false,
    onChange(info: any) {
      formData.append("report", info?.file?.originFileObj);

      handleAPIRequests({
        request: uploadFuelReport,
        report: formData,
        handleSuccess: handleUploadFileSuccess
      });
    }
  };

  useEffect(() => {
    uploadResponse !== "" && SuccessMessage(uploadResponse);
  }, [uploadResponse, uploadingFuelReport]);

  return (
    <>
      <AnalyticTopContentWrapper active={active}>
        {truckLoading ? (
          <>
            <CardRowWrapper active={active}>
              {[...Array(5)].map((_, index) => (
                <StockCardsLoader key={index} />
              ))}
            </CardRowWrapper>
          </>
        ) : (
          <CardRowWrapper active={active}>
            <CardColWrapper active={active}>
              <MediumCard
                title="Number of trucks"
                subTitle="The total number of trucks"
                count={truckData?.payload?.numberOfTrucks}
                isFetching={truckFetching}
              />
            </CardColWrapper>
            <CardColWrapper active={active}>
              <MediumCard
                title="In use"
                subTitle="Those ready to be used"
                count={truckData?.payload?.inUse}
                isFetching={truckFetching}
              />
            </CardColWrapper>
            <CardColWrapper active={active}>
              <MediumCard
                title="Deactivated"
                subTitle="In garage or out of service"
                count={truckData?.payload?.notInUse}
                isFetching={truckFetching}
              />
            </CardColWrapper>
            <CardColWrapper active={active}>
              <MediumCard
                title="Top performing"
                subTitle="The truck that is doing great"
                count={truckData?.payload?.topPerforming}
                isFetching={truckFetching}
              />
            </CardColWrapper>
            <CardColWrapper active={active}>
              <MediumCard
                title="Worst performing"
                subTitle="The truck that is performing poorly"
                count={truckData?.payload?.worstPerforming}
                isFetching={truckFetching}
              />
            </CardColWrapper>
          </CardRowWrapper>
        )}
        {!truckLoading && (
          <TrucksUsage
            sorter={sorter}
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
            uploadingFuelReport={uploadingFuelReport}
            uploadFileProps={uploadFileProps}
            handleSearch={handleSearch}
            handleDownloadClients={handleDownloadClients}
            isDownloadingTruckReport={isDownloadingTruckReport}
            isDownloadFetching={isDownloadFetching}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        )}
      </AnalyticTopContentWrapper>

      {truckLoading ? (
        <>
          {[...Array(20)].map((_, index) => (
            <AnalyticsTruckLoader key={index} />
          ))}
        </>
      ) : (
        <div className="mb-10">
          <TrucksUsageTable
            truckData={truckData?.payload?.truckAnalytics}
            truckFetching={truckFetching}
          />
        </div>
      )}
    </>
  );
};

export default AnalyticTrucks;
