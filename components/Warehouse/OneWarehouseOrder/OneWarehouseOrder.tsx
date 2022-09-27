/* eslint-disable no-unsafe-optional-chaining */
import "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Typography from "antd/lib/typography";
import { Image } from "antd";
import CustomButton from "../../Shared/Button";
import { FC, useState } from "react";
import ActionModal from "../../Shared/ActionModal";
import { changeRoute } from "../../../helpers/routesHandler";
import { routes } from "../../../config/route-config";

const { Text } = Typography;

type OneWarehouseOrderTypes = {
  index: number;
};

const OneWarehouseOrder: FC<OneWarehouseOrderTypes> = ({ index }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleDeleteOrder = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="shadow-[0px_0px_19px_#00000008] w-full mb-2">
      <div className="py-8 px-4 border-b-2 border-gray-100 flex items-center justify-between bg-white">
        <div className="flex-1">
          <Row gutter={32} align="middle">
            <Col className="heading2 w-[32px]">
              <span className="font-bold text-lg">1.</span>
            </Col>
            <Col>
              <Text className="text-md font-bold">Animal feed</Text>
            </Col>
            <Col>
              <Text className="normalText opacity_56">Type 1</Text>
            </Col>
          </Row>
        </div>

        <div className="flex-1">
          <Row gutter={32} align="middle">
            <Col>
              <Text className="text-md font-bold">Turatsinze Theoneste</Text>
            </Col>
            <Col>
              <Text className="normalText opacity_56">(0789 427 561)</Text>
            </Col>
          </Row>
        </div>

        <div className="flex-1">
          <Row gutter={32} align="middle">
            <Col>
              <Text className="normalText opacity_56">
                Transport Reference #:
              </Text>
            </Col>
            <Col>
              {index === 2 ? (
                <Text className="normalText opacity_56">None</Text>
              ) : (
                <Text className="text-md font-bold underline">0123456789</Text>
              )}
            </Col>
          </Row>
        </div>

        <div className="flex-1">
          <Row gutter={32} align="middle">
            <Col>
              <Text className="text-md font-bold">3,500 KG</Text>
            </Col>
            <Col>
              <Text className="normalText opacity_56">20 Rwf / Kg</Text>
            </Col>
          </Row>
        </div>

        <div className="flex-1">
          <Row gutter={32} align="middle">
            <Col>
              <span className="font-bold nowrap text-ox-orange">
                70,000 Rwf
              </span>
            </Col>
          </Row>
        </div>

        <div className="flex gap-10 ">
          <div className="text-right">
            <Row align="middle" gutter={16} wrap={false}>
              <Col className="my-[-12px]">
                <CustomButton
                  onClick={showModal}
                  type="danger"
                  size="icon"
                  icon={
                    <Image
                      src="/icons/ic-actions-remove.svg"
                      alt="OX Delivery Logo"
                      width={16}
                      preview={false}
                    />
                  }
                />
              </Col>

              <Col className="my-[-12px]">
                <CustomButton
                  onClick={() => changeRoute(routes.SaleOrderDetails.url)}
                  type="view"
                  size="small"
                >
                  <span className="font-bold">View</span>
                </CustomButton>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <Row
        justify="space-between"
        className="bg-white p-4 border-t-1 border-gray-100"
      >
        <Col>
          <Row gutter={12} align="middle">
            <Col>
              <Text className="text-sm opacity_56 nowrap">
                Created: 11th May 21
              </Text>
            </Col>

            <Col>
              <Text className="opacity_56  nowrap text-xs font-bold">
                - Edited by Yves Honore
              </Text>
            </Col>
          </Row>
        </Col>

        <Col>
          <Text className="text-xs opacity_56 italic nowrap mb0">
            NYAMASHEKE Depot
          </Text>
        </Col>
      </Row>
      <ActionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => handleDeleteOrder()}
        loading={false}
      />
    </div>
  );
};

export default OneWarehouseOrder;
