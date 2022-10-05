import { FC, useState } from "react";
import { Form, Modal } from "antd";
import Button from "../../../Shared/Button";
import Input from "../../../Shared/Input";
import { useInitiatePaymentMutation } from "../../../../lib/api/endpoints/Orders/ordersEndpoints";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { MobilePaymentProps } from "../../../../lib/types/components/MobilePayment";
import { handleAPIRequests } from "../../../../utils/handleAPIRequests";

const MobilePayment: FC<MobilePaymentProps> = ({
  isModalVisible,
  setIsModalVisible,
  order
}) => {
  const [initiatePayment, { isLoading: paymentInitLoading }] =
    useInitiatePaymentMutation();

  const [isPaymentSuccessful, setIsPaymentSuccessful] =
    useState<boolean>(false);

  const handleOk = () => {
    setIsModalVisible(false);
    setIsPaymentSuccessful(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsPaymentSuccessful(false);
  };

  const handleInitiatePaymentSuccess = () => {
    setIsPaymentSuccessful(true);
  };

  const handleSubmit = (values: { amount: number; phone: string }) => {
    if (order) {
      handleAPIRequests({
        request: initiatePayment,
        orderId: order.id,
        data: values,
        showSuccess: true,
        handleSuccess: handleInitiatePaymentSuccess
      });
    }
  };

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
      {isPaymentSuccessful ? (
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
        <div className="m-10">
          <div className="text-2xl font-bold  text-ox-dark mb-10">
            MOBILE PAYMENT
          </div>
          <Form
            name="Login"
            layout="vertical"
            title="Mobile payment"
            initialValues={{
              amount: order?.totalAmount - order?.totalPaid,
              phone:
                order?.clientPhone?.split("")[0] === "+"
                  ? order?.clientPhone.substring(1)
                  : order?.clientPhone
            }}
            onFinish={handleSubmit}
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
              <Input
                name="phone"
                type="text"
                placeholder="Client's phone number ex: 250780000000"
                label="Phone number"
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
            <button className="heading2 w-full" onClick={handleCancel}>
              Cancel
            </button>
          </Form>
        </div>
      )}
    </Modal>
  );
};

export default MobilePayment;
