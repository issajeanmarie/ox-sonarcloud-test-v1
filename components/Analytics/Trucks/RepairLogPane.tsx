/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Divider from "antd/lib/divider";
import Collapse from "antd/lib/collapse";
import moment from "moment";
import Input from "../../Shared/Input";
import CustomButton from "../../Shared/Button/button";
import {
  useLazyGetTruckRepairLogQuery,
  useDeleteTruckRepairLogMutation
} from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { useRouter } from "next/router";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import Loader from "../../Shared/Loader";
import { SingleLogTypes } from "../../../lib/types/trucksTypes";
import { useDispatch, useSelector } from "react-redux";
import NewRepairLogModal from "../../Modals/NewRepairLogModal";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import { LoadingOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const RepairLogPane = () => {
  const [getTruckLogRepair] = useLazyGetTruckRepairLogQuery();
  const [deleteTruckRepairLog] = useDeleteTruckRepairLogMutation();
  const componentDidMount = useRef(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDeletingItem, setIsDeletingItem] = useState<number | null>(null);

  const data = useSelector(
    (state: { paginatedData: { displayPaginatedData: any } }) =>
      state.paginatedData.displayPaginatedData
  );

  const dispatch = useDispatch();

  const router = useRouter();
  const { id: truckId } = router.query;

  const handleDeleteLogRepairSuccess = ({ payload }: any) => {
    dispatch(displayPaginatedData({ deleted: true, payload: { id: payload } }));

    setIsDeletingItem(null);
  };

  const handleDeleteLogRepairFailure = () => {
    setIsDeletingItem(null);
  };

  const handleGetLogRepairSuccess = (res: any) => {
    dispatch(displayPaginatedData({ payload: res, onRender: true }));
    setIsPageLoading(false);
  };

  const handleGetLogRepairFailure = () => {
    setIsPageLoading(false);
  };

  const callAPI = (start?: string, end?: string) => {
    setIsPageLoading(true);
    handleAPIRequests({
      request: getTruckLogRepair,
      id: truckId,
      startDate: start || "",
      endDate: end || "",
      handleSuccess: handleGetLogRepairSuccess,
      handleFailure: handleGetLogRepairFailure
    });
  };

  useEffect(() => {
    if (!componentDidMount.current && truckId) {
      callAPI();
      componentDidMount.current = true;
    }
  }, [truckId, getTruckLogRepair]);

  useEffect(() => {
    callAPI(startDate, endDate);
  }, [startDate, endDate]);

  const onStartDateChange = (_: string, date: string) => {
    setStartDate(date);
  };
  const onEndDateChange = (_: string, date: string) => {
    setEndDate(date);
  };

  const handleDeleteRepairLog = (id: number) => {
    setIsDeletingItem(id);

    handleAPIRequests({
      request: deleteTruckRepairLog,
      repairId: id,
      id: truckId,
      showSuccess: true,
      handleSuccess: handleDeleteLogRepairSuccess,
      handleFailure: handleDeleteLogRepairFailure
    });
  };

  return (
    <>
      <NewRepairLogModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        truckId={truckId}
      />

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
          <CustomButton type="primary" onClick={() => setIsVisible(true)}>
            <span className="text-sm">LOG REPAIR</span>
          </CustomButton>
        </Col>
      </Row>

      <Divider />

      {isPageLoading ? (
        <Loader />
      ) : (
        <>
          <Collapse bordered={false}>
            {data?.payload?.content?.map(
              (data: SingleLogTypes, index: number) => {
                const logDetails = [];

                logDetails.push(
                  {
                    name: "Odometer",
                    value: data.odometer,
                    images: data.images
                  },
                  {
                    name: "Service done",
                    value: data.serviceDone,
                    images: data.images
                  },
                  {
                    name: "Repair duration",
                    value: `${data.inDate} - ${data.outDate}`,
                    images: data.images
                  },

                  {
                    name: "Spare parts used",
                    value: data?.spareParts?.map((sparePart) => sparePart),
                    images: data.images
                  },
                  {
                    name: "Description",
                    value: data.description,
                    images: data.images
                  }
                );
                return (
                  <Panel
                    key={data.id}
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
                                {data.serviceDone}
                              </span>
                            </Col>

                            <Col md={6} lg={6} xl={24} xxl={24}>
                              <span className="text-gray-400">
                                {data.inDate &&
                                  moment(data.inDate).format(
                                    "MMM DD, YYYY"
                                  )}{" "}
                                -{" "}
                                {data?.inDate &&
                                  moment(data.outDate).format("MMM DD, YYYY")}
                              </span>
                            </Col>
                          </Row>
                        </Col>

                        <Col style={{ marginRight: "-24px" }}>
                          <Row align="middle" justify="end" gutter={32}>
                            <Col>
                              <span>{numbersFormatter(data.cost)} Rwf</span>
                            </Col>

                            <Col>
                              {isDeletingItem === data.id ? (
                                <LoadingOutlined
                                  style={{ fontSize: 13, color: "#e7b522" }}
                                  spin
                                />
                              ) : (
                                <Image
                                  onClick={() => handleDeleteRepairLog(data.id)}
                                  src="/icons/delete_forever_FILL0_wght400_GRAD0_opsz48 1.svg"
                                  preview={false}
                                  width={24}
                                  alt=""
                                />
                              )}
                            </Col>

                            <Col className="mr-4">
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
                      <p className="text-gray-400">Repair log breakdown</p>

                      {logDetails?.map((detail) => (
                        <Row
                          align="top"
                          gutter={32}
                          style={{ marginTop: "12px" }}
                          key={detail.name}
                        >
                          <Col span={6}>
                            <span>{detail.name}</span>
                          </Col>

                          <Col flex="auto">
                            <span>{detail.value}</span>

                            {detail.name === "Service done" &&
                              detail?.images?.length > 0 && (
                                <Row gutter={32} align="middle">
                                  {detail?.images?.map(
                                    (photo: string, index: number) =>
                                      photo !== "" && (
                                        <Col
                                          key={index}
                                          style={{ margin: "12px  0 26px 0" }}
                                        >
                                          <Image
                                            className="object-cover"
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
                      ))}
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

export default RepairLogPane;
