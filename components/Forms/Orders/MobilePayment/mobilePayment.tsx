import { FC, useEffect, useState } from "react";
import { Form, Modal, Image } from "antd";
import Button from "../../../Shared/Button";
import Input from "../../../Shared/Input";
import { useInitiatePaymentMutation } from "../../../../lib/api/endpoints/Orders/ordersEndpoints";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { MobilePaymentProps } from "../../../../lib/types/components/MobilePayment";
import { handleAPIRequests } from "../../../../utils/handleAPIRequests";
import CustomPhoneInput from "../../../Shared/Custom/CustomPhoneInput";
import { useForm } from "antd/es/form/Form";
import { usePaymentPageMoMoPaymentListener } from "../../../../lib/useEffects/useHandleMoMoPaymentListener";

const MobilePayment: FC<MobilePaymentProps> = ({
  isModalVisible,
  setIsModalVisible,
  order
}) => {
  const [initiatePayment, { isLoading: paymentInitLoading }] =
    useInitiatePaymentMutation();
  const [paymentProgress, setPaymentProgress] = useState({
    initiated: false,
    payload: null,
    success: false,
    disconnected: false
  });

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  usePaymentPageMoMoPaymentListener({
    setPaymentProgress,
    paymentProgress,
    setIsModalVisible
  });

  const handlePaymentFinish = () => {
    setPaymentProgress({
      initiated: false,
      payload: null,
      success: false,
      disconnected: false
    });

    setIsModalVisible(false);
  };

  const handleSubmit = (values: { amount: number; phone: string }) => {
    if (order) {
      handleAPIRequests({
        request: initiatePayment,
        orderId: order.id,
        data: { ...values, phone: phoneNumber.replace("+", "") }
      });
    }
  };

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      amount: order?.remainingAmount
    });

    setPhoneNumber(order?.clientPhone);
  }, [order]);

  return (
    <Modal
      title={false}
      width={500}
      footer={false}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
      centered
    >
      {paymentProgress.initiated ? (
        <div className="m-10">
          <div className="text-2xl font-bold  text-ox-dark text-center mb-10">
            HOLD ON A SEC...
          </div>

          <div className="mx-auto mb-10 flex items-center justify-center">
            <Image width={64} src="/icons/timer.svg" preview={false} alt="" />
          </div>

          <div className="text-md font-normal  text-ox-dark text-center mb-2">
            Notification has been sent to your phone, check your phone or dial{" "}
            <span className="font-bold">*182*7*1#</span> - then choose{" "}
            <span className="font-bold">1</span> to activate payment action!
          </div>

          <div className="text-md font-normal opacity-50 italic text-center mb-10">
            If you think this was a mistake please ignore the notification!
          </div>

          <button className="heading2 w-full underline" onClick={handleCancel}>
            Dismiss
          </button>
        </div>
      ) : paymentProgress.success ? (
        <div className="m-10">
          <div className="text-2xl font-bold  text-ox-dark text-center mb-10">
            PAYMENT DONE
          </div>

          <div className="mx-auto mb-10 flex items-center justify-center">
            <CheckCircleTwoTone
              className="text-7xl mx-auto text-center"
              twoToneColor="#E7B522"
            />
          </div>

          <div className="text-md font-normal  text-ox-dark text-center mb-10">
            The client has paid! Tap ok to go back to home page
          </div>

          <Button
            type="primary"
            htmlType="submit"
            onClick={handlePaymentFinish}
          >
            Ok
          </Button>
        </div>
      ) : (
        <div className="m-10">
          <div className="text-2xl font-bold  text-ox-dark mb-10">
            MOBILE PAYMENT
          </div>
          <Form
            name="Login"
            layout="vertical"
            title="Mobile payment"
            onFinish={handleSubmit}
            form={form}
          >
            <div className="mb-5">
              <Input
                name="amount"
                type="text"
                placeholder="Enter amount to charge"
                inputType="number"
                label="Amount"
                suffixIcon="RWF"
              />
            </div>
            <div className="mb-10">
              <CustomPhoneInput
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
              />
            </div>
            <div className="mb-7">
              <Button
                type="primary"
                htmlType="submit"
                loading={paymentInitLoading}
              >
                Confirm
              </Button>
            </div>
          </Form>

          <button className="heading2 w-full" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
      {/* {isPaymentSuccessful ? (
        <div className="flex flex-col items-center justify-center h-[300px]">
          <div>
            <CheckCircleTwoTone className="text-8xl" twoToneColor="#E7B522" />
          </div>
          <div className="mt-5 text-lg capitalize mb-3">
            Payment successful !
          </div>
          <div className="w-[150px] mt-7">
            <Button
              type="primary"
              onClick={() => {
                setIsPaymentSuccessful(false);
                handleOk();
              }}
            >
              OK
            </Button>
          </div>
        </div>
      ) : (
        
      )} */}
    </Modal>
  );
};

export default MobilePayment;
