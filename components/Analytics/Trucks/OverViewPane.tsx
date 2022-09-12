import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import info from "antd/lib/message";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Divider from "antd/lib/divider";
import Progress from "antd/lib/progress";
import CustomButton from "../../Shared/Button/button";
import TruckOverviewCard from "./TruckOverviewCard";
import {
  useLazyDownloadTruckShiftsQuery,
  useLazyGetTruckOverviewQuery
} from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { useRouter } from "next/router";
import Loader from "../../Shared/Loader";
import fileDownload from "js-file-download";
import moment from "moment";
import Input from "../../Shared/Input";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import { percentageCalculator } from "../../../helpers/pacentageCalculators";

const OvervieWPane = () => {
  const [getTruckOverview, { data }] = useLazyGetTruckOverviewQuery();
  const [downloadTruckShifts, { isLoading: isDownloadLoading }] =
    useLazyDownloadTruckShiftsQuery();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(false);

  const router = useRouter();
  const { id: truckId } = router.query;

  useEffect(() => {
    if (truckId) {
      setIsPageLoading(true);

      getTruckOverview({ id: truckId, start: startDate, end: endDate })
        .unwrap()
        .then(() => {
          setIsPageLoading(false);
        })
        .catch((err) => {
          setIsPageLoading(false);
          info.error(err?.data?.message || "Something is wrong");
        });
    }
  }, [truckId, getTruckOverview, startDate, endDate]);

  const onStartDateChange = (_: string, date: string) => {
    setStartDate(date);
  };
  const onEndDateChange = (_: string, date: string) => {
    setEndDate(date);
  };

  const cardsData = [
    { name: "Repairs done", num: data?.repairsDone },
    {
      name: "Unresolved issues reports",
      num: data?.unresolvedIssues
    },
    { name: "KMs driven by OX", num: data?.kmsDriven },
    { name: "Out of service days", num: data?.outOfServiceDays },
    {
      name: "Days since last repair",
      num: data?.daysSinceLastRepair
    },
    { name: "KMs since last repair", num: data?.kmsSinceLastRepair }
  ];

  const handleDownloadFile = (file: File) => {
    const date = moment().format("YYYY-MM-DD");
    fileDownload(file, `Report-${date}.xlsx`);
  };

  const handleDownloadShift = () => {
    downloadTruckShifts({ id: truckId })
      .unwrap()
      .then((res) => {
        handleDownloadFile(res);
      })
      .catch((err) => {
        info.error(err?.data?.message || "Something is wrong");
      });
  };

  return (
    <>
      <Row
        justify="space-between"
        className="bg-white my-4 mb-12 rounded shadow-[0px_0px_19px_#2A354808]"
      >
        <Col className="flex items-center gap-4">
          <Input
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

        <Col className="flex items-center gap-4">
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
          <Row
            gutter={24}
            className="overviewcards_row p-0"
            justify="space-between"
          >
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
                <TruckOverviewCard data={data} />
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
                Revenues KPIs
              </p>

              <Row align="middle" justify="space-between" wrap={false}>
                <Col
                  className="text_ellipsis"
                  title={`${numbersFormatter(
                    data?.totalRevenues
                  )} Rwf of ${numbersFormatter(data?.totalKpis)} Rwf`}
                >
                  <span className="font-bold">
                    {" "}
                    {numbersFormatter(data?.totalRevenues)} Rwf{" "}
                  </span>

                  <span className=" text-gray-400">
                    of {numbersFormatter(data?.totalKpis)} Rwf
                  </span>
                </Col>

                <Col>
                  <span className="text-gray-400 italic">
                    {percentageCalculator(data?.totalKpis, data?.totalRevenues)}
                    %
                  </span>
                </Col>
              </Row>

              <Progress
                percent={percentageCalculator(
                  data?.totalKpis,
                  data?.totalRevenues
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
              <p className="mb-6 text_ellipsis" title="Repair cost vs Revenues">
                Repair cost vs Revenues
              </p>

              <Row align="middle" justify="space-between" wrap={false}>
                <Col
                  className="text_ellipsis"
                  title={`${numbersFormatter(
                    data?.totalRepairCost
                  )} RWf vs ${numbersFormatter(data?.totalRevenues)} Rwf`}
                >
                  <span className="font-bold">
                    {numbersFormatter(data?.totalRepairCost)} Rwf{" "}
                  </span>
                  <span className="text-gray-400">
                    vs {numbersFormatter(data?.totalRevenues)} Rwf
                  </span>
                </Col>

                <Col>
                  <span className="text-gray-400 italic">
                    {percentageCalculator(
                      data?.totalRevenues,
                      data?.totalRepairCost
                    )}
                    %
                  </span>
                </Col>
              </Row>

              <Progress
                percent={percentageCalculator(
                  data?.totalRevenues,
                  data?.totalRepairCost
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
              <p className="mb-6 text_ellipsis" title="Fuel cost vs Revenues">
                Fuel cost vs Revenues
              </p>

              <Row align="middle" justify="space-between" wrap={false}>
                <Col
                  className="text_ellipsis"
                  title={`${numbersFormatter(
                    data?.totalFuelCost
                  )} Rwf vs ${numbersFormatter(data?.totalRevenues)} Rwf`}
                >
                  <span className="font-bold">
                    {numbersFormatter(data?.totalFuelCost)} Rwf{" "}
                  </span>

                  <span className=" text-gray-400">
                    vs {numbersFormatter(data?.totalRevenues)} Rwf
                  </span>
                </Col>

                <Col>
                  <span className="text-gray-400 italic">
                    {percentageCalculator(
                      data?.totalRevenues,
                      data?.totalFuelCost
                    )}
                    %
                  </span>
                </Col>
              </Row>

              <Progress
                percent={percentageCalculator(
                  data?.totalRevenues,
                  data?.totalFuelCost
                )}
                strokeColor="#A2B3D1"
                trailColor="#EAEFF2"
                showInfo={false}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
export default OvervieWPane;
