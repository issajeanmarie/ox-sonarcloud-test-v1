import React, { FC } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Typography from "antd/lib/typography";
import CustomButton from "../Shared/Button/button";
import { SingleNearByClient } from "../../lib/types/trucksTypes";

const { Text } = Typography;

interface Props {
  client: SingleNearByClient;
  index: number;
}

const NearByClientCard: FC<Props> = ({ client, index }) => {
  return (
    <Row
      className="p-5 px-2 mb-4 rounded border border-grey"
      align="top"
      gutter={12}
    >
      <Col className="w-[30px]">
        <Text className="normalText opacity_56">{index + 1}</Text>
      </Col>

      <Col flex={1}>
        <Row justify="space-between" align="middle">
          <Col>
            <Text className="normalText fowe700 mb-2">{client?.name}</Text>
            <Text className="normalText opacity_56 flex items-center gap-6">
              <span>{client?.phone}</span>
              <span>{client?.distance}km away</span>
            </Text>
          </Col>

          <Col>
            <CustomButton type="view" size="small">
              View
            </CustomButton>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default NearByClientCard;
