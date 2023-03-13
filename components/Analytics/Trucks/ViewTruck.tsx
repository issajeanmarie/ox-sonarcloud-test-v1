import { FC, useState } from "react";
import Divider from "antd/lib/divider";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import { PlusOutlined } from "@ant-design/icons";
import Header from "./Header";
import Loader from "../../Shared/Loader";
import { Query } from "../../../lib/types/shared";
import DocumentCard from "./TruckCard";
import CustomButton from "../../Shared/Button";
import TruckTabs from "./TruckTabs";
import {
  TruckDataTypes,
  ViewTruckPassedProps_To_OverviewPane
} from "../../../lib/types/trucksTypes";
import { NewTruckModal } from "../../Modals";
import NewTRuckDocumentModal from "../../Modals/NewTruckDocumentModal";
import ActionModal from "../../Shared/ActionModal";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { useDeleteTruckMutation } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { routes } from "../../../config/route-config";
import { useRouter } from "next/router";
import { Empty } from "antd";

interface ViewTruckProps extends ViewTruckPassedProps_To_OverviewPane {
  truckId: Query;
  truckData: TruckDataTypes;
  isPageLoading: boolean;
}

const DetailsComponent = ({ truckData }: any) => {
  return (
    <div className="my-12">
      {truckData?.map((data: { name: string; value: number | any }) => (
        <Row key={data.name} gutter={12} align="middle" className="mb-4">
          <Col span={12} className="font-bold text-sm">
            {data.name}
          </Col>

          <Col span={12} className="text-gray-400">
            {data.value}
          </Col>
        </Row>
      ))}
    </div>
  );
};

const ViewTruck: FC<ViewTruckProps> = ({
  truckId,
  truckData,
  isPageLoading,
  truckOverViewData,
  endDate,
  setEndDate,
  setStartDate,
  startDate
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNewDocumentModalVisible, setIsNewDocumentModalVisible] =
    useState(false);
  const [isUserEditing, setIsUserEditing] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [deleteTruck, { isLoading: isDeleteLoading }] =
    useDeleteTruckMutation();

  const router = useRouter();

  const truckInfo = [
    { name: "CHASSIS NUMBER", value: truckData?.chassisNumber || 0 },
    {
      name: "ENGINE NUMBER",
      value: truckData?.engineNumber || "Unknown"
    },
    { name: "FUEL TYPE", value: truckData?.fuelType || "Unknown" },
    {
      name: "ENGINE OIL TYPE",
      value: truckData?.engineOilType || "Unknown"
    },
    { name: "TIRE BRAND", value: truckData?.tireBrand || "Unknown" },
    { name: "TIRE SIZE", value: truckData?.tireSize || "Unknown" },
    {
      name: "TRACKING UNIT SERIAL NUMBER",
      value: truckData?.trackingUnitSerialNumber || "Uknown"
    },
    {
      name: "FUEL CARD ASSIGNED",
      value: truckData?.fuelCardAssigned || "Unknown"
    }
  ];

  const handleEditTruckModal = () => {
    setIsVisible(true);
    setIsUserEditing(true);
  };

  const handleDeleteTruckSuccess = () => {
    setIsDeleteModalVisible(false);
    router.push(routes.Trucks.url);
  };

  const handleDeleteTruck = () => {
    handleAPIRequests({
      request: deleteTruck,
      id: truckData?.id,
      showSuccess: true,
      handleSuccess: handleDeleteTruckSuccess
    });
  };

  return (
    <div className="overflow-hidden">
      {isPageLoading ? (
        <Loader />
      ) : (
        <>
          <NewTruckModal
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            editTruckData={truckData}
            isUserEditing={isUserEditing}
            setIsUserEditing={setIsUserEditing}
            fromTruckProfile={true}
          />

          <NewTRuckDocumentModal
            truckData={truckData}
            isVisible={isNewDocumentModalVisible}
            setIsVisible={setIsNewDocumentModalVisible}
          />

          <ActionModal
            isModalVisible={isDeleteModalVisible}
            setIsModalVisible={setIsDeleteModalVisible}
            type="danger"
            action={() => handleDeleteTruck()}
            loading={isDeleteLoading}
          />

          <Header
            truckId={truckId}
            truckData={truckData}
            isPageLoading={isPageLoading}
            setIsVisible={setIsDeleteModalVisible}
          />

          <Row align="top" gutter={0} justify="space-between">
            <Col
              md={{ span: 24 }}
              lg={{ span: 10 }}
              style={{
                padding: "0 12px 38px 24px",
                marginTop: "24px"
              }}
            >
              {truckOverViewData?.ongoingOrder && (
                <div className="rounded mb-6 border-l-6 border-ox-green bg-white border-l-4 border-ox-green W-[100%]">
                  <Row
                    className="w-[100%] p-4 px-6 border-b border-gray"
                    justify="space-between"
                    align="middle"
                  >
                    <Col className="flex items-center gap-2 width-[fit-content]">
                      <span className="text-sm font-bold text-ox-dark">
                        ONGOING ORDER
                      </span>

                      <div className="w-[8px] h-[8px] mb-1 rounded-full bg-ox-green"></div>
                    </Col>

                    <Col className="captionText">
                      Order ID: {truckOverViewData?.ongoingOrder?.id}
                    </Col>
                  </Row>

                  <Row
                    align="middle"
                    justify="space-between"
                    gutter={12}
                    className="w-[100%] p-6"
                  >
                    <Col flex={1} className="w-[100px] text_ellipsis">
                      <span className="text-gray-400 font-medium"> To:</span>{" "}
                      <span className="text-sm font-bold text-ox-dark">
                        {truckOverViewData?.ongoingOrder?.destinationStop?.name}
                      </span>
                    </Col>

                    <Col>
                      <Row align="middle" gutter={24}>
                        <Col
                          onClick={() =>
                            router.push(
                              `${routes.viewOrder?.url}/${truckOverViewData?.ongoingOrder?.id}`
                            )
                          }
                        >
                          <div className="p-6 py-2 bg-ox-yellow-faded-text bg_yellow_view_btn yellow rounded font-[600] pointer uppercase">
                            Track on map
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              )}

              <div
                className=" overflow-y-auto overflow-x-hidden"
                style={{
                  height: truckOverViewData?.ongoingOrder
                    ? "calc(100vh - 300px)"
                    : "calc(100vh - 160px)"
                }}
              >
                <div className="bg-white shadow-[0px_0px_19px_#00000008] p-12 pb-6 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-ox-dark">
                      {truckData?.plateNumber || "Unknown"}
                    </span>

                    <Image
                      onClick={handleEditTruckModal}
                      className="pointer"
                      src="/icons/ic-contact-edit@4x@2x.png"
                      alt=""
                      width={22}
                      height={22}
                      preview={false}
                    />
                  </div>

                  <span className="text-gray-400">
                    {truckData?.yearManufactured} - {truckData?.model} -{" "}
                    {truckData?.type?.replaceAll("_", " ")}
                  </span>

                  <DetailsComponent truckData={truckInfo} />
                </div>

                <div className="bg-white shadow-[0px_0px_19px_#00000008]">
                  <div className="flex items-center justify-between mb-3 p-12 py-8 pb-3">
                    <span className="text-lg font-bold text-ox-dark">
                      DOCUMENTS
                    </span>

                    <CustomButton
                      onClick={() => setIsNewDocumentModalVisible(true)}
                      type="secondary"
                      size="icon"
                      loading={false}
                      icon={<PlusOutlined />}
                    />
                  </div>

                  <Divider />

                  <Row gutter={24} className="p-12">
                    {truckData?.documents?.length <= 0 ? (
                      <div className="justify-center w-full">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </div>
                    ) : (
                      truckData?.documents?.map((document: { id: number }) => (
                        <Col
                          key={document.id}
                          sm={{ span: 24 }}
                          md={{ span: 24 }}
                          lg={{ span: 12 }}
                          className="mb-8"
                        >
                          <DocumentCard
                            document={document}
                            truckData={truckData}
                          />
                        </Col>
                      ))
                    )}
                  </Row>
                </div>
              </div>
            </Col>

            <Col
              md={{ span: 24 }}
              lg={{ span: 14 }}
              style={{
                padding: "0 24px 38px 12px",
                marginTop: "24px",
                height: "calc(100vh - 150px)"
              }}
            >
              <TruckTabs
                endDate={endDate}
                setEndDate={setEndDate}
                setStartDate={setStartDate}
                startDate={startDate}
                truckOverViewData={truckOverViewData}
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ViewTruck;
