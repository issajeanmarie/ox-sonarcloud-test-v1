import React, { FC, useState, Fragment } from "react";
import { Query } from "../../../lib/types/shared";
import Image from "next/image";
import Button from "../../Shared/Button";
import { useRouter } from "next/router";
import ActionModal from "../../Shared/ActionModal";
import ReceipientCodeModal from "../ReceipientCode";
import MobilePayment from "../../Forms/Orders/MobilePayment";
import {
  useChangeOrderStatusMutation,
  useOrderInvoiceMutation
} from "../../../lib/api/endpoints/Orders/ordersEndpoints";
import { LoadingOutlined } from "@ant-design/icons";
import { handleDownloadFile } from "../../../utils/handleDownloadFile";
import { Order } from "../../../lib/types/orders";
import { routes } from "../../../config/route-config";
import Navbar from "../../Shared/Content/Navbar";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";

interface ViewOrderHeaderProps {
  orderId: Query;
  code: string;
  order: Order;
  comment: string | "";
  setSupport: React.Dispatch<React.SetStateAction<boolean>>;
  isOrderDisabled: boolean;
  canUserDelete: boolean;
  canUserPay: boolean;
}

const ViewOrderHeader: FC<ViewOrderHeaderProps> = ({
  orderId,
  order,
  code,
  setSupport,
  isOrderDisabled,
  canUserPay,
  canUserDelete,
  comment
}) => {
  const [isCancelModalVisible, setIsCancelModalVisible] =
    useState<boolean>(false);

  const [isReceipientCodeModalVisible, setIsReceipientCodeModalVisible] =
    useState<boolean>(false);

  const [isConfirmCompleteOrder, setIsConfirmCompleteOrder] =
    useState<boolean>(false);

  const [isMobilePaymentModalVisible, setIsMobilePaymentModalVisible] =
    useState<boolean>(false);

  const [downloadInvoice, { isLoading: invoiceLoading }] =
    useOrderInvoiceMutation();

  const [changeOrderStatus, { isLoading: orderStatusLoading }] =
    useChangeOrderStatusMutation();

  const router = useRouter();
  const { depotId, depotName } = router.query;

  const handleDownloadInvoiceSuccess = (file: File) => {
    handleDownloadFile({ file, name: "Invoice", fileFormat: "PDF" });
  };

  const downloadOrderInvoice = () => {
    handleAPIRequests({
      request: downloadInvoice,
      orderId: orderId,
      handleSuccess: handleDownloadInvoiceSuccess,
      showSuccess: true
    });
  };

  const handleChangeOrderStatusSuccess = () => {
    setIsCancelModalVisible(false);
    setIsConfirmCompleteOrder(false);
  };

  const changeOrderStatusAction = (status: "CANCEL" | "COMPLETE") => {
    handleAPIRequests({
      request: changeOrderStatus,
      id: order.id,
      data: { comment: comment, status: status },
      showSuccess: true,
      handleSuccess: handleChangeOrderStatusSuccess
    });
  };

  const LeftSide = (
    <div className="flex items-center gap-4 ">
      <Image
        className="pointer"
        src="/icons/keyboard_backspace_black_24dp.svg"
        alt="Backspace icon"
        width={20}
        height={20}
        onClick={() => router.push(routes.Orders.url)}
      />
      <span className="text-md font-bold">Orders</span>
      <span className="normalText">/</span>
      <span className="text-gray-400">Order {orderId}</span>
    </div>
  );

  const RightSide = (
    <div className="flex items-center flex-1 justify-end gap-11">
      <div className="flex items-center gap-8">
        {invoiceLoading ? (
          <LoadingOutlined />
        ) : (
          <Image
            className={
              canUserDelete ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
            }
            src="/icons/receipt.svg"
            alt="Backspace icon"
            onClick={() => canUserDelete && downloadOrderInvoice()}
            width={18}
            height={18}
          />
        )}
        <Image
          className="cursor-pointer"
          src="/icons/code.svg"
          alt="Backspace icon"
          width={16}
          height={16}
          onClick={() => setIsReceipientCodeModalVisible(true)}
        />
        <Image
          className={
            canUserDelete ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
          }
          src="/icons/close.png"
          alt="Backspace icon"
          width={20}
          height={20}
          onClick={() => canUserDelete && setIsCancelModalVisible(true)}
        />
        <button
          className={`rounded-lg bg-ox-yellow text-white w-[30px] h-[30px] flex items-center justify-center ${
            canUserPay ? "cursor-pointer" : "cursor-not-allowed opacity-50"
          } `}
          onClick={() => canUserPay && setIsMobilePaymentModalVisible(true)}
        >
          $
        </button>
      </div>
      {!isOrderDisabled && (
        <div className="flex items-center gap-6 w-[400px]">
          <Button
            type="secondary"
            disabled={isOrderDisabled}
            onClick={() => setSupport(true)}
          >
            SUPPORT
          </Button>
          <Button
            type="primary"
            disabled={isOrderDisabled}
            onClick={() => setIsConfirmCompleteOrder(true)}
          >
            COMPLETE ORDER
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <Fragment>
      <ActionModal
        isModalVisible={isCancelModalVisible}
        setIsModalVisible={setIsCancelModalVisible}
        title="CANCELLING"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="CANCEL ORDER"
        type="danger"
        action={() => changeOrderStatusAction("CANCEL")}
        loading={orderStatusLoading}
      />
      <ActionModal
        isModalVisible={isConfirmCompleteOrder}
        setIsModalVisible={setIsConfirmCompleteOrder}
        title="COMPLETE"
        description="Are you sure you want to complete this order? This action is not reversible."
        actionLabel="COMPLETE ORDER"
        type="normal"
        action={() => changeOrderStatusAction("COMPLETE")}
        loading={orderStatusLoading}
      />
      <ReceipientCodeModal
        isModalVisible={isReceipientCodeModalVisible}
        setIsModalVisible={setIsReceipientCodeModalVisible}
        code={code}
      />
      <MobilePayment
        isModalVisible={isMobilePaymentModalVisible}
        setIsModalVisible={setIsMobilePaymentModalVisible}
        order={order}
      />

      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="FULL" />
    </Fragment>
  );
};

export default ViewOrderHeader;
