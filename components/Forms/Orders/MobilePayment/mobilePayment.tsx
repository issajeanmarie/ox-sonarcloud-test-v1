import { FC, useEffect, useState } from "react";
import { Form, Modal } from "antd";
import Button from "../../../Shared/Button";
import Input from "../../../Shared/Input";
import { useInitiatePaymentMutation } from "../../../../lib/api/endpoints/Orders/ordersEndpoints";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { MobilePaymentProps } from "../../../../lib/types/components/MobilePayment";
import { handleAPIRequests } from "../../../../utils/handleAPIRequests";
import CustomPhoneInput from "../../../Shared/Custom/CustomPhoneInput";
import { useForm } from "antd/es/form/Form";

const MobilePayment: FC<MobilePaymentProps> = ({
  isModalVisible,
  setIsModalVisible,
  order
}) => {
  const [initiatePayment, { isLoading: paymentInitLoading }] =
    useInitiatePaymentMutation();

  const [phoneNumber, setPhoneNumber] = useState("");

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
        data: { ...values, phone: phoneNumber.replace("+", "") },
        showSuccess: true,
        handleSuccess: handleInitiatePaymentSuccess
      });
    }
  };

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      amount: order?.totalAmount
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
