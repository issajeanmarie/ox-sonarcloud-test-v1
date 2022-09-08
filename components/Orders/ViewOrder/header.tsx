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
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { handleDownloadFile } from "../../../utils/handleDownloadFile";
import { Order } from "../../../lib/types/orders";

interface ViewOrderHeaderProps {
  orderId: Query;
  code: string;
  order: Order;
  comment: string;
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

  const downloadOrderInvoice = () => {
    downloadInvoice(orderId)
      .unwrap()
      .then((file) => {
        handleDownloadFile(file, "Invoice", "PDF");
      })
      .catch((e) => {
        if (e.status === 404) {
          message.warning("This order is fully paid");
        } else {
          message.error("Cannot download file");
        }
      });
  };

  const changeOrderStatusAction = (status: "CANCEL" | "COMPLETE") => {
    changeOrderStatus({
      id: order.id,
      data: { comment: comment, status: status }
    })
      .unwrap()
      .then((res) => {
        message.success(res.message);
        setIsCancelModalVisible(false);
        setIsConfirmCompleteOrder(false);
      })
      .catch((e) => {
        message.error(e.message);
      });
  };

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
      <div className="bg-white my-2 shadow-[0px_0px_19px_#00000008] p-3 px-6 flex items-center">
        <div className="flex items-center gap-4 ">
          <Image
            className="pointer"
            src="/icons/keyboard_backspace_black_24dp.svg"
            alt="Backspace icon"
            width={20}
            height={20}
            onClick={() => router.back()}
          />
          <span className="text-md font-bold">Orders</span>
          <span className="normalText">/</span>
          <span className="text-gray-400">Order {orderId}</span>
        </div>
        <div className="flex items-center flex-1 justify-end gap-11">
          <div className="flex items-center gap-8">
            {invoiceLoading ? (
              <LoadingOutlined />
            ) : (
              <Image
                className={
                  canUserDelete
                    ? "cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }
                src="/icons/receipt.png"
                alt="Backspace icon"
                onClick={() => canUserDelete && downloadOrderInvoice()}
                width={18}
                height={18}
              />
            )}

            {/* <Image
              className="pointer"
              src="/icons/ic-contact-edit.svg"
              alt="Backspace icon"
              width={16}
              height={16}
            /> */}
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
                canUserDelete
                  ? "cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
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
      </div>
    </Fragment>
  );
};

export default ViewOrderHeader;
