import React, { FC, useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Divider from "antd/lib/divider";
import Progress from "antd/lib/progress";
import CustomButton from "../../Shared/Button/button";
import TruckOverviewCard from "./TruckOverviewCard";
import {
  useDownloadTruckShiftsMutation,
  useLazyGetTruckRevenueAnalyticsQuery,
  useLazyGetTruckShiftsAnalyticsQuery
} from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { useRouter } from "next/router";
import Loader from "../../Shared/Loader";
import fileDownload from "js-file-download";
import moment from "moment";
import Input from "../../Shared/Input";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import { percentageCalculator } from "../../../helpers/pacentageCalculators";
import TruckActivityBreakdownChart from "../Charts/TruckActivityBreakdownChart";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { TruckRevenueBreakdownChart } from "../Charts/TruckRevenueBreakdownChart";
import DropDownSelector from "../../Shared/DropDownSelector";
import DaysCalculator from "../../../helpers/daysCalculator";
import { InfoMessage } from "../../Shared/Messages/InfoMessage";
import TruckRepairBreakdownChart from "../Charts/TruckRepairBreakdownChart";
import { useLazyGetTruckRepairAnalyticsQuery } from "../../../lib/api/endpoints/Analytics/analyticEndpoints";
import { daysList } from "../../../config/constants";
import {
  GetTruckOverviewResponse_Payload,
  ViewTruckPassedProps_To_OverviewPane
} from "../../../lib/types/trucksTypes";

interface Props extends ViewTruckPassedProps_To_OverviewPane {
  truckOverViewData: GetTruckOverviewResponse_Payload;
}

const OvervieWPane: FC<Props> = ({
  truckOverViewData,
  setStartDate,
  startDate,
  endDate,
  setEndDate
}) => {
  const [getTruckShiftsAnalytics, { data: truckShiftAnalyticsData }] =
    useLazyGetTruckShiftsAnalyticsQuery();
  const [getTruckRevenueAnalytics, { data: truckRevenueAnalyticsData }] =
    useLazyGetTruckRevenueAnalyticsQuery();
  const [getTruckRepairAnalytics, { data: truckRepairAnalyticsData }] =
    useLazyGetTruckRepairAnalyticsQuery();

  const [downloadTruckShifts, { isLoading: isDownloadLoading }] =
    useDownloadTruckShiftsMutation();
  const [selectedDay, setSelectedDay] = useState<any>(daysList[0]);
  const [isDateCustom, setIsDateCustom] = useState(false);

  const router = useRouter();
  const { id: truckId } = router.query;

  const isPageLoading = false;

  useEffect(() => {
    if (truckId) {
      handleAPIRequests({
        request: getTruckRepairAnalytics,
        id: truckId,
        start: startDate,
        end: endDate
      });
    }
  }, [truckId, getTruckRepairAnalytics, startDate, endDate]);

  useEffect(() => {
    if (truckId) {
      handleAPIRequests({
        request: getTruckShiftsAnalytics,
        id: truckId,
        start: startDate,
        end: endDate
      });
    }
  }, [truckId, getTruckShiftsAnalytics, startDate, endDate]);

  useEffect(() => {
    if (truckId) {
      handleAPIRequests({
        request: getTruckRevenueAnalytics,
        id: truckId,
        start: startDate,
        end: endDate
      });
    }
  }, [truckId, getTruckRevenueAnalytics, startDate, endDate]);

  useEffect(() => {
    const { start, end } = DaysCalculator(selectedDay.value || 0);
    setStartDate(start);
    setEndDate(end);
  }, [selectedDay]);

  const onStartDateChange = (_: string, date: string) => {
    setStartDate(date);
    setIsDateCustom(true);
  };
  const onEndDateChange = (_: string, date: string) => {
    setEndDate(date);
    setIsDateCustom(true);
  };

  const cardsData = [
    { name: "Repairs done", num: truckOverViewData?.repairsDone },
    {
      name: "Unresolved issues reports",
      num: truckOverViewData?.unresolvedIssues
    },
    { name: "KMs driven by OX", num: truckOverViewData?.kmsDriven },
    {
      name: "Out of service days",
      num: truckOverViewData?.outOfServiceDays,
      url: truckOverViewData
    },
    {
      name: "Days since last repair",
      num: truckOverViewData?.daysSinceLastRepair
    },
    {
      name: "KMs since last repair",
      num: truckOverViewData?.kmsSinceLastRepair
    }
  ];

  const handleDownloadFile = (file: File) => {
    const date = moment().format("YYYY-MM-DD");
    fileDownload(file, `Report-${date}.xlsx`);
  };

  const handleDownloadFileFailure = () => {
    InfoMessage("No data to download");
  };

  const handleDownloadShift = () => {
    handleAPIRequests({
      request: downloadTruckShifts,
      id: truckId,
      showSuccess: true,
      showFailure: false,
      handleSuccess: handleDownloadFile,
      handleFailure: handleDownloadFileFailure
    });
  };

  return (
    <>
      <Row
        justify="space-between"
        className="bg-white my-4 mb-4 rounded shadow-[0px_0px_19px_#2A354808]"
      >
        <Col className="flex items-center gap-4 pl-2 mb-4">
          {!isDateCustom ? (
            <DropDownSelector
              label="Show"
              dropDownContent={daysList}
              defaultSelected={selectedDay}
              setDefaultSelected={setSelectedDay}
            />
          ) : (
            <Row align="middle" gutter={12}>
              <Col className="font-bold">Custom</Col>
              <Col>
                <Image
                  onClick={() => {
                    setIsDateCustom(false);
                    setSelectedDay(daysList[0]);
                  }}
                  preview={false}
                  src="/icons/close_black_24dp.svg"
                  alt=""
                  className="mt-2 pointer"
                  width={16}
                />
              </Col>
            </Row>
          )}

          <Input
            className="mb-4"
            onDateChange={onStartDateChange}
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

        <Col className="flex items-center gap-4 mb-4">
          <CustomButton
            type="secondary"
            onClick={handleDownloadShift}
            loading={isDownloadLoading}
          >
            <span className="text-sm">DOWNLOAD SHIFT</span>
          </CustomButton>
        </Col>
      </Row>

      <Divider />

      {isPageLoading ? (
        <Loader />
      ) : (
        <>
          <Row gutter={24} className="p-0" justify="space-between">
            {cardsData?.map((data) => (
              <Col
                sm={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: 24 }}
                xl={{ span: 12 }}
                xxl={{ span: 8 }}
                key={data?.name}
                className="mb-8"
              >
                <TruckOverviewCard data={data} truckId={truckId} />
              </Col>
            ))}
          </Row>

          <Row align="middle" gutter={32} className="overviewcards_row p-0">
            <Col
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 8 }}
              className="mb-6"
            >
              <p className="mb-6 text_ellipsis" title="Revenue KPIs">
                Revenue KPIs
              </p>

              <Row align="middle" justify="space-between" wrap={false}>
                <Col
                  className="text_ellipsis"
                  title={`${numbersFormatter(
                    truckOverViewData?.totalRevenues
                  )} Rwf of ${numbersFormatter(
                    truckOverViewData?.totalKpis
                  )} Rwf`}
                >
                  <span className="font-bold">
                    {" "}
                    {numbersFormatter(
                      truckOverViewData?.totalRevenues
                    )} Rwf{" "}
                  </span>

                  <span className=" text-gray-400">
                    of {numbersFormatter(truckOverViewData?.totalKpis)} Rwf
                  </span>
                </Col>

                <Col>
                  <span className="text-gray-400 italic">
                    {percentageCalculator(
                      truckOverViewData?.totalKpis as number,
                      truckOverViewData?.totalRevenues as number
                    )}
                    %
                  </span>
                </Col>
              </Row>

              <Progress
                percent={percentageCalculator(
                  truckOverViewData?.totalKpis as number,
                  truckOverViewData?.totalRevenues as number
                )}
                strokeColor="#E3B221"
                trailColor="#EAEFF2"
                showInfo={false}
              />
            </Col>

            <Col
              sm={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
              className="mb-6"
            >
              <p className="mb-6 text_ellipsis" title="Repair cost vs Revenue">
                Repair cost vs Revenue
              </p>

              <Row align="middle" justify="space-between" wrap={false}>
                <Col
                  className="text_ellipsis"
                  title={`${numbersFormatter(
                    truckOverViewData?.totalRepairCost
                  )} RWf vs ${numbersFormatter(
                    truckOverViewData?.totalRevenues
                  )} Rwf`}
                >
                  <span className="font-bold">
                    {numbersFormatter(truckOverViewData?.totalRepairCost)} Rwf{" "}
                  </span>
                  <span className="text-gray-400">
                    vs {numbersFormatter(truckOverViewData?.totalRevenues)} Rwf
                  </span>
                </Col>

                <Col>
                  <span className="text-gray-400 italic">
                    {percentageCalculator(
                      truckOverViewData?.totalRevenues as number,
                      truckOverViewData?.totalRepairCost as number
                    )}
                    %
                  </span>
                </Col>
              </Row>

              <Progress
                percent={percentageCalculator(
                  truckOverViewData?.totalRevenues as number,
                  truckOverViewData?.totalRepairCost as number
                )}
                strokeColor="#A2B3D1"
                trailColor="#EAEFF2"
                showInfo={false}
              />
            </Col>

            <Col
              sm={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
              className="mb-6"
            >
              <p className="mb-6 text_ellipsis" title="Fuel cost vs Revenue">
                Fuel cost vs Revenue
              </p>

              <Row align="middle" justify="space-between" wrap={false}>
                <Col
                  className="text_ellipsis"
                  title={`${numbersFormatter(
                    truckOverViewData?.totalFuelCost
                  )} Rwf vs ${numbersFormatter(
                    truckOverViewData?.totalRevenues
                  )} Rwf`}
                >
                  <span className="font-bold">
                    {numbersFormatter(truckOverViewData?.totalFuelCost)} Rwf{" "}
                  </span>

                  <span className=" text-gray-400">
                    vs {numbersFormatter(truckOverViewData?.totalRevenues)} Rwf
                  </span>
                </Col>

                <Col>
                  <span className="text-gray-400 italic">
                    {percentageCalculator(
                      truckOverViewData?.totalRevenues as number,
                      truckOverViewData?.totalFuelCost as number
                    )}
                    %
                  </span>
                </Col>
              </Row>

              <Progress
                percent={percentageCalculator(
                  truckOverViewData?.totalRevenues as number,
                  truckOverViewData?.totalFuelCost as number
                )}
                strokeColor="#A2B3D1"
                trailColor="#EAEFF2"
                showInfo={false}
              />
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} sm={24} md={14} lg={24} xl={14} xxl={14}>
              <p className="mb-6">Revenue breakdown</p>

              <div className="h-[240px] border p-6 relative mb-12">
                <TruckRevenueBreakdownChart
                  chartData={truckRevenueAnalyticsData || []}
                />
              </div>
            </Col>

            <Col xs={24} sm={24} md={10} lg={24} xl={10} xxl={10}>
              <p className="mb-6">Repair breakdown</p>

              <div className="h-[240px] border p-6 relative mb-12">
                <TruckRepairBreakdownChart
                  chartData={truckRepairAnalyticsData}
                  isLoading={false}
                  isFetching={false}
                />
              </div>
            </Col>
          </Row>

          <p className="mb-6">Activity breakdown</p>

          <div className="h-[300px] pb-24 border p-6 relative">
            <TruckActivityBreakdownChart
              chartData={truckShiftAnalyticsData || []}
              isLoading={false}
              isFetching={false}
            />
          </div>
        </>
      )}
    </>
  );
};
export default OvervieWPane;
