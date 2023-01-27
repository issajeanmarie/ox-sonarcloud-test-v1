import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useEffect } from "react";
import { numbersFormatter } from "../../helpers/numbersFormatter";
import { useLazyGetSingleFlagQuery } from "../../lib/api/endpoints/Depots/depotEndpoints";
import { DepotAlertModalTypes } from "../../lib/types/depots";
import { dateDisplay } from "../../utils/dateFormatter";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import Button from "../Shared/Button";
import ModalWrapper from "./ModalWrapper";

const { Text } = Typography;

interface SingleItemTypes {
  item: { title: string; value: string; id: number };
}

const RedFlagModal: FC<DepotAlertModalTypes> = ({
  isVisible,
  setIsVisible,
  activeFlag
}) => {
  const router = useRouter();
  const { id } = router.query;

  const handleCancel = () => {
    setIsVisible(false);
  };

  const [getSingleFlag, { isLoading, data: redFlagData }] =
    useLazyGetSingleFlagQuery();

  useEffect(() => {
    if (id && activeFlag) {
      handleAPIRequests({
        request: getSingleFlag,
        redFlagId: activeFlag?.id,
        id
      });
    }
  }, [activeFlag, activeFlag?.id, getSingleFlag, id]);

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
      subTitle="14 Feb 2022"
      loading={false}
      footerWidth={16}
      footerContent={
        <Row align="middle" gutter={24}>
          <Col flex={1}>
            <Button
              form="resolveLog"
              loading={false}
              type="secondary"
              htmlType="submit"
              disabled={false}
            >
              Resolved
            </Button>
          </Col>

          <Col flex={1}>
            <Button
              form="justifyLog"
              loading={false}
              type="primary"
              htmlType="submit"
              disabled={false}
            >
              Justify
            </Button>
          </Col>
        </Row>
      }
      onCancel={handleCancel}
    >
      {isLoading ? (
        <p>LOading...</p>
      ) : (
        <>
          <Row
            gutter={24}
            align="middle"
            className="w-[100%] pb-12 mb-12 border-b border-grey"
          >
            <Col flex={1}>
              <span className="text-gray-400 block mb-2">Cost (Rwf) / Km</span>

              <Row align="bottom" gutter={6}>
                <Col>
                  <Text className="text-2xl font-semibold block text-slate-50">
                    {redFlagData?.payload?.fuelRefill?.amount}
                  </Text>
                </Col>

                <Col>
                  <Text className="text-sm italic text-ox-red">20+</Text>
                </Col>
              </Row>
            </Col>

            <Col flex={1}>
              <span className="text-gray-400 block mb-2">Cost (Rwf) / Km</span>

              <Row align="bottom" gutter={6}>
                <Col>
                  <Text className="text-2xl font-semibold block text-slate-50">
                    787567
                  </Text>
                </Col>

                <Col>
                  <Text className="text-sm italic text-ox-red">20+</Text>
                </Col>
              </Row>
            </Col>

            <Col flex={1}>
              <span className="text-gray-400 block mb-2">Cost (Rwf) / Km</span>

              <Row align="bottom" gutter={6}>
                <Col>
                  <Text className="text-2xl font-semibold block text-slate-50">
                    787567
                  </Text>
                </Col>

                <Col>
                  <Text className="text-sm italic text-ox-red">20+</Text>
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
