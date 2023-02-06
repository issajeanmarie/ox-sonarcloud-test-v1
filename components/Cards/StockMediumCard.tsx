import { Card, Col, Image, Row, Typography } from "antd";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { abbreviateNumber } from "../../utils/numberFormatter";
import { SmallSpinLoader } from "../Shared/Loaders/Loaders";

const { Text } = Typography;

type StockMediumCardTypes = {
  title: string;
  subTitle: string;
  count: number;
  isFetching: boolean;
  categoryInfo: { id: number };
  showBatchesModal: (info: any) => void;
};

const StockMediumCard: FC<StockMediumCardTypes> = ({
  title,
  subTitle,
  count,
  isFetching,
  categoryInfo,
  showBatchesModal
}) => {
  const depotsState = useSelector(
    (state: { depots: { payload: { depotId: number; depotName: string } } }) =>
      state.depots.payload
  );

  return (
    <>
      <Card
        className="radius4 shadow-[0px_0px_19px_#00000008] min-h-[190px] relative"
        headStyle={{ border: "none", marginBottom: "0" }}
        bodyStyle={{ padding: "0", overflow: "hidden" }}
        style={{ width: "auto", border: "1px solid #EAEFF2" }}
        title={
          <div className="flex flex-col">
            <Text className="text-base font-light">{title}</Text>
            {depotsState?.depotId ? (
              <Text className="text-sm font-light opacity_56">
                {depotsState?.depotName}
              </Text>
            ) : (
              ""
            )}
          </div>
        }
        extra={
          <Image
            width={18}
            src="/icons/more_vert_FILL0_wght400_GRAD0_opsz48.svg"
            preview={false}
            alt=""
          />
        }
      >
        <div className="px-[24px] mb-4">
          <Text className="text-2xl font-semibold block">
            {isFetching ? (
              <SmallSpinLoader />
            ) : (
              <>
                {count !== null ? (
                  <>
                    <span className="yellow">
                      {abbreviateNumber(count)} KGs
                    </span>{" "}
                    /
                    <span>
                      {abbreviateNumber(Math.round(count / 50))}{" "}
                      {count > 50 ? "Bags" : "Bag"}
                    </span>
                  </>
                ) : (
                  "None"
                )}
              </>
            )}
          </Text>

          <Text className="captionText">
            {isFetching ? `Hold on...` : subTitle}
          </Text>
        </div>

        <Row
          onClick={() => showBatchesModal(categoryInfo)}
          justify="space-between"
          gutter={12}
          align="middle"
          className="bg-[#FEFBF3] py-4 px-6 pointer absolute bottom-0 left-[6px] right-[6px]"
        >
          <Col className="text-base font-light">See batches</Col>

          <Col>
            <Image
              width={18}
              src="/icons/keyboard_forwad_black.svg"
              preview={false}
              alt=""
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default StockMediumCard;
