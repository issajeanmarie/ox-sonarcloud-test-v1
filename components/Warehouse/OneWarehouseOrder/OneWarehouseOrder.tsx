/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Typography from "antd/lib/typography";
import { Image, Tooltip } from "antd";
import CustomButton from "../../Shared/Button";
import { FC, useState } from "react";
import ActionModal from "../../Shared/ActionModal";
import { changeRoute } from "../../../helpers/routesHandler";
import { routes } from "../../../config/route-config";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import { useCancelSaleMutation } from "../../../lib/api/endpoints/Warehouse/salesEndpoints";
import moment from "moment";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { useDispatch } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import Link from "next/link";
import { limitStringLengthSmall } from "../../../helpers/limitStringLength";
import PaymentStatus from "../../Shared/PaymentStatus";
import {
  SalesResponse,
  SingleSale
} from "../../../lib/types/Warehouses/Sales/sale";

const { Text } = Typography;

type OneWarehouseOrderTypes = {
  sale: SingleSale;
  itemNumber: number;
  AllSales: SalesResponse;
};

const OneWarehouseOrder: FC<OneWarehouseOrderTypes> = ({
  sale,
  itemNumber,
  AllSales
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [cancelSale, { isLoading: isCancelingSale }] = useCancelSaleMutation();

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const dispatchReplace = (newContent: any) => {
    dispatch(
      displayPaginatedData({
        payload: {
          payload: {
            content: [...newContent],
            totalPages: AllSales.payload.totalPages,
            totalElements: AllSales.payload.totalElements
          }
        },
        replace: true
      })
    );
  };

  const handleCancelSaleSuccess = ({ payload }: any) => {
    setIsModalVisible(false);

    const newSalesList: any = [];

    AllSales?.payload?.content?.map((oneSale: any) => {
      if (oneSale.id === payload.id) {
        newSalesList.push({ ...oneSale, status: payload.status });
      } else {
        newSalesList.push(oneSale);
      }
    });

    dispatchReplace(newSalesList);
  };

  const handleCancelSale = () => {
    handleAPIRequests({
      request: cancelSale,
      id: sale?.id,
      showSuccess: true,
      handleSuccess: handleCancelSaleSuccess
    });
  };

  const pricePerKg =
    sale?.saleItems &&
    numbersFormatter(
      sale?.totalWeight ? Math.round(sale?.totalAmount / sale?.totalWeight) : 0
    );

  return (
    <div className="shadow-[0px_0px_19px_#00000008] w-full mb-2">
      <div className="py-8 px-4 gap-2 border-b-2 border-gray-100 flex items-center justify-between bg-white">
        <div
          className={`flex-1 ${
            sale.status === "CANCELLED" ? "opacity-50" : ""
          }`}
        >
          <Row gutter={32} align="middle">
            <Col className="heading2 w-[32px]">
              <span className="font-bold text-lg">{itemNumber}.</span>
            </Col>

            <Col className="flex gap-2 items-center">
              <Text className="text-md font-bold">
                {sale?.saleItems?.length ? (
                  <Tooltip
                    title={
                      sale?.saleItems[0]?.batch?.warehouseItem?.categoryName ||
                      ""
                    }
                  >
                    {limitStringLengthSmall(
                      sale?.saleItems[0]?.batch?.warehouseItem?.categoryName ||
                        ""
                    )}
                  </Tooltip>
                ) : (
                  "Unknown Item"
                )}
              </Text>

              {sale?.saleItems?.length > 1 && (
                <Text
                  onClick={() =>
                    changeRoute(
                      `${routes.SaleOrderDetails.url}?sale=${sale?.id}`
                    )
                  }
                  className="normalText opacity_56 cursor-pointer"
                >
                  <span className="font-bold">+</span>{" "}
                  {sale?.saleItems?.length - 1} more
                </Text>
              )}
            </Col>
          </Row>
        </div>

        <div
          className={`flex-1 ${
            sale?.status === "CANCELLED" ? "opacity-50" : ""
          }`}
        >
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

        <div
          className={`flex-1 ${
            sale.status === "CANCELLED" ? "opacity-50" : ""
          }`}
        >
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
                <Link
                  passHref
                  href={routes.viewOrder.url + sale?.transportOrder?.id}
                >
                  <Text className="text-md font-bold underline cursor-pointer">
                    {sale?.transportOrder?.id}
                  </Text>
                </Link>
              )}
            </Col>
          </Row>
        </div>

        <div
          className={`flex-1 ${
            sale.status === "CANCELLED" ? "opacity-50" : ""
          }`}
        >
          <Row gutter={32} align="middle">
            <Col>
              <Text className="text-md font-bold">
                {numbersFormatter(sale?.totalWeight || 0)} KG /{" "}
                {numbersFormatter(Math.round(sale?.totalWeight / 50))}{" "}
                {sale?.totalWeight > 50 ? "Bags" : "Bag"}
              </Text>
            </Col>

            <Col>
              <Text className="normalText opacity_56">
                {pricePerKg} Rwf / Kg
              </Text>
            </Col>
          </Row>
        </div>

        <div className="flex gap-10 ">
          <Row gutter={32} align="middle">
            <Col>
              <PaymentStatus
                amt={
                  sale?.totalAmount + (sale?.transportOrder?.totalAmount || 0)
                }
                status={sale?.paymentStatus}
              />
            </Col>
          </Row>

          <div className="text-right">
            <Row align="middle" gutter={16} wrap={false}>
              {sale?.status !== "CANCELLED" ? (
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
              ) : (
                <span className="font-bold nowrap text-ox-red">CANCELLED</span>
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
                  <Link href={`${routes.Admins.url}?tb=ADMINS`} passHref>
                    <Text className="opacity_56  nowrap text-xs font-bold underline cursor-pointer italic underline">
                      Edited by {sale?.lastEditedBy}
                    </Text>
                  </Link>
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
