/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import { useCancelSaleMutation } from "../../../lib/api/endpoints/Warehouse/salesEndpoints";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { BackendErrorTypes, GenericResponse } from "../../../lib/types/shared";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";
import moment from "moment";

const { Text } = Typography;

type OneWarehouseOrderTypes = {
  sale: any;
  itemNumber: number;
};

const OneWarehouseOrder: FC<OneWarehouseOrderTypes> = ({
  sale,
  itemNumber
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [cancelSale, { isLoading: isCancelingSale }] = useCancelSaleMutation();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancelSale = () => {
    cancelSale({
      id: sale?.id
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        setIsModalVisible(false);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  return (
    <div className="shadow-[0px_0px_19px_#00000008] w-full mb-2">
      <div className="py-8 px-4 border-b-2 border-gray-100 flex items-center justify-between bg-white">
        <div className="flex-1">
          <Row gutter={32} align="middle">
            <Col className="heading2 w-[32px]">
              <span className="font-bold text-lg">{itemNumber}.</span>
            </Col>
            <Col>
              <Text className="text-md font-bold">
                {sale?.saleItems &&
                  sale?.saleItems[0]?.warehouseItem?.parentCategory?.name}
              </Text>
            </Col>
            <Col>
              <Text className="normalText opacity_56">
                {sale?.saleItems &&
                  sale?.saleItems[0]?.warehouseItem?.category?.name}
              </Text>
            </Col>
          </Row>
        </div>

        <div className="flex-1">
          <Row gutter={32} align="middle">
            <Col>
              <Text className="text-md font-bold">{sale?.client?.names}</Text>
            </Col>
            <Col>
              <Text className="normalText opacity_56">
                ({sale?.client?.phone})
              </Text>
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
              {!sale?.transportOrder?.id ? (
                <Text className="normalText opacity_56">None</Text>
              ) : (
                <Text className="text-md font-bold underline">
                  {sale?.transportOrder?.id}
                </Text>
              )}
            </Col>
          </Row>
        </div>

        <div className="flex-1">
          <Row gutter={32} align="middle">
            <Col>
              <Text className="text-md font-bold">
                {sale?.transportOrder?.totalWeight &&
                  numbersFormatter(sale?.transportOrder?.totalWeight)}{" "}
                KG
              </Text>
            </Col>
            <Col>
              <Text className="normalText opacity_56">
                {sale?.transportOrder?.totalAmount &&
                  numbersFormatter(sale?.transportOrder?.totalAmount)}{" "}
                Rwf / Kg
              </Text>
            </Col>
          </Row>
        </div>

        <div className="flex-1">
          <Row gutter={32} align="middle">
            <Col>
              <span className="font-bold nowrap text-ox-orange">
                {sale?.amount && numbersFormatter(sale?.amount)} Rwf
              </span>
            </Col>
          </Row>
        </div>

        <div className="flex gap-10 ">
          <div className="text-right">
            <Row align="middle" gutter={16} wrap={false}>
              {sale?.status !== "CANCELLED" && (
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
              )}

              <Col className="my-[-12px]">
                <CustomButton
                  onClick={() =>
                    changeRoute(
                      `${routes.SaleOrderDetails.url}?sale=${sale?.id}`
                    )
                  }
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
                Created:{" "}
                {sale?.createdAt &&
                  moment(sale?.createdAt).format("MMMM Do YY")}
              </Text>
            </Col>

            {sale?.lastEditedBy && (
              <>
                <Col>
                  <Text className="opacity_56  nowrap text-xs font-bold">
                    -
                  </Text>
                </Col>
                <Col>
                  <Text className="opacity_56  nowrap text-xs font-bold underline cursor-pointer italic">
                    Edited by {sale?.lastEditedBy}
                  </Text>
                </Col>
              </>
            )}
          </Row>
        </Col>

        <Col>
          <Text className="text-xs opacity_56 italic nowrap mb0">
            {sale?.depot?.name}
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
        action={() => handleCancelSale()}
        loading={isCancelingSale}
      />
    </div>
  );
};

export default OneWarehouseOrder;
