import React, { FC } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Typography from "antd/lib/typography";
import Image from "antd/lib/image";
import { SingleNearByLocation } from "../../lib/types/trucksTypes";
import { abbreviateNumber } from "../../utils/numberFormatter";

const { Text } = Typography;

interface Props {
  center: SingleNearByLocation;
}

const NearbyCenterCard: FC<Props> = ({ center }) => {
  return (
    <Row
      className="p-5 px-2 mb-4 rounded border border-grey"
      align="top"
      gutter={12}
    >
      <Col className="w-[30px]">
        <Image
          preview={false}
          src="/icons/location.svg"
          alt=""
          className="pointer"
          width={16}
        />
      </Col>

      <Col flex={1}>
        <Text className="normalText fowe700 mb-2">{center.name}</Text>
        <Text className="normalText opacity_56 flex items-center gap-6">
          <span>{abbreviateNumber(center?.distance)}km away</span>
        </Text>
      </Col>
    </Row>
  );
};

export default NearbyCenterCard;
