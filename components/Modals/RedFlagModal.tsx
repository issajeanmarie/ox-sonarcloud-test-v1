import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";
import React, { FC } from "react";
import { DepotAlertModalTypes } from "../../lib/types/depots";
import Button from "../Shared/Button";
import ModalWrapper from "./ModalWrapper";

const { Text } = Typography;

interface SingleItemTypes {
  item: { title: string; value: string; id: number };
}

const dumpData = [
  {
    id: 0,
    title: "Litres",
    value: "100 Litres"
  },

  {
    id: 1,
    title: "Odometer",
    value: "12324332 Km"
  },

  {
    id: 2,
    title: "Location",
    value: "Kigali, Rwanda, Nyarugenge"
  }
];

const RedFlagModal: FC<DepotAlertModalTypes> = ({
  isVisible,
  setIsVisible
}) => {
  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <ModalWrapper
      title={`"RAC 533 H" FUEL USAGE ALERT`}
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

      {dumpData.map((data) => (
        <SingleItem key={data.id} item={data} />
      ))}
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
