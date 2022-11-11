/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Image as AntDImage } from "antd";
import React, { FC, useState } from "react";
import { routes } from "../../../config/route-config";
import { changeRoute } from "../../../helpers/routesHandler";
import { useCancelSaleMutation } from "../../../lib/api/endpoints/Warehouse/salesEndpoints";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import AddWarehouseOrder from "../../Forms/Warehouse/Add/AddWarehouseOrder";
import ModalWrapper from "../../Modals/ModalWrapper";
import ActionModal from "../../Shared/ActionModal";
import MobilePayment from "../../Forms/Orders/MobilePayment";
import Button from "../../Shared/Button";

const SingleOrderTop: FC<any> = ({
  sale,
  isSaleLoading,
  createItems,
  setItems,
  items,
  setLocation,
  location,
  handleChangeWarehouse,
  warehouse,
  handleChangeWeight,
  weight,
  onTransportChange,
  transport,
  isPostingSale,
  onAddSaleFinish,
  onEditSaleFinish,
  setIsEditModalVisible,
  isEditModalVisible,
  isEditSaleLoading,
  isAddItemLoading,
  deleteSaleItemAction,
  form
}) => {
  const [isMobilePaymentModalVisible, setIsMobilePaymentModalVisible] =
    useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [cancelSale, { isLoading: isCancelingSale }] = useCancelSaleMutation();

  const showModal: any = () => {
    setIsModalVisible(true);
  };

  const handleCancelSaleSuccess = () => {
    setIsModalVisible(false);
  };

  const handleCancelSale = () => {
    handleAPIRequests({
      request: cancelSale,
      id: sale?.id,
      showSuccess: true,
      handleSuccess: handleCancelSaleSuccess
    });
  };

  const canUserPay = sale && sale?.status !== "CANCELLED";

  return (
    <Row
      style={{ background: "#fcfcfc" }}
      className="w-full shadow-[0px_-6px_24px_#0000001A] px-5 py-4 sticky top-0 z-50 flex justify-between items-center"
    >
      <Col
        onClick={() => changeRoute(routes.Warehouse.url)}
        className="cursor-pointer"
      >
        <div className="flex items-center gap-4 ">
          {isSaleLoading ? (
            <span>...</span>
          ) : (
            <>
              <AntDImage
                className="pointer"
                src="/icons/keyboard_backspace_black_24dp.svg"
                alt=""
                width={20}
                height={20}
                preview={false}
              />
              <span className="heading2">Sales</span>
              <span className="normalText">/</span>
              <span className="text-gray-400">{sale?.transportOrder?.id}</span>
            </>
          )}
        </div>
      </Col>

      <Col className="flex gap-8 items-center">
        {isSaleLoading ? (
          <span>...</span>
        ) : (
          <>
            <Col>
              <button
                className={`rounded-lg bg-ox-yellow text-white w-[30px] h-[30px] flex items-center justify-center ${
                  canUserPay
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                } `}
                onClick={() =>
                  canUserPay && setIsMobilePaymentModalVisible(true)
                }
              >
                $
              </button>
            </Col>

            <AntDImage
              onClick={() => setIsEditModalVisible(true)}
              className="pointer"
              src="/icons/ic-contact-edit.svg"
              alt="Backspace icon"
              width={18}
              height={18}
              preview={false}
            />

            {sale?.status !== "CANCELLED" ? (
              <AntDImage
                className="pointer"
                onClick={() => showModal()}
                src="/icons/close.png"
                alt=""
                width={22}
                height={22}
                preview={false}
              />
            ) : (
              <span className="font-bold nowrap text-ox-red">CANCELLED</span>
            )}
          </>
        )}
      </Col>

      <ModalWrapper
        setIsModalVisible={setIsEditModalVisible}
        isModalVisible={isEditModalVisible}
        title="EDIT WAREHOUSE ORDER"
        loading={isPostingSale || isEditSaleLoading}
        footerContent={
          <Button
            form="AddWarehouseOrder"
            loading={isPostingSale || isEditSaleLoading}
            type="primary"
            htmlType="submit"
          >
            {sale ? "SAVE" : "CONFIRM ORDER"}
          </Button>
        }
      >
        <AddWarehouseOrder
          sale={sale}
          createItems={createItems}
          setItems={setItems}
          items={items}
          setLocation={setLocation}
          location={location}
          handleChangeWarehouse={handleChangeWarehouse}
          warehouse={warehouse ? JSON.parse(warehouse) : warehouse}
          handleChangeWeight={handleChangeWeight}
          weight={weight}
          onTransportChange={onTransportChange}
          transport={transport}
          isPostingSale={isPostingSale}
          onAddSaleFinish={onAddSaleFinish}
          onEditSaleFinish={onEditSaleFinish}
          isAddItemLoading={isAddItemLoading}
          deleteSaleItemAction={deleteSaleItemAction}
          form={form}
        />
      </ModalWrapper>

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

      {sale && (
        <MobilePayment
          isModalVisible={isMobilePaymentModalVisible}
          setIsModalVisible={setIsMobilePaymentModalVisible}
          order={{ ...sale, clientPhone: sale?.client?.phone }}
          endpoint="sales"
        />
      )}
    </Row>
  );
};

export default SingleOrderTop;
