import React, { useEffect, useRef } from "react";
import Row from "antd/lib/row";
import info from "antd/lib/message";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Divider from "antd/lib/divider";
import Collapse from "antd/lib/collapse";
import moment from "moment";
import CustomInput from "../../Shared/Input";
import CustomButton from "../../Shared/Button/button";
import { useLazyGetTruckRepairLogQuery } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { useRouter } from "next/router";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import Loader from "../../Shared/Loader";
import { SingleLogTypes } from "../../../lib/types/trucksTypes";

const { Panel } = Collapse;

const RepairLogPane = () => {
  const [getTruckLogRepair, { isLoading, data }] =
    useLazyGetTruckRepairLogQuery();
  const componentDidMount = useRef(false);

  const router = useRouter();
  const { id: truckId } = router.query;

  useEffect(() => {
    if (!componentDidMount.current && truckId) {
      getTruckLogRepair(truckId)
        .unwrap()
        .then()
        .catch((err) => info.error(err?.data?.message || "Something is wrong"));

      componentDidMount.current = true;
    }
  }, [truckId, getTruckLogRepair]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Row
            justify="space-between"
            className="bg-white my-4 mb-12 rounded shadow-[0px_0px_19px_#2A354808]"
          >
            <Col className="flex items-center gap-4">
              <CustomInput
                // onSelectChange={onSortChange}
                type="select"
                label=""
                options={[
                  { label: "Revenue", value: "REVENUE" },
                  { label: "Distance", value: "DISTANCE" },
                  { label: "Weight", value: "WEIGHT" }
                ]}
                name="sort"
                suffixIcon={
                  <Image
                    preview={false}
                    src="/icons/expand_more_black_24dp.svg"
                    alt=""
                    width={10}
                  />
                }
              />
              <CustomInput
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
              <CustomInput
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
              <CustomButton type="primary">
                <span className="text-sm">LOG REPAIR</span>
              </CustomButton>
            </Col>
          </Row>

          <Divider />

          <Collapse bordered={false}>
            {data?.content?.map((data: SingleLogTypes, index: number) => {
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
                              {moment(data.inDate).format("MMMM DD, YYYY")} -{" "}
                              {moment(data.outDate).format("MMMM DD, YYYY")}
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
                                          alt=""
                                          src={photo}
                                          width={69}
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
            })}
          </Collapse>
        </>
      )}
    </>
  );
};

export default RepairLogPane;
