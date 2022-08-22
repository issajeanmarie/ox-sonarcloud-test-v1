import { FC, useState, Fragment } from "react";
import { Query } from "../../../lib/types/shared";
import Image from "next/image";
import Button from "../../Shared/Button";
import { useRouter } from "next/router";
import ActionModal from "../../Shared/ActionModal";
import ReceipientCodeModal from "../ReceipientCode";
import MobilePayment from "../MobilePayment";
import {
  useDeleteOrderMutation,
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
}

const ViewOrderHeader: FC<ViewOrderHeaderProps> = ({
  orderId,
  order,
  code
}) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  const [isReceipientCodeModalVisible, setIsReceipientCodeModalVisible] =
    useState<boolean>(false);

  const [isMobilePaymentModalVisible, setIsMobilePaymentModalVisible] =
    useState<boolean>(false);

  const [downloadInvoice, { isLoading: invoiceLoading }] =
    useOrderInvoiceMutation();

  const [deleteOrderAction, { isLoading: deleteOrderLoading }] =
    useDeleteOrderMutation();

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

  const deleteOrder = () => {
    deleteOrderAction(orderId)
      .unwrap()
      .then((res) => {
        message.success(res.message);
        router.back();
      })
      .catch((e) => {
        message.error(e.message);
      });
  };

  return (
    <Fragment>
      <ActionModal
        isModalVisible={isDeleteModalVisible}
        setIsModalVisible={setIsDeleteModalVisible}
        title="CANCELLING"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="CANCEL ORDER"
        type="danger"
        action={deleteOrder}
        loading={deleteOrderLoading}
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
          <span className="heading2">Orders</span>
          <span className="normalText">/</span>
          <span className="text-gray-400">Order {orderId}</span>
        </div>
        <div className="flex items-center flex-1 justify-end gap-11">
          <div className="flex items-center gap-8">
            {invoiceLoading ? (
              <LoadingOutlined />
            ) : (
              <Image
                className="pointer"
                src="/icons/receipt.png"
                alt="Backspace icon"
                onClick={downloadOrderInvoice}
                width={18}
                height={18}
              />
            )}

            <Image
              className="pointer"
              src="/icons/ic-contact-edit.svg"
              alt="Backspace icon"
              width={16}
              height={16}
            />
            <Image
              className="pointer"
              src="/icons/code.svg"
              alt="Backspace icon"
              width={16}
              height={16}
              onClick={() => setIsReceipientCodeModalVisible(true)}
            />
            <Image
              className="cursor-pointer"
              src="/icons/close.png"
              alt="Backspace icon"
              width={20}
              height={20}
              onClick={() => setIsDeleteModalVisible(true)}
            />
            <button
              className="rounded-lg bg-ox-yellow text-white w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
              onClick={() => setIsMobilePaymentModalVisible(true)}
            >
              $
            </button>
          </div>
          <div className="flex items-center gap-6 w-[400px]">
            <Button type="secondary">SUPPORT</Button>
            <Button type="primary">COMPLETE ORDER</Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewOrderHeader;
