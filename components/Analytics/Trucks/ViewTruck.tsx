import { FC } from "react";
import Divider from "antd/lib/divider";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "next/image";
import { PlusOutlined } from "@ant-design/icons";
import Header from "./Header";
import Loader from "../../Shared/Loader";
import { Query } from "../../../lib/types/shared";
import DocumentCard from "./TruckCard";
import CustomButton from "../../Shared/Button";
import TruckTabs from "./TruckTabs";
import { TruckDataTypes } from "../../../lib/types/trucksTypes";

interface ViewTruckProps {
  truckId: Query;
  isLoading: boolean;
  truckData: TruckDataTypes;
}

const DetailsComponent = ({ truckData }: any) => {
  return (
    <div className="my-12">
      {truckData?.map((data: { name: string; value: number | any }) => (
        <div key={data.name} className="flex items-center mb-5">
          <div className="w-[110%] font-bold">{data.name}</div>
          <div className="w-[90%] text-gray-400">{data.value}</div>
        </div>
      ))}
    </div>
  );
};

const ViewTruck: FC<ViewTruckProps> = ({ truckId, truckData, isLoading }) => {
  const truckInfo = [
    { name: "CHASSIS NUMBER", value: truckData?.truck?.chassisNumber || 0 },
    {
      name: "ENGINE NUMBER",
      value: truckData?.truck?.engineNumber || "Unknown"
    },
    { name: "FUEL TYPE", value: truckData?.truck?.fuelType || "Unknown" },
    {
      name: "ENGINE OIL TYPE",
      value: truckData?.truck?.engineOilType || "Unknown"
    },
    { name: "TIRE BRAND", value: truckData?.truck?.tireBrand || "Unknown" },
    { name: "TIRE SIZE", value: truckData?.truck?.tireSize || "Unknown" },
    {
      name: "TRACKING UNIT SERIAL NUMBER",
      value: truckData?.truck?.trackingUnitSerialNumber || "Uknown"
    },
    {
      name: "FUEL CARD ASSIGNED",
      value: truckData?.truck?.fuelCardAssigned || "Unknown"
    }
  ];

  return (
    <div className="overflow-hidden">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header truckId={truckId} truckData={truckData} />

          <Row align="middle" gutter={12} justify="space-between">
            <Col
              md={{ span: 24 }}
              lg={{ span: 12 }}
              className="h-[86vh]  overflow-auto"
              style={{
                padding: "38px",
                marginTop: "24px",
                paddingTop: "0"
              }}
            >
              <div className="bg-white shadow-[0px_0px_19px_#00000008] p-12 pb-6 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-ox-dark">
                    {truckData?.truck?.plateNumber || "Unknown"}
                  </span>

                  <Image
                    className="pointer"
                    src="/icons/ic-contact-edit@4x@2x.png"
                    alt=""
                    width={22}
                    height={22}
                  />
                </div>

                <span className="text-gray-400">
                  {truckData?.truck?.yearManufactured} -{" "}
                  {truckData?.truck?.model} - {truckData?.truck?.type}
                </span>

                <DetailsComponent truckData={truckInfo} />
              </div>

              <div className="bg-white shadow-[0px_0px_19px_#00000008]">
                <div className="flex items-center justify-between mb-3 p-12 pb-6">
                  <span className="text-lg font-bold text-ox-dark">
                    DOCUMENTS
                  </span>

                  <CustomButton
                    type="secondary"
                    size="icon"
                    loading={false}
                    icon={<PlusOutlined />}
                  />
                </div>

                <Divider />

                <Row gutter={24} className="p-12">
                  {truckData?.truck?.documents?.map(
                    (document: { id: number }) => (
                      <Col
                        key={document.id}
                        sm={{ span: 24 }}
                        md={{ span: 24 }}
                        lg={{ span: 12 }}
                        className="mb-8"
                      >
                        <DocumentCard document={document} />
                      </Col>
                    )
                  )}
                </Row>
              </div>
            </Col>

            <Col
              md={{ span: 24 }}
              lg={{ span: 12 }}
              className="h-[86vh]"
              style={{
                padding: "38px",
                marginTop: "24px",
                paddingTop: "0"
              }}
            >
              <TruckTabs truckData={truckData} />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ViewTruck;
