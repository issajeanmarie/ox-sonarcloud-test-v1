/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Collapse from "antd/lib/collapse";
import { useDeleteMaintenanceCheckMutation } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { useRouter } from "next/router";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { Empty } from "antd";
import { SingleMaintenanceInterface } from "../../../lib/types/trucksTypes";
import mappedObjects from "../../../utils/mappedObjects";
import { dateDisplay } from "../../../utils/dateFormatter";
import ActionModal from "../../Shared/ActionModal";
import { useDispatch } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";

const { Panel } = Collapse;

const TruckMaintenanceList = ({
  maintenanceData
}: {
  maintenanceData: any;
}) => {
  const [deleteMaintenanceCheck, { isLoading: isDeleteLoading }] =
    useDeleteMaintenanceCheckMutation();
  const [isDeletingItem, setIsDeletingItem] = useState<number | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  const router = useRouter();
  const { id: truckId } = router.query;
  const dispatch = useDispatch();

  const handleDeleteMaintenanceCheckSuccess = ({ payload }: any) => {
    dispatch(displayPaginatedData({ deleted: true, payload: { id: payload } }));
    setIsDeletingItem(null);
    setIsDeleteModalVisible(false);
  };

  const handleDeleteMaintenanceCheckFailure = () => {
    setIsDeletingItem(null);
    setIsDeleteModalVisible(false);
  };

  const handleDeleteMaintenanceCheck = (id?: number) => {
    id && setIsDeletingItem(id);
    setIsDeleteModalVisible(true);
  };
  const deleteMaintenanceCheckAction = () => {
    handleAPIRequests({
      request: deleteMaintenanceCheck,
      showSuccess: true,
      id: truckId,
      checkId: isDeletingItem,
      handleSuccess: handleDeleteMaintenanceCheckSuccess,
      handleFailure: handleDeleteMaintenanceCheckFailure
    });
  };

  return (
    <>
      {maintenanceData?.content?.length <= 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <>
          <ActionModal
            isModalVisible={isDeleteModalVisible}
            setIsModalVisible={setIsDeleteModalVisible}
            type="danger"
            action={() => deleteMaintenanceCheckAction()}
            loading={isDeleteLoading}
          />

          <Collapse bordered={false}>
            {maintenanceData?.content?.map(
              (data: SingleMaintenanceInterface, index: number) => {
                const brakeSystemData = mappedObjects(data.brakeSystem);
                const couplingDevicesData = mappedObjects(data.couplingDevices);
                const engineOperationData = mappedObjects(data.engineOperation);
                const exhaustSystemData = mappedObjects(data.exhaustSystem);
                const fuelSystemData = mappedObjects(data.fuelSystem);
                const lightingDevicesData = mappedObjects(data.lightingDevices);
                const miscellaneousData = mappedObjects(data.miscellaneous);
                const safeLoadingData = mappedObjects(data.safeLoading);
                const safetyEquipmentData = mappedObjects(data.safetyEquipment);
                const steeringMechanismData = mappedObjects(
                  data.steeringMechanism
                );
                const suspensionData = mappedObjects(data.suspension);
                const wheelsAndTiresData = mappedObjects(data.wheelsAndTires);
                const windshieldAndAcData = mappedObjects(data.windshieldAndAc);
                const observationAndRecommendationData = [
                  {
                    key: "Observations",
                    value: data.observations
                  },
                  { key: "Recommendations", value: data.recommendations }
                ];

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
                        <Col flex="auto">
                          <Row align="middle" gutter={16} wrap={false}>
                            <Col span={2}>
                              <span className="text-gray-400">{index + 1}</span>
                            </Col>

                            <Col md={2} lg={9} className="text_ellipsis">
                              <span className="text font-bold text-ox-dark">
                                {data?.inspector?.names}
                              </span>
                            </Col>

                            <Col className="text_ellipsis">
                              <span className="text-gray-400">
                                {dateDisplay(data?.date || data?.createdAt)}
                              </span>
                            </Col>
                          </Row>
                        </Col>

                        <Col style={{ marginRight: "-24px" }}>
                          <Row align="middle" justify="end" gutter={12}>
                            <Col className="flex gap-6">
                              <span className="text-gray-400">
                                Overall condition of the vehicle:
                              </span>

                              <span
                                className={`capitalize font-bold ${
                                  data.overallCondition === "NEEDS_REPAIR"
                                    ? "red"
                                    : ""
                                }`}
                              >
                                {data?.overallCondition
                                  ? data?.overallCondition?.replace("_", " ")
                                  : "Not applicable"}
                              </span>
                            </Col>

                            <Col>
                              <Image
                                onClick={() =>
                                  handleDeleteMaintenanceCheck(data.id)
                                }
                                src="/icons/delete_forever_FILL0_wght400_GRAD0_opsz48 1.svg"
                                preview={false}
                                width={24}
                                alt=""
                              />
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
                    <div className="h-[500px]  overflow-auto p-6 border-t border-grey">
                      <DetailsComponent
                        records={brakeSystemData}
                        title="Brake System"
                      />

                      <DetailsComponent
                        records={couplingDevicesData}
                        title="Coupling Devices"
                      />

                      <DetailsComponent
                        records={engineOperationData}
                        title="Engine Operation"
                      />

                      <DetailsComponent
                        records={exhaustSystemData}
                        title="Exhaust System"
                      />

                      <DetailsComponent
                        records={fuelSystemData}
                        title="Fuel System"
                      />
                      <DetailsComponent
                        records={lightingDevicesData}
                        title="Lighting Devices"
                      />
                      <DetailsComponent
                        records={miscellaneousData}
                        title="Miscellaneous"
                      />
                      <DetailsComponent
                        records={safeLoadingData}
                        title="Safe Loading"
                      />
                      <DetailsComponent
                        records={safetyEquipmentData}
                        title="Safety Equipment"
                      />
                      <DetailsComponent
                        records={steeringMechanismData}
                        title="Steering Mechanism"
                      />

                      <DetailsComponent
                        records={suspensionData}
                        title="Suspension"
                      />

                      <DetailsComponent
                        records={wheelsAndTiresData}
                        title="Wheels And Tires"
                      />
                      <DetailsComponent
                        records={windshieldAndAcData}
                        title="Windshield And Ac"
                      />

                      <DetailsComponent
                        records={observationAndRecommendationData}
                        title="Observations & recommendations"
                      />
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

export default TruckMaintenanceList;

type Types = {
  title: string;
  records: { key: string; value: string }[];
};

export const DetailsComponent: React.FC<Types> = ({
  title,
  records,
  children
}) => (
  <>
    <p className="text-gray-400 mt-6 uppercase mb-4">{title}</p>

    {records?.map((record: { key: string; value: string }, index: number) => (
      <>
        {children && children}

        <Row
          align="top"
          gutter={16}
          style={{ marginTop: "12px" }}
          key={record.key}
          wrap={false}
        >
          <Col md={2} lg={8}>
            <span className="text font-bold text-ox-dark">
              {index + 1}. {record.key}
            </span>
          </Col>

          <Col>
            <span className="text-gray-400">
              {record?.value
                ? record?.value?.replaceAll("_", " ").split("")[0]
                : "Not applicable"}
            </span>
            <span className="text-gray-400 lowercase">
              {record?.value
                ?.replaceAll("_", " ")
                .replace(record?.value?.charAt(0), "")}
            </span>
          </Col>
        </Row>
      </>
    ))}
  </>
);
