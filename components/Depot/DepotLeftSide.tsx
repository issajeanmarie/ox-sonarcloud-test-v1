import React, { FC, useState } from "react";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Image from "antd/lib/image";
import MediumCard from "../Cards/MediumCard";
import { useRouter } from "next/router";
import { routes } from "../../config/route-config";
import { GetDepotProfileResponse } from "../../lib/types/depots";
import NewDepotModal from "../Modals/NewDepotModal";
import { userType } from "../../helpers/getLoggedInUser";
interface Props {
  depotData: GetDepotProfileResponse;
}

const DepotLeftSide: FC<Props> = ({ depotData }) => {
  const [isNewDepotModalVisible, setIsNewDepotModalVisible] =
    useState<boolean>(false);

  const router = useRouter();

  return (
    <>
      <NewDepotModal
        isVisible={isNewDepotModalVisible}
        setIsVisible={setIsNewDepotModalVisible}
        currentDepotData={depotData}
        isEditing
      />

      <Col flex="32%" className="h-[79vh] overflow-y-auto">
        <div className="radius4 p-12 mb-6 bg-white shadow-[0px_0px_19px_#00000008]">
          <Row align="middle" justify="space-between" gutter={12}>
            <Col>
              <span className="heading1 block mb-2 text-ox-dark">
                {depotData?.payload?.depot?.name}
              </span>
            </Col>

            {userType().isSuperAdmin && (
              <Col>
                <Image
                  onClick={() => setIsNewDepotModalVisible(true)}
                  className="pointer"
                  src="/icons/ic-contact-edit@4x@2x.png"
                  alt=""
                  width={22}
                  preview={false}
                />
              </Col>
            )}
          </Row>

          <span className="text-gray-400">
            {depotData?.payload?.depot?.location}
          </span>
        </div>

        <Row justify="space-between" gutter={12} wrap={true}>
          <Col className="w-[100%] md:w-[100%] lg:[100%] 2xl:w-[50%] mb-4">
            <MediumCard
              title="Revenue (Rwf)"
              count={depotData?.payload?.revenue || 0}
              isFetching={false}
            />
          </Col>

          <Col className="w-[100%] md:w-[100%] lg:[100%] 2xl:w-[50%] mb-4">
            <MediumCard
              title="Cash collected (Rwf)"
              count={depotData?.payload?.cashCollected || 0}
              isFetching={false}
            />
          </Col>

          <Col
            className="w-[100%] md:w-[100%] lg:[100%] 2xl:w-[50%] mb-4 pointer"
            onClick={() => router.push(routes.Trucks.url)}
          >
            <MediumCard
              title="Trucks available"
              count={depotData?.payload?.trucksAvailable || 0}
              isFetching={false}
            />
          </Col>

          <Col
            className="w-[100%] md:w-[100%] lg:[100%] 2xl:w-[50%] mb-4 pointer"
            onClick={() => router.push(routes.Clients.url)}
          >
            <MediumCard
              title="Clients"
              count={depotData?.payload?.clients || 0}
              isFetching={false}
            />
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default DepotLeftSide;
