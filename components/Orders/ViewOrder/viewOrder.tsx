/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { FC, useEffect, useState } from "react";
import {
  Steps,
  Form,
  Tooltip,
  Divider,
  Row,
  Col,
  Empty,
  Typography
} from "antd";
import { Query } from "../../../lib/types/shared";
import PaymentStatus from "../../Shared/PaymentStatus";
import Header from "./header";
import { abbreviateNumber, localeString } from "../../../utils/numberFormatter";
import Image from "antd/lib/image";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import {
  useDeleteStopMutation,
  useLazyOrderQuery,
  useWriteOffMutation
} from "../../../lib/api/endpoints/Orders/ordersEndpoints";
import Loader from "../../Shared/Loader";
import { Document, Stop, Transaction } from "../../../lib/types/orders";
import { dateDisplay } from "../../../utils/dateFormatter";
import AddStop from "../../Forms/Orders/AddStop";
import EditOrderClient from "../../Forms/Orders/EditOrderClient";
import ActionModal from "../../Shared/ActionModal";
import EditStop from "../../Forms/Orders/EditStop";
import EditPaymentStatus from "../../Forms/Orders/EditPaymentStatus";
import EditPayment from "../../Forms/Orders/EditPayment";
import { userType } from "../../../helpers/getLoggedInUser";
import EditOrderPrice from "../../Forms/Orders/EditOrderPrice";
import Content from "../../Shared/Content";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import TextLight from "../../Shared/Text/TextLight";
import DetailsSection from "./DetailsSection";
import StepDescription from "./StepDescription";
import { orderStatus, paymentStatus } from "../../../utils/orderStatus";
import { requiredField } from "../../../lib/validation/InputValidations";
import { useForm } from "antd/lib/form/Form";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import CustomButton from "../../Shared/Button";
import { PlusOutlined } from "@ant-design/icons";
import NewTRuckDocumentModal from "../../Modals/NewTruckDocumentModal";
import DocumentCard from "../../Analytics/Trucks/TruckCard";
import { ActivityLogModal } from "../../Modals/ActivityLogModal";
import EditOrderDepot from "../../Forms/Orders/EditOrderDepot";
import EditOrderDate from "../../Forms/Orders/EditOrderDate";
import { useRouter } from "next/router";
import { routes } from "../../../config/route-config";
import OrderPathWay from "./OrderPathWay";
import getHoursDiff from "../../../utils/getHoursDiff";

const { Step } = Steps;
const { Text } = Typography;

interface ViewOrderProps {
  orderId?: Query;
  setSupport: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewOrder: FC<ViewOrderProps> = ({ orderId, setSupport }) => {
  const [form] = useForm();

  const [isActivityLogVisible, setIsActivityLogVisible] = useState(false);
  const [isNewDocumentModalVisible, setIsNewDocumentModalVisible] =
    useState(false);
  const [comment, setComment] = useState<string>("");
  const [isEditClientModal, setIsEditClientModal] = useState<boolean>(false);
  const [isEditDepotModal, setIsEditDepotModal] = useState<boolean>(false);
  const [isEditDateModal, setIsEditDateModal] = useState<boolean>(false);
  const [isEditPriceModal, setIsEditPriceModal] = useState<boolean>(false);
  const [isAddStopModal, setIsAddStopModal] = useState<boolean>(false);
  const [isDeleteStopModal, setIsDeleteStopModal] = useState<boolean>(false);
  const [isEditStopModal, setIsEditStopModal] = useState<boolean>(false);
  const [isEditPayment, setIsEditPayment] = useState<boolean>(false);
  const [isEditPaymentStatus, setIsEditPaymentStatus] =
    useState<boolean>(false);
  const [chosenStopId, setChosenId] = useState<Stop>();
  const [chosenTransaction, setChosenTransaction] = useState<Transaction>();

  const [getOrder, { isLoading, data }] = useLazyOrderQuery();

  const user = userType();

  const router = useRouter();

  const canUserUpdatePaymentStatus =
    user.isAdmin || user.isSuperAdmin || user.isDispatcher;

  const [deleteStop, { isLoading: deleteStopLoading }] =
    useDeleteStopMutation();

  const [writeOff, { isLoading: writeOffLoading }] = useWriteOffMutation();

  const handleWriteOffAction = (values: { reason: string }) => {
    data &&
      handleAPIRequests({
        request: writeOff,
        orderId: data?.id,
        data: values
      });
  };

  const { isFullPaid, isHalfPaid, isWrittenOff } = paymentStatus(
    data?.paymentStatus
  );
  const { isCanceled, isComplete } = orderStatus(data?.status);

  const isOrderDisabled = isCanceled || isComplete || user.isGuest || !data;

  const canUserDelete =
    (!isFullPaid &&
      !isHalfPaid &&
      !isWrittenOff &&
      !isCanceled &&
      !user.isGuest) ||
    (user.isSuperAdmin && !isCanceled);

  const canUserPay = !isCanceled && !user.isGuest && !isFullPaid;

  const handleDeleteStopSuccess = () => {
    setIsDeleteStopModal(false);
  };

  const now = new Date().getTime();
  const orderStartTime = new Date(`${data?.startDateTime}`).getTime();
  const orderEndTime = new Date(`${data?.endDateTime || ""}`).getTime();

  const isOrderAbove24Hours = getHoursDiff(now, orderStartTime) > 24;

  const isOrderComplete = orderEndTime < now || isComplete || isCanceled;

  const deleteStopAction = () => {
    handleAPIRequests({
      request: deleteStop,
      orderId: orderId,
      stopId: chosenStopId?.id,
      showSuccess: true,
      handleSuccess: handleDeleteStopSuccess
    });
  };

  useEffect(() => {
    if (orderId) {
      handleAPIRequests({
        request: getOrder,
        orderId
      });
    }
  }, [orderId, getOrder]);

  const handleCopyID = () => {
    navigator.clipboard
      .writeText(orderId?.toString() || "")
      .then(() => SuccessMessage("Order ID added to clipboard"));
  };

  const handleCommentChange = (value: string) => {
    setComment(value);
  };

  const totalWeight =
    data &&
    data.stops.reduce((accumulator: any, value: { weight: number }) => {
      return accumulator + value.weight;
    }, 0);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ comment: data?.comment });
    }
  }, [data]);

  const TruckDetails = ({ details }: any) => {
    const trucksList: any = [];

    details.stops?.forEach((stop: any) => {
      const found = trucksList.find(
        (el: any) => el.truck.plateNumber === stop.truck.plateNumber
      );

      if (found) {
        const index = trucksList.indexOf(found);
        const foundTruck = trucksList[index];
        trucksList[index] = {
          ...found,
          weight: stop.weight + foundTruck.weight
        };
      } else {
        trucksList.push(stop);
      }
    });

    return (
      <div className="my-16">
        <TextLight className="mb-6">Truck details</TextLight>

        {trucksList?.map((stop: any, index: number) => {
          return (
            <div key={stop.id} className="flex items-center mb-5">
              <div className="flex-1 flex items-center gap-8">
                <span className="text-gray-400 font-light">{index + 1}</span>
                <Text
                  className="heading2 hover:underline pointer"
                  onClick={() =>
                    router.push(`${routes.Trucks.url}/${stop.truck?.id}`)
                  }
                >
                  {stop.truck?.plateNumber}
                </Text>
              </div>
              <div className="flex-1 normalText">{stop?.weight} KGs</div>
              <Text
                className="flex-1 opacity-50 hover:opacity-100 font-light hover:underline pointer"
                onClick={() =>
                  router.push(`${routes.DriverProfile.url}/${stop?.driver?.id}`)
                }
              >
                {stop?.driver?.names}
              </Text>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {isLoading || !data ? (
        <Loader />
      ) : (
        <>
          <Header
            orderId={orderId}
            code={data.deliveryCode}
            order={data}
            comment={comment}
            setSupport={setSupport}
            isOrderDisabled={isOrderDisabled}
            canUserDelete={canUserDelete}
            canUserPay={canUserPay}
          />

          <EditPayment
            tx={chosenTransaction}
            orderId={data.id}
            isEditPayment={isEditPayment}
            setIsEditPayment={setIsEditPayment}
          />

          <EditPaymentStatus
            order={data}
            closeModal={() => setIsEditPaymentStatus(false)}
            isEditPaymentStatus={isEditPaymentStatus}
            setIsEditPaymentStatus={setIsEditPaymentStatus}
            isSaleOrder={false}
          />

          <EditOrderClient
            orderId={orderId}
            existingClient={data?.office?.client}
            closeModal={() => setIsEditClientModal(false)}
            isEditClientModal={isEditClientModal}
            setIsEditClientModal={setIsEditClientModal}
          />

          <EditOrderDepot
            orderId={orderId}
            existingDepot={data?.depot}
            closeModal={() => setIsEditDepotModal(false)}
            isEditDepotModal={isEditDepotModal}
            setIsEditDepotModal={setIsEditDepotModal}
          />

          <EditOrderDate
            orderId={orderId}
            existingDate={data?.startDateTime}
            closeModal={() => setIsEditDateModal(false)}
            isEditDateModal={isEditDateModal}
            setIsEditDateModal={setIsEditDateModal}
          />

          <EditOrderPrice
            isVisible={isEditPriceModal}
            setIsVisible={setIsEditPriceModal}
            orderData={data}
            totalWeight={totalWeight}
          />

          <AddStop
            order={data}
            closeModal={() => setIsAddStopModal(false)}
            isAddStopModal={isAddStopModal}
            setIsAddStopModal={setIsAddStopModal}
          />

          <EditStop
            order={data}
            stop={chosenStopId}
            closeModal={() => setIsEditStopModal(false)}
            isEditStopModal={isEditStopModal}
            setIsEditStopModal={setIsEditStopModal}
          />

          <ActionModal
            action={deleteStopAction}
            actionLabel="DELETE ANYWAY"
            description="This action is not reversible, please make sure you really want to proceed with this action!"
            isModalVisible={isDeleteStopModal}
            setIsModalVisible={setIsDeleteStopModal}
            title={`Deleting ${chosenStopId?.name.split(",")[0]}`}
            loading={deleteStopLoading}
            type="danger"
          />

          <NewTRuckDocumentModal
            truckData={data}
            isVisible={isNewDocumentModalVisible}
            setIsVisible={setIsNewDocumentModalVisible}
            isDocumentForOrder
          />

          <ActivityLogModal
            isModalVisible={isActivityLogVisible}
            setIsModalVisible={setIsActivityLogVisible}
            order={data}
            activityLog={data.orderEditRecords}
          />

          <Content
            isOverflowHidden={false}
            navType="FULL"
            className="mx-4 relative"
          >
            <div className="flex flex-col xl:flex-row p-5 gap-6">
              <div className="flex-1 h-min bg-white shadow-[0px_0px_19px_#00000008] rounded p-14">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-top gap-12 ">
                    <div className="heading1 text-ox-dark flex gap-3 items-center">
                      <span> ORDER #{orderId}</span>

                      {data.locked && (
                        <Image
                          src="/icons/lock.svg"
                          alt="Lock icon"
                          width={12}
                          preview={false}
                        />
                      )}
                    </div>

                    <div
                      className="flex items-center gap-2 pointer"
                      onClick={handleCopyID}
                    >
                      <Image
                        preview={false}
                        width={14}
                        height={14}
                        src="/icons/copy.svg"
                        alt=""
                      />
                      <span className="normalText">Copy ID</span>
                    </div>
                  </div>

                  <span className="font-bold">
                    <PaymentStatus status={data.status} />
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="normalText">
                    {dateDisplay(data.startDateTime)}
                  </span>

                  {user.isSuperAdmin && (
                    <Image
                      onClick={() => setIsEditDateModal(true)}
                      preview={false}
                      className="pointer mb-[4px]"
                      src="/icons/ic-contact-edit.svg"
                      alt="Backspace icon"
                      width={12}
                    />
                  )}
                </div>

                <DetailsSection
                  details={data}
                  title="Client"
                  type="CLIENT"
                  editAction={setIsEditClientModal}
                />

                <DetailsSection
                  details={data}
                  title="Order"
                  type="ORDER"
                  totalWeight={totalWeight}
                  editAction={setIsEditDepotModal}
                />

                <TruckDetails details={data} />

                <div className="mt-20">
                  <div className=" mb-6 flex items-center justify-between">
                    <span className="text-[17px] font-extralight">
                      Track Order
                    </span>
                    <span
                      className="link animate"
                      onClick={() => setIsAddStopModal(true)}
                    >
                      + Add new stop
                    </span>
                  </div>
                  {data.stops?.length > 0 ? (
                    <Steps direction="vertical" size="small" current={1}>
                      {[...data.stops]
                        .sort((a, b) => a.position - b.position)
                        .map((st, index) => {
                          return (
                            <Step
                              key={index}
                              stepIndex={st.position}
                              status={st.arrivalDateTime ? "finish" : "wait"}
                              description={
                                <StepDescription
                                  data={data}
                                  st={st}
                                  setChosenId={setChosenId}
                                  setIsDeleteStopModal={setIsDeleteStopModal}
                                  setIsEditStopModal={setIsEditStopModal}
                                />
                              }
                            />
                          );
                        })}
                    </Steps>
                  ) : (
                    <div className="text-center text-ox-yellow-faded-text uppercase">
                      No stops available
                    </div>
                  )}
                </div>

                {/* Order route */}
                <div className="my-4">
                  <span className="text-[17px] font-extralight">
                    Order route
                  </span>

                  <div className="relative h-[300px] mt-4 mb-12 border rounded overflow-hidden">
                    <OrderPathWay
                      truckID={data?.stops[0]?.truck?.id}
                      start={orderStartTime}
                      end={orderEndTime || now}
                      isMoving={!isOrderComplete}
                      isOrderAbove24Hours={isOrderAbove24Hours}
                    />

                    {!isOrderComplete && (
                      <div className="absolute bottom-4 left-4 bg-ox-green rounded-full p-2 pr-4 py-[3px] font-medium text-[10px] flex gap-2 items-center">
                        <div className="bg-white rounded-full w-[8px] h-[8px]" />
                        <span>Live</span>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`${
                    !isCanceled && !isComplete
                      ? "mt-20"
                      : " mt-6 flex items-center justify-between gap-4"
                  }`}
                >
                  {
                    <span className="text-gray-400 font-light">
                      {data?.comment}
                    </span>
                  }

                  {!isCanceled && !isComplete && (
                    <>
                      <TextLight>Admin&apos;s comment</TextLight>

                      <div className="mb-5">
                        <Form form={form}>
                          <Input
                            name="comment"
                            type="text_area"
                            label="Comment"
                            placeholder="Enter something"
                            onChange={handleCommentChange}
                          />
                        </Form>
                      </div>
                    </>
                  )}

                  <div
                    className="flex justify-end pointer"
                    onClick={() => setIsActivityLogVisible(true)}
                  >
                    <span className="text-sm opacity_56 nowrap italic text-gray-600">
                      <span className="font-bold">Order created by:</span>{" "}
                      {data?.createdBy}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="w-full xl:w-[45%] flex flex-col gap-7">
                <div className="bg-white shadow-[0px_0px_19px_#00000008] rounded pt-14 px-14 pb-1">
                  <div className="flex items-center justify-between mb-0">
                    <div className="heading1 text-ox-dark">ORDER SUMMARY</div>
                  </div>

                  <DetailsSection
                    details={data}
                    totalWeight={totalWeight}
                    title=""
                    type="SUMMARY"
                    editAction={setIsEditPriceModal}
                  />
                </div>

                <div className="bg-white shadow-[0px_0px_19px_#00000008] rounded">
                  <div className="p-14 py-5 border-b">
                    <div className="flex items-center justify-between">
                      <div className="heading1 text-ox-dark">
                        PAYMENT STATUS
                      </div>
                      {canUserUpdatePaymentStatus && (
                        <div className="w-[120px]">
                          <Button
                            onClick={() => setIsEditPaymentStatus(true)}
                            type="secondary"
                          >
                            UPDATE
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-around m-14 gap-4 sm:gap-4 md:gap-4">
                    <div className="w-11/12 flex flex-col border rounded p-5">
                      <div className="mb-1">Paid</div>
                      <div className="font-bold text-2xl text-ox-yellow">
                        {abbreviateNumber(data.totalPaid)} Rwf
                      </div>
                    </div>
                    <div className="w-11/12 flex flex-col border p-5 rounded">
                      <div className="mb-1">Remaining</div>
                      <div className="text-2xl text-ox-red font-bold">
                        {abbreviateNumber(data.remainingAmount)} Rwf
                      </div>
                    </div>
                  </div>
                  <div className="px-14 pb-14">
                    <div className="font-extralight text-lg mb-10">
                      Payment history
                    </div>
                    {data?.transactions?.length === 0 && (
                      <div className="flex flex-col gap-5 items-center justify-center">
                        <Image
                          preview={false}
                          src="/icons/transaction.svg"
                          width={150}
                          height={150}
                          alt="No transactions"
                        />
                        <div className="font-extralight text-md w-[170px] text-center">
                          There are no transactions tied to this order yet.
                        </div>
                      </div>
                    )}
                    <div>
                      {data.transactions.map((tx: any, index: number) => {
                        return (
                          <div key={index} className="flex items-center mb-4">
                            <div className="flex-1 flex items-center gap-5 whitespace-nowrap overflow-hidden text-ellipsis">
                              <span className="text-gray-400 font-light">
                                {index + 1}
                              </span>
                              <span className="text-md font-bold">
                                {localeString(tx.amount)} Rwf
                              </span>
                            </div>
                            <div className="flex-1 text-sm text-gray-400 italic font-extralight whitespace-nowrap overflow-hidden text-ellipsis">
                              {dateDisplay(tx.createdAt)}
                            </div>
                            <div className="flex-1 font-light text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                              <span className="text-md font-bold">
                                MoMo Ref:{" "}
                              </span>
                              <span className="text-gray-400 ">
                                <Tooltip title={tx.momoRefCode}>
                                  {tx.momoRefCode}
                                </Tooltip>
                              </span>
                            </div>
                            <div className="ml-3">
                              {user.isSuperAdmin && (
                                <Button
                                  onClick={() => {
                                    setChosenTransaction(tx);
                                    setIsEditPayment(true);
                                  }}
                                  type="normal"
                                  size="icon"
                                  icon={
                                    <Image
                                      preview={false}
                                      src="/icons/ic-contact-edit.svg"
                                      alt="OX Delivery Logo"
                                      width={12}
                                      height={12}
                                    />
                                  }
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-[0px_0px_19px_#00000008]">
                  <div className="flex items-center justify-between mb-3 p-12 py-8 pb-3">
                    <span className="text-lg font-bold text-ox-dark">
                      ATTACH DOCUMENTS
                    </span>

                    <CustomButton
                      onClick={() => setIsNewDocumentModalVisible(true)}
                      type="secondary"
                      size="icon"
                      loading={false}
                      icon={<PlusOutlined />}
                    />
                  </div>

                  <Divider />

                  <Row gutter={24} className="p-12">
                    {data?.documents?.length <= 0 ? (
                      <div className="justify-center w-full">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </div>
                    ) : (
                      data?.documents?.map((document: Document) => (
                        <Col
                          key={document.title}
                          sm={{ span: 24 }}
                          md={{ span: 24 }}
                          lg={{ span: 12 }}
                          className="mb-8"
                        >
                          <DocumentCard
                            document={document}
                            truckData={data}
                            isDocumentForOrder
                          />
                        </Col>
                      ))
                    )}
                  </Row>
                </div>

                <div className="bg-white shadow-[0px_0px_19px_#00000008] rounded pt-14 px-14 pb-1">
                  <div className="flex items-center justify-between mb-0">
                    <div className="heading1 text-ox-dark">
                      ROAD CONDITION REVIEW
                    </div>
                  </div>

                  <DetailsSection
                    details={data}
                    title=""
                    type="ROAD_CONDITION"
                    editAction={setIsEditPriceModal}
                  />
                </div>

                {data?.paymentStatus !== "WRITTEN_OFF" && user.isSuperAdmin && (
                  <div className="bg-white shadow-[0px_0px_19px_#00000008] rounded p-10">
                    <Form onFinish={handleWriteOffAction}>
                      <div className="flex items-center justify-between mb-7">
                        <span className="heading1">WRITE OFF</span>
                      </div>
                      <div>
                        <Input
                          name="reason"
                          type="text_area"
                          label="Reason"
                          placeholder="Enter something"
                          rules={requiredField("Writeoff reason")}
                        />
                      </div>
                      <div className="flex justify-end mt-3">
                        <div className="w-[150px]">
                          <Button
                            type="primary"
                            htmlType="submit"
                            loading={writeOffLoading}
                          >
                            SUBMIT
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </div>
                )}
              </div>
            </div>
          </Content>
        </>
      )}
    </div>
  );
};

export default ViewOrder;
