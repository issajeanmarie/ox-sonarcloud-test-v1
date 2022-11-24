import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Divider from "antd/lib/divider";
import Collapse from "antd/lib/collapse";
import moment from "moment";
import CustomButton from "../../Shared/Button/button";
import {
  useDownloadTruckDailyInspectionMutation,
  useLazyGetTruckDailyInspectionQuery
} from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import Loader from "../../Shared/Loader";
import Input from "../../Shared/Input";
import { useRouter } from "next/router";
import fileDownload from "js-file-download";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";
import { Empty } from "antd";

const { Panel } = Collapse;

const TruckHelthPane = () => {
  const [getTruckDailyInspection, { data: truckDailyInspections }] =
    useLazyGetTruckDailyInspectionQuery();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [downloadTruckDailyInspection, { isLoading }] =
    useDownloadTruckDailyInspectionMutation();

  const router = useRouter();
  const { id: truckId } = router.query;

  useEffect(() => {
    setIsPageLoading(true);

    getTruckDailyInspection({
      id: truckId,
      startDate: startDate,
      endDate: endDate
    })
      .unwrap()
      .then(() => {
        setIsPageLoading(false);
      })
      .catch((err) => {
        setIsPageLoading(false);
        ErrorMessage(err?.data?.message || "Something is wrong");
      });
  }, [startDate, endDate, truckId, getTruckDailyInspection]);

  const objectsMaped = (inspection: any) => {
    const inspectionResult: any = [];
    Object.keys(inspection).map((key) =>
      inspectionResult.push({ key, value: inspection[key] })
    );

    return inspectionResult;
  };

  const onStartDateChange = (_: string, date: string) => {
    setStartDate(date);
  };
  const onEndDateChange = (_: string, date: string) => {
    setEndDate(date);
  };

  const handleDownloadFile = (file: File) => {
    const date = moment().format("YYYY-MM-DD");
    fileDownload(file, `Report-${date}.xlsx`);
  };

  const handleDownloadReport = () => {
    downloadTruckDailyInspection({
      id: truckId,
      start: startDate,
      end: endDate
    })
      .unwrap()
      .then((res) => {
        handleDownloadFile(res);
      })
      .catch((err) => {
        ErrorMessage(err?.data?.message || "Something is wrong");
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
            onClick={handleDownloadReport}
            loading={isLoading}
          >
            <span className="text-sm">DOWNLOAD REPORT</span>
          </CustomButton>
        </Col>
      </Row>

      <Divider />

      {isPageLoading ? (
        <Loader />
      ) : truckDailyInspections?.content?.length <= 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <>
          <Collapse bordered={false}>
            {truckDailyInspections?.content?.map(
              (inspection: any, index: number) => {
                const fluidLevelData = objectsMaped(inspection.fluidLevel);
                const electricalCheckData = objectsMaped(
                  inspection.electricalCheck
                );
                const cabCheckData = objectsMaped(inspection.cabCheck);
                const chassisCheck = objectsMaped(inspection.chassisCheck);
                const documentCheck = objectsMaped(inspection.documentCheck);

                return (
                  <Panel
                    key={inspection.id}
                    showArrow={false}
                    header={
                      <Row
                        align="middle"
                        justify="space-between"
                        className="w-[100%]"
                      >
                        <Col span={12}>
                          <Row align="middle" gutter={32} wrap={false}>
                            <Col md={2} lg={2}>
                              <span className="text-gray-400">{index + 1}</span>
                            </Col>

                            <Col md={14} lg={14} xl={14} xxl={12}>
                              <span className="text font-bold text-ox-dark">
                                {inspection?.inspector.names}
                              </span>
                            </Col>

                            <Col md={6} lg={6} xl={10} xxl={10}>
                              <span className="text-gray-400">
                                {moment(inspection.createdAt).format(
                                  "MMMM DD, YYYY"
                                )}
                              </span>
                            </Col>
                          </Row>
                        </Col>

                        <Col span={12} style={{ marginRight: "-24px" }}>
                          <Row align="middle" justify="end" gutter={32}>
                            <Col>
                              <Row align="middle" gutter={12}>
                                <Col>
                                  <span className="text-gray-400">
                                    Results:{" "}
                                  </span>
                                </Col>

                                <Col>
                                  <span
                                    className={`text font-bold ${
                                      inspection.score === 5
                                        ? "yellow"
                                        : inspection.score < 5
                                        ? "red"
                                        : "dark"
                                    }`}
                                  >
                                    {inspection.score}
                                  </span>
                                  <span className="text-gray-400 font-bold">
                                    /10
                                  </span>
                                </Col>
                              </Row>
                            </Col>

                            <Col>
                              <Image
                                src="/icons/unfold_more_FILL0_wght400_GRAD0_opsz48.svg"
                                preview={false}
                                width={24}
                                alt=""
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    }
                    className="mabo6"
                    style={{
                      border: "1px solid rgba(42, 53, 72, 0.16)",
                      borderRadius: "4px",
                      padding: "10px",
                      background: "white",
                      marginBottom: "12px"
                    }}
                  >
                    <div className="h-[300px]  overflow-auto p-6">
                      {/* DETAILS */}
                      <p className="text-gray-400">Fluid level and T-Belt</p>
                      <Row align="top" gutter={32}>
                        <Col span={12}>
                          <span className="text font-bold text-ox-dark">
                            Odometer
                          </span>
                        </Col>

                        <Col span={7}>
                          <span className="text-gray-400">
                            {inspection?.odometer}
                          </span>
                        </Col>
                      </Row>
                      {fluidLevelData?.map(
                        (record: { key: number; value: any }) => (
                          <Row
                            align="top"
                            gutter={32}
                            style={{ marginTop: "12px" }}
                            key={record.key}
                          >
                            <Col span={12}>
                              <span className="text font-bold text-ox-dark">
                                {record.key}
                              </span>
                            </Col>

                            <Col span={3}>
                              <span
                                className={`${
                                  record?.value?.state === "BAD"
                                    ? "text red"
                                    : "text-gray-400"
                                }`}
                              >
                                {record?.value?.state === "BAD"
                                  ? "Not ok"
                                  : "Ok"}
                              </span>
                            </Col>

                            <Col span={7}>
                              <span>{record?.value?.comment}</span>

                              {record?.value?.photos?.length > 0 && (
                                <Row gutter={32} align="middle">
                                  {record?.value?.photos?.map(
                                    (photo: string, index: number) => (
                                      <Col key={`${photo} ${index}`}>
                                        <Image
                                          src={photo}
                                          width={69}
                                          preview={false}
                                          alt=""
                                        />
                                      </Col>
                                    )
                                  )}
                                </Row>
                              )}
                            </Col>
                          </Row>
                        )
                      )}
                      {/* Electric checks */}
                      <p className="text-gray-400 mt-6">Electrical check</p>
                      {electricalCheckData?.map(
                        (record: { key: number; value: any }) => (
                          <Row
                            align="top"
                            gutter={32}
                            style={{ marginTop: "12px" }}
                            key={record.key}
                          >
                            <Col span={12}>
                              <span className="text font-bold text-ox-dark">
                                {record.key}
                              </span>
                            </Col>

                            <Col span={3}>
                              <span
                                className={`${
                                  record?.value?.state === "BAD"
                                    ? "text red"
                                    : "text-gray-400"
                                }`}
                              >
                                {record?.value?.state === "BAD"
                                  ? "Not ok"
                                  : "Ok"}
                              </span>
                            </Col>

                            <Col span={7}>
                              <span className="mb-[32px]">
                                {record?.value?.comment}
                              </span>

                              {record?.value?.photos?.length > 0 && (
                                <Row gutter={32} align="middle">
                                  {record?.value?.photos?.map(
                                    (photo: string, index: number) => (
                                      <Col key={`${photo} ${index}`}>
                                        <Image
                                          alt=""
                                          src={photo}
                                          width={69}
                                          height={69}
                                          preview={false}
                                        />
                                      </Col>
                                    )
                                  )}
                                </Row>
                              )}
                            </Col>
                          </Row>
                        )
                      )}
                      {/* CAB */}
                      <p className="text-gray-400 mt-6">CAB</p>

                      {cabCheckData?.map(
                        (record: { key: number; value: any }) => (
                          <Row
                            align="top"
                            gutter={32}
                            style={{ marginTop: "12px" }}
                            key={record.key}
                          >
                            <Col span={14}>
                              <span className="text font-bold text-ox-dark">
                                {record.key}
                              </span>
                            </Col>

                            <Col flex="auto">
                              <span
                                className={`${
                                  record?.value !== "YES"
                                    ? "text red"
                                    : "text-gray-400"
                                }`}
                              >
                                {record.value === "YES" ? "Ok" : "Not ok"}
                              </span>
                            </Col>
                          </Row>
                        )
                      )}

                      {/* Chassis check */}
                      <p className="text-gray-400 mt-6">Chassis check</p>

                      {chassisCheck?.map(
                        (record: { key: number; value: any }) => (
                          <Row
                            align="top"
                            gutter={32}
                            style={{ marginTop: "12px" }}
                            key={record.key}
                          >
                            <Col span={12}>
                              <span className="text font-bold text-ox-dark">
                                {record.key}
                              </span>
                            </Col>

                            <Col span={3}>
                              <span
                                className={`${
                                  record?.value?.state === "BAD"
                                    ? "text red"
                                    : "text-gray-400"
                                }`}
                              >
                                {record?.value?.state === "BAD"
                                  ? "Not ok"
                                  : "Ok"}
                              </span>
                            </Col>

                            <Col span={7}>
                              <span className="mb-[32px]">
                                {record?.value?.comment}
                              </span>

                              {record?.value?.photos?.length > 0 && (
                                <Row gutter={32} align="middle">
                                  {record?.value?.photos?.map(
                                    (photo: string, index: number) => (
                                      <Col key={`${photo} ${index}`}>
                                        <Image
                                          alt=""
                                          src={photo}
                                          width={69}
                                          height={69}
                                          preview={false}
                                        />
                                      </Col>
                                    )
                                  )}
                                </Row>
                              )}
                            </Col>
                          </Row>
                        )
                      )}

                      {/* Documents */}
                      <p className="text-gray-400 mt-6">Documents</p>

                      {documentCheck?.map(
                        (record: { key: number; value: any }) => (
                          <Row
                            align="top"
                            gutter={32}
                            style={{ marginTop: "12px" }}
                            key={record.key}
                          >
                            <Col span={14}>
                              <span className="text font-bold text-ox-dark">
                                {record.key}
                              </span>
                            </Col>

                            <Col flex="auto">
                              <span
                                className={`${
                                  record?.value !== "YES"
                                    ? "text red"
                                    : "text-gray-400"
                                }`}
                              >
                                {record.value === "YES" ? "Ok" : "Not ok"}
                              </span>
                            </Col>
                          </Row>
                        )
                      )}
                    </div>
                  </Panel>
                );
              }
            )}
          </Collapse>
        </>
      )}
    </>
  );
};
export default TruckHelthPane;
