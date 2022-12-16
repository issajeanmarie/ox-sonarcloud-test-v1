/* eslint-disable no-unsafe-optional-chaining */
import { FC, useState } from "react";
import Table from "antd/lib/table";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import CustomButton from "../../Shared/Button";
import { Order, Order as OrderType } from "../../../lib/types/orders";
import { dateFormatterNth } from "../../../utils/dateFormatter";
import { abbreviateNumber } from "../../../utils/numberFormatter";
import PaymentStatus from "../../Shared/PaymentStatus";
import { routes } from "../../../config/route-config";
import ActionModal from "../../Shared/ActionModal";
import {
  useChangeOrderStatusMutation,
  useOrderInvoiceMutation
} from "../../../lib/api/endpoints/Orders/ordersEndpoints";
import { handleDownloadFile } from "../../../utils/handleDownloadFile";
import { useRouter } from "next/router";
import { userType } from "../../../helpers/getLoggedInUser";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import { orderStatus, paymentStatus } from "../../../utils/orderStatus";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { useDispatch, useSelector } from "react-redux";
import { escape } from "../../../utils/keyBinders";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import { ActivityLogModal } from "../../Modals/ActivityLogModal";

const { Column } = Table;
const { Text } = Typography;

interface OrderProps {
  order: OrderType;
  index: number;
}

type Types = {
  key: number;
  plate: string;
  driver: string;
  weight: string;
  unitPrice: string;
  from: string;
  to: string;
  price: string;
  supporting: string;
};

const Order: FC<OrderProps> = ({ order, index }) => {
  const [isActivityLogVisible, setIsActivityLogVisible] = useState(false);
  const [isCancelOrderOpen, setIsCancelOrderOpen] = useState<boolean>(false);
  const [downloadInvoice, { isLoading: invoiceLoading }] =
    useOrderInvoiceMutation();
  const ordersState = useSelector(
    (state: any) => state.paginatedData.displayPaginatedData
  );
  const dispatch = useDispatch();

  const router = useRouter();

  const [changeOrderStatus, { isLoading: cancelOrderLoading }] =
    useChangeOrderStatusMutation();

  const handleDownloadInvoiceSuccess = (file: File) => {
    handleDownloadFile({ file, name: "Invoice", fileFormat: "PDF" });
  };

  const handleDeleteOrderSuccess = ({ payload }: any) => {
    setIsCancelOrderOpen(false);

    const newOrdersList: any = [];

    ordersState?.payload?.content?.map((order: any) => {
      if (order.id === payload.id) {
        newOrdersList.push({ ...order, status: payload.status });
      } else {
        newOrdersList.push(order);
      }
    });

    dispatch(
      displayPaginatedData({
        payload: {
          payload: {
            content: [...newOrdersList],
            totalPages: ordersState.payload.totalPages,
            totalElements: ordersState.payload.totalElements
          }
        },
        replace: true
      })
    );
  };

  const downloadOrderInvoice = () => {
    handleAPIRequests({
      request: downloadInvoice,
      orderId: order.id,
      showSuccess: true,
      handleSuccess: handleDownloadInvoiceSuccess,
      successMessage: "File downloaded successfully"
    });
  };

  const deleteOrder = () => {
    handleAPIRequests({
      request: changeOrderStatus,
      id: order.id,
      data: { comment: "", status: "CANCEL" },
      showSuccess: true,
      handleSuccess: handleDeleteOrderSuccess
    });
  };

  const user = userType();
  const { isFullPaid, isHalfPaid, isWrittenOff } = paymentStatus(
    order?.paymentStatus
  );
  const { isCanceled } = orderStatus(order?.status);

  const canUserDelete =
    (!isFullPaid &&
      !isHalfPaid &&
      !isWrittenOff &&
      !isCanceled &&
      !user.isGuest) ||
    (user.isSuperAdmin && !isCanceled);

  escape(setIsCancelOrderOpen);

  return (
    <div className="shadow-[0px_0px_19px_#00000008] w-full mb-5">
      {/* TOP ROW */}
      <ActionModal
        isModalVisible={isCancelOrderOpen}
        setIsModalVisible={setIsCancelOrderOpen}
        action={deleteOrder}
        title="CANCELLING"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="CANCEL ORDER"
        type="danger"
        loading={cancelOrderLoading}
      />

      <ActivityLogModal
        isModalVisible={isActivityLogVisible}
        setIsModalVisible={setIsActivityLogVisible}
        order={order}
      />

      <div className="p-5 border-b-2 border-gray-100 flex items-center justify-between bg-white">
        {/* TOP ROW RIGHT SIDE */}
        <div className="flex-1">
          <Row gutter={32} align="middle">
            <Col className="heading2 w-[45px]">
              <span className="font-bold text-lg">{index}.</span>
            </Col>
            <Col>
              <Image
                width={16}
                src="/icons/ic-actions-user-yellow.svg"
                preview={false}
                alt=""
              />
            </Col>

            <Col>
              <Text className="text-md font-bold">
                {order?.office?.client?.names ? (
                  order?.office?.client?.names
                ) : (
                  <span className=" text-gray-300">Unknown client</span>
                )}
              </Text>
            </Col>
            <Col>
              <Text className="normalText opacity_56">{order.clientPhone}</Text>
            </Col>
          </Row>
        </div>

        {/* TOP ROW RIGHT SIDE */}
        <div className="flex gap-10 ">
          <div className="text-right">
            <PaymentStatus
              amt={order.totalAmount}
              status={order.paymentStatus}
            />
          </div>

          <div className="flex justify-end flex-1 items-center gap-4">
            <Text className="captionText">Order status:</Text>
            <Text className="normalText fowe700">
              <PaymentStatus status={order.status} />
            </Text>
          </div>
        </div>
      </div>

      {/* MIDDLE ROW */}
      <Table
        className="data_table orders_table"
        dataSource={
          order?.supportOrders ? [order, ...order?.supportOrders] : []
        }
        rowKey={(record) => record.id}
        pagination={false}
        showHeader={false}
        bordered={false}
        scroll={{ x: "100%" }}
        tableLayout="auto"
      >
        <Column
          key="key"
          title="Name"
          render={(text, record: Order) => {
            const child = (
              <div className="flex items-center gap-7 ml-14">
                <Image
                  width={22}
                  src="/icons/ic-ecommerce-delivery-yellow.svg"
                  preview={false}
                  alt=""
                />

                <div className="flex items-center gap-3">
                  {record?.stops[0]?.truck?.plateNumber ? (
                    <Text className="text-md font-bold nowrap">
                      {record?.stops[0]?.truck?.plateNumber}
                    </Text>
                  ) : (
                    <span className=" text-gray-300">Unavailable</span>
                  )}
                  <span className="nowrap opacity_56 text-sm">
                    {record?.stops[0]?.driver?.names}
                  </span>
                </div>
              </div>
            );
            return { children: child, props: { "data-label": "Name" } };
          }}
        />

        <Column
          key="name"
          title="Weight"
          render={(text: Types, record: Order) => {
            let totalWeight = 0;
            record?.stops?.forEach((stop) => {
              totalWeight = totalWeight + stop.weight;
            });
            const child = (
              <div className="flex items-center gap-3">
                <Text className="heading2 nowrap">
                  {abbreviateNumber(totalWeight)} KG
                </Text>

                <span className="opacity_56 nowrap">
                  {record?.paymentPlan === "PAY_BY_KG"
                    ? `- ${numbersFormatter(
                        Math.round(record.totalAmount / totalWeight)
                      )} RWf / KG`
                    : ""}
                </span>
              </div>
            );
            return { children: child, props: { "data-label": "Name" } };
          }}
        />

        <Column
          key="from"
          title="From"
          render={(text, record: Order) => {
            const child = (
              <div className="flex items-center gap-4">
                <Text className="heading2">From</Text>
                <Text className="font-light">
                  {record.stops[0]?.location?.split(" ")[0] || "---"}
                </Text>
              </div>
            );
            return { children: child, props: { "data-label": "Phone number" } };
          }}
        />

        <Column
          key="key"
          title="To"
          render={(text, record: Order) => {
            const child = (
              <div className="flex items-center gap-4">
                <Text className="heading2">To</Text>
                <Text className="font-light">
                  {record?.stops[record?.stops?.length - 1]?.location?.split(
                    " "
                  )[0] || "---"}
                </Text>
                {record.isSupportOrder && (
                  <Text className="captionText ml-5">Supporting order</Text>
                )}
              </div>
            );
            return { children: child, props: { "data-label": "Email" } };
          }}
        />

        <Column
          key="key"
          title="Supporting"
          render={(text: Types, record: Types) => {
            const child = (
              <Text className="captionText opacity_56 italic nowrap mb0">
                {record.supporting}
              </Text>
            );
            return { children: child, props: { "data-label": "Status" } };
          }}
        />
        <Column
          width={160}
          render={(text: Types, record: Order) => (
            <PaymentStatus
              amt={record?.totalAmount}
              status={record?.paymentStatus}
            />
          )}
        />

        <Column
          key="key"
          title="Action"
          render={(text, record: Order) => {
            const child = (
              <div className="flex items-center gap-3 justify-end">
                <CustomButton
                  type="normal"
                  onClick={downloadOrderInvoice}
                  loading={invoiceLoading}
                  size="icon"
                  icon={
                    <Image
                      src="/icons/receipt.svg"
                      alt="OX Delivery Logo"
                      width={12}
                      preview={false}
                    />
                  }
                />

                <CustomButton
                  disabled={!canUserDelete}
                  type="danger"
                  size="icon"
                  onClick={() => setIsCancelOrderOpen(true)}
                  icon={
                    <Image
                      src="/icons/ic-actions-remove.svg"
                      alt="OX Delivery Logo"
                      width={12}
                      preview={false}
                    />
                  }
                />
                <CustomButton
                  type="view"
                  size="small"
                  onClick={() =>
                    router.push(`${routes.viewOrder.url}/${record.id}`)
                  }
                >
                  View
                </CustomButton>
              </div>
            );
            return { children: child, props: { "data-label": "Status" } };
          }}
        />
      </Table>

      {/* BOTTOM ROW */}
      <Row
        justify="space-between"
        className="bg-white p-4 border-t-2 border-gray-100"
      >
        {/* TOP ROW RIGHT SIDE */}
        <Col>
          <Row
            gutter={12}
            align="middle"
            onClick={() => setIsActivityLogVisible(true)}
            className="pointer"
          >
            <Col>
              <Text className="text-sm opacity_56 nowrap ml-14">
                Created: {dateFormatterNth(order?.startDateTime)}{" "}
                {order.lastEditedBy && "-"}
              </Text>
            </Col>

            <Col>
              {order.lastEditedBy && (
                <Text className="opacity_56  nowrap text-xs font-bold underline italic">
                  Edited by {order?.lastEditedBy}
                </Text>
              )}
            </Col>
          </Row>
        </Col>

        <Col>
          <Text className="text-xs opacity_56 italic nowrap mb0">
            {order?.depot?.name}
          </Text>
        </Col>
      </Row>
    </div>
  );
};

export default Order;
