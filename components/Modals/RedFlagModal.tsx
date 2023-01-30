import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useEffect } from "react";
import { numbersFormatter } from "../../helpers/numbersFormatter";
import {
  useLazyGetSingleFlagQuery,
  useResolveRedFlagMutation
} from "../../lib/api/endpoints/Depots/depotEndpoints";
import { DepotAlertModalTypes } from "../../lib/types/depots";
import { dateDisplay } from "../../utils/dateFormatter";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import Button from "../Shared/Button";
import { DepotProfileLoader } from "../Shared/Loaders/Loaders";
import ModalWrapper from "./ModalWrapper";

const { Text } = Typography;

interface SingleItemTypes {
  item: { title: string; value: string; id: number };
}

const RedFlagModal: FC<DepotAlertModalTypes> = ({
  isVisible,
  setIsVisible,
  setIsJustifyFlagModalVisible,
  activeFlag,
  setActiveFlag
}) => {
  const router = useRouter();
  const { id } = router.query;

  const handleCancel = () => {
    setIsVisible(false);
  };

  const [getSingleFlag, { isLoading, data: redFlagData }] =
    useLazyGetSingleFlagQuery();

  const [resolveRedFlag, { isLoading: isResolvingFlag }] =
    useResolveRedFlagMutation();

  useEffect(() => {
    if (id && activeFlag && isVisible) {
      handleAPIRequests({
        request: getSingleFlag,
        redFlagId: activeFlag?.id,
        id
      });
    }
  }, [activeFlag, activeFlag?.id, getSingleFlag, id, isVisible]);

  const handleResolveFlag = () => {
    handleAPIRequests({
      request: resolveRedFlag,
      id,
      redFlagId: redFlagData?.payload?.id,
      showSuccess: true,
      handleSuccess: handleCancel
    });
  };

  const handleShowJustifyModal = () => {
    handleCancel();
    setActiveFlag && setActiveFlag(activeFlag);
    setIsJustifyFlagModalVisible && setIsJustifyFlagModalVisible(true);
  };

  const fuelRefillData = [
    {
      id: 0,
      title: "Litres",
      value: `${numbersFormatter(
        redFlagData?.payload?.fuelRefill?.litres || 0
      )} Litres`
    },

    {
      id: 1,
      title: "Odometer",
      value: `${numbersFormatter(
        redFlagData?.payload?.fuelRefill?.odometer || 0
      )} Km`
    },

    {
      id: 2,
      title: "Location",
      value: `${redFlagData?.payload?.fuelRefill?.pos}`
    },

    {
      id: 3,
      title: "Fuel price",
      value: `${numbersFormatter(
        redFlagData?.payload?.fuelRefill?.amount || 0
      )} Rwf`
    },

    {
      id: 4,
      title: "Driver",
      value: `${
        redFlagData?.payload?.fuelRefill?.shift?.driver?.names || "N/A"
      } `
    }
  ];

  const lastFuelData = [
    {
      id: 0,
      title: "Litres",
      value: `${numbersFormatter(
        redFlagData?.payload?.lastRefuel?.litres || 0
      )} Litres`
    },

    {
      id: 1,
      title: "Odometer",
      value: `${numbersFormatter(
        redFlagData?.payload?.lastRefuel?.odometer || 0
      )} Km`
    },

    {
      id: 2,
      title: "Date",
      value: `${dateDisplay(redFlagData?.payload?.lastRefuel?.date || "")}`
    },

    {
      id: 3,
      title: "Driver",
      value: `${
        redFlagData?.payload?.lastRefuel?.shift?.driver?.names || "N/A"
      } `
    }
  ];

  return (
    <ModalWrapper
      title={`${redFlagData?.payload?.fuelRefill?.truck?.plateNumber} FUEL USAGE ALERT`}
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      subTitle={dateDisplay(redFlagData?.payload?.date || "")}
      loading={isResolvingFlag}
      footerWidth={16}
      width={600}
      footerContent={
        <Row align="middle" gutter={24}>
          <Col flex={1}>
            <Button
              onClick={handleResolveFlag}
              form="resolveLog"
              loading={isResolvingFlag}
              type="secondary"
              htmlType="submit"
              disabled={redFlagData?.payload?.status !== "OPEN"}
            >
              Resolve
            </Button>
          </Col>

          <Col flex={1}>
            <Button
              form="justifyLog"
              loading={false}
              type="primary"
              htmlType="submit"
              disabled={
                isResolvingFlag || redFlagData?.payload?.status === "JUSTIFIED"
              }
              onClick={() => handleShowJustifyModal()}
            >
              Justify
            </Button>
          </Col>
        </Row>
      }
      onCancel={handleCancel}
    >
      {isLoading ? (
        <DepotProfileLoader className="h-[40vh]" />
      ) : (
        <>
          <Row
            gutter={24}
            align="middle"
            className="w-[100%] pb-12 mb-12 border-b border-grey"
          >
            <Col flex={1}>
              <span className="block mb-2">Cost (Rwf) / 100Km</span>

              <Row align="bottom" gutter={6}>
                <Col>
                  <Text className="text-2xl font-semibold block yellow">
                    {Math.round(
                      (redFlagData?.payload?.fuelRefill?.amount || 0) / 100
                    )}
                  </Text>
                </Col>
              </Row>
            </Col>

            <Col flex={1}>
              <span className="block mb-2">Litres (Rwf) / 100Km</span>

              <Row align="bottom" gutter={6}>
                <Col>
                  <Text className="text-2xl font-semibold block yellow">
                    {Math.round(
                      (redFlagData?.payload?.fuelRefill?.litres || 0) / 100
                    )}
                  </Text>
                </Col>
              </Row>
            </Col>

            <Col flex={1}>
              <span className="block mb-2">Avg fuel</span>

              <Row align="bottom" gutter={6}>
                <Col>
                  <Text className="text-2xl font-semibold block text-slate-50">
                    {Math.round(
                      ((redFlagData?.payload?.fuelRefill?.truck
                        ?.maxFuelPer100km || 0) +
                        (redFlagData?.payload?.fuelRefill?.truck
                          ?.minFuelPer100km || 0)) /
                        2
                    )}
                  </Text>
                </Col>

                <Col className="flex gap-4 text-gray-500 text-sm italic mb-[2px]">
                  <span>
                    Min:{" "}
                    {redFlagData?.payload?.fuelRefill?.truck?.minFuelPer100km ||
                      0}
                  </span>

                  <span>
                    Max:{" "}
                    {redFlagData?.payload?.fuelRefill?.truck?.maxFuelPer100km ||
                      0}
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>

          {fuelRefillData.map((data) => (
            <SingleItem key={data.id} item={data} />
          ))}

          <span className="text-gray-400 block mt-12 mb-4">Last fuel</span>

          {lastFuelData.map((data) => (
            <SingleItem key={data.id} item={data} />
          ))}
        </>
      )}
    </ModalWrapper>
  );
};

export default RedFlagModal;

export const SingleItem: FC<SingleItemTypes> = ({ item }) => {
  return (
    <div className={`flex items-center gap-12 mb-2`}>
      <div className="w-1/6">
        <span className="font-bold text-sm text_ellipsis">{item.title}:</span>
      </div>

      <span className="text-sm opacity-50">{item.value}</span>
    </div>
  );
};
