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
import { TruckDataTypes } from "../../../lib/types/trucksTypes";
import { NewTruckModal } from "../../Modals";
import NewTRuckDocumentModal from "../../Modals/NewTruckDocumentModal";
import ActionModal from "../../Shared/ActionModal";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { useDeleteTruckMutation } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { routes } from "../../../config/route-config";
import { useRouter } from "next/router";
import { Empty } from "antd";

interface ViewTruckProps {
  truckId: Query;
  isLoading: boolean;
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
  isLoading,
  isPageLoading
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
      {isLoading ? (
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

          <Row align="middle" gutter={0} justify="space-between">
            <Col
              md={{ span: 24 }}
              lg={{ span: 10 }}
              className="h-[85vh]  overflow-auto"
              style={{
                padding: "0 12px 38px 24px",
                marginTop: "24px"
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
            </Col>

            <Col
              md={{ span: 24 }}
              lg={{ span: 14 }}
              className="h-[85vh]"
              style={{
                padding: "0 24px 38px 12px",
                marginTop: "24px"
              }}
            >
              <TruckTabs />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ViewTruck;
