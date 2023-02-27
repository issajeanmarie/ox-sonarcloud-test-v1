import React, { FC } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Typography from "antd/lib/typography";
import CustomButton from "../Shared/Button/button";
import { SingleNearByClient } from "../../lib/types/trucksTypes";
import { useRouter } from "next/router";
import { routes } from "../../config/route-config";
import { abbreviateNumber } from "../../utils/numberFormatter";

const { Text } = Typography;

interface Props {
  client: SingleNearByClient;
  index: number;
}

const NearByClientCard: FC<Props> = ({ client, index }) => {
  const router = useRouter();

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

            <Row gutter={14}>
              <Col>
                <Text className="normalText opacity_56 flex items-center gap-12 w-[100%]">
                  <span>{client?.phone}</span>
                </Text>
              </Col>

              <Col>
                <Text className="normalText opacity_56 flex items-center gap-12 w-[100%]">
                  <span>{abbreviateNumber(client?.distance)}km away</span>
                </Text>
              </Col>
            </Row>
          </Col>

          <Col>
            <CustomButton
              type="view"
              size="small"
              onClick={() =>
                router.push(`${routes.Clients?.url}/${client?.id}`)
              }
            >
              View
            </CustomButton>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default NearByClientCard;
